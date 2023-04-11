export function transformCommentDate(date: string) {
  const now = new Date()

  let currentYear = now.getFullYear()
  const commentYear = Number(date.slice(0, -20))

  let currentMonth = now.getMonth() + 1
  const commentMonth = Number(date.slice(0, -14).slice(-5).slice(0, -3))

  let currentDay = now.getDate()
  const commentDay = Number(date.slice(0, -14).slice(-2))

  if (currentYear > commentYear) {
    return currentMonth > commentMonth && currentYear - commentYear > 1
      ? `${currentYear - commentYear}a atrás`
      : `${currentMonth - commentMonth + 12}m atrás`
  }

  if (currentMonth > commentMonth) {
    return `${currentMonth - commentMonth}m atrás`
  }

  if (currentDay > commentDay) {
    return `${currentDay - commentDay}d atrás`
  }
}
