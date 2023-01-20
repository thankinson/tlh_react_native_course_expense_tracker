export default function getFormattedDate(date){
  console.log('date: ' + date)
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

export function getDateMinusDays(date, days) {
  console.log('date: ' + date, 'days: ' + days)
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}