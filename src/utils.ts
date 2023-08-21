export const constants = {
  baseUrl: 'https://cards-nestjs.cyclic.cloud/api/'
}

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString()
}
