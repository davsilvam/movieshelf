/* eslint-disable no-undef */
export async function fetchWrapper<T = unknown>(
  input: RequestInfo | URL,
  init?: RequestInit | undefined,
) {
  const data = await fetch(`https://api.themoviedb.org/3/${input}`, {
    ...init,
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
    },
  })
  const result = await data.json()

  return result as T
}
