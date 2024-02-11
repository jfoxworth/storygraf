/*

    This is a utility file that does all the fetching of data
    for the storygraf users.

*/

const getProfileFromEmail = email => {
  return fetch('http://localhost:3080/api/profile/' + email, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => response.text())
}

const getUser = userId => {
  console.log('The user id in get user is ...')
  console.log(userId)
  return fetch('http://localhost:3080/api/user/' + userId, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => response.text())
}

// This is in response to a user logging in and records some login info and makes sure that
// a profile exists for this user
const userLoggedIn = (provider, email, name, image) => {
  return fetch('http://localhost:3080/api/userLogin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      Item: { provider: provider, email: email, name: name, image: image }
    })
  }).then(response => response.text())
}

// Update a users profile
const updateProfile = profile => {
  return fetch('http://localhost:3080/api/updateProfile', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(profile)
  }).then(response => response.text())
}

export { getProfileFromEmail, getUser, userLoggedIn, updateProfile }
