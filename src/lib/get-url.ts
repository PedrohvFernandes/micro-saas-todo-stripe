export function getUrl(path?: string) {
  const baseUrl = process.env.NEXT_PUBLIC_URL ?? 'http://localhost:3000'

  // Se o path não começar com /, adicionamos
  const normalizedPath = path && !path.startsWith('/') ? `/${path}` : path

  // Retornamos a url completa
  return `${baseUrl}${normalizedPath}`
}
