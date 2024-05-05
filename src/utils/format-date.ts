export function formatDate(date: string) {
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'medium',
  }).format(new Date(date))
}
