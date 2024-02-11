const dateToLongDateTime = td => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const myDate = new Date(td)

  let dateStr =
    months[myDate.getMonth()] +
    ' ' +
    myDate.getDate() +
    ', ' +
    myDate.getFullYear() +
    ' - ' +
    myDate.getHours() +
    ':' +
    (myDate.getMinutes().toString().length < 2 ? '0' + myDate.getMinutes() : myDate.getMinutes())

  return dateStr
}

export { dateToLongDateTime }
