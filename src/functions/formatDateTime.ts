const prependZeroInTime = (timePiece: number) => {
  if (timePiece < 10) {
    return `0${timePiece}`
  }

  return timePiece
}

export const formatDateTime = (dateTime: string) => {
  const date = new Date(dateTime)

  const year = date.getFullYear()
  const month = prependZeroInTime(date.getMonth() + 1)
  const day = prependZeroInTime(date.getDate())

  const hour = prependZeroInTime(date.getHours())
  const minute = prependZeroInTime(date.getMinutes())

  return `${day}/${month}/${year} ${hour}:${minute}`
}