/*

    This is a utility file that does all the fetching of data
    for the storygraf users.

*/

const getUser = userId => {
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

export { getUser, userLoggedIn }
