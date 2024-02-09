// ** Third Party Imports
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import CognitoProvider from 'next-auth/providers/cognito'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import TwitterProvider from 'next-auth/providers/twitter'

// ** API to send login info
import { userLoggedIn } from 'src/utils/api/user'

/*
 * As we do not have backend server, the refresh token feature has not been incorporated into the template.
 * Please refer https://next-auth.js.org/tutorials/refresh-token-rotation link for a reference.
 */

export const authOptions = {
  // ** Configure one or more authentication providers
  // ** Please refer to https://next-auth.js.org/configuration/options#providers for more `providers` options
  providers: [
    GitHubProvider({
      profile(profile) {
        console.log('Profile Github: ', profile)

        let userRole = 'client'
        if (profile?.email == 'jfoxworth@cadwolf.com') {
          userRole = 'admin'
        }

        // Record that the user logged in with this email
        // and make sure that the user has a profile
        console.log('Should be calling userLoggedIn')
        userLoggedIn('github', profile.email, profile.name, profile.avatar_url)

        return {
          ...profile,
          role: userRole,
          image: profile.avatar_url
        }
      },
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_Secret
    }),
    GoogleProvider({
      profile(profile) {
        console.log('Profile Google: ', profile)

        // Record that the user logged in with this email
        // and make sure that the user has a profile
        console.log('Should be calling userLoggedIn')
        userLoggedIn('google', profile.email, profile.name, profile.picture)

        return {
          ...profile,
          id: profile.sub,
          role: 'client',
          image: profile.picture
        }
      },
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_Secret
    }),
    TwitterProvider({
      profile(profile) {
        console.log('Profile Twitter: ', profile)

        return {
          ...profile,
          role: 'client'
        }
      },
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_Secret
    }),
    FacebookProvider({
      profile(profile) {
        console.log('Profile Facebook: ', profile)

        return {
          ...profile,
          role: 'client',
          image: profile.picture.data.url
        }
      },
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_Secret
    }),
    CognitoProvider({
      clientId: process.env.COGNITO_CLIENT_ID,
      clientSecret: process.env.COGNITO_CLIENT_SECRET,
      issuer: 'https://cognito-idp.' + process.env.AWS_REGION + '.amazonaws.com/' + process.env.COGNITO_POOL_ID
    }),

    CredentialsProvider({
      // ** The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      type: 'credentials',

      /*
       * As we are using our own Sign-in page, we do not need to change
       * username or password attributes manually in following credentials object.
       */
      credentials: {},
      async authorize(credentials) {
        /*
         * You need to provide your own logic here that takes the credentials submitted and returns either
         * an object representing a user or value that is false/null if the credentials are invalid.
         * For e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
         * You can also use the `req` object to obtain additional parameters (i.e., the request IP address)
         */
        const { email, password } = credentials

        try {
          // ** Login API Call to match the user credentials and receive user data in response along with his role
          const res = await fetch(`${process.env.API_URL}/api/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
          })
          const user = await res.json()

          if (res.status === 200 && user) {
            /*
             * Please unset all the sensitive information of the user either from API response or before returning
             * user data below. Below return statement will set the user object in the token and the same is set in
             * the session which will be accessible all over the app.
             */
            return user
          }

          return null
        } catch {
          throw new Error('Email or Password is invalid')
        }
      }
    })

    // ** ...add more providers here
  ],

  // ** Please refer to https://next-auth.js.org/configuration/options#session for more `session` options
  session: {
    /*
     * Choose how you want to save the user session.
     * The default is `jwt`, an encrypted JWT (JWE) stored in the session cookie.
     * If you use an `adapter` however, NextAuth default it to `database` instead.
     * You can still force a JWT session by explicitly defining `jwt`.
     * When using `database`, the session cookie will only contain a `sessionToken` value,
     * which is used to look up the session in the database.
     */
    strategy: 'jwt',

    // ** Seconds - How long until an idle session expires and is no longer valid
    maxAge: 30 * 24 * 60 * 60 // ** 30 days
  },

  // ** Please refer to https://next-auth.js.org/configuration/options#pages for more `pages` options
  pages: {
    signIn: '/login',
    signOut: '/login',
    error: '/404'
  },

  // ** Please refer to https://next-auth.js.org/configuration/options#callbacks for more `callbacks` options
  callbacks: {
    /*
     * While using `jwt` as a strategy, `jwt()` callback will be called before
     * the `session()` callback. So we have to add custom parameters in `token`
     * via `jwt()` callback to make them accessible in the `session()` callback
     */
    async jwt({ token, user }) {
      if (user) {
        /*
         * For adding custom parameters to user in session, we first need to add those parameters
         * in token which then will be available in the `session()` callback
         */
        token.role = user.role
        token.fullName = user.fullName
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        // ** Add custom params to user in session which are added in `jwt()` callback via `token` parameter
        session.user.role = token.role
        session.user.fullName = token.fullName
      }

      return session
    }
  }
}

export default NextAuth(authOptions)
