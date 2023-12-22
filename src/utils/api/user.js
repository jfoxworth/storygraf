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

export { getUser }
