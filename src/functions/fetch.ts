export type FetchResponse = {
  statusCode: number
  body?: unknown
}

/* eslint-disable no-undef */
export async function fetchWrapper<T = unknown>(
  input: RequestInfo | URL,
  init?: RequestInit | undefined,
): Promise<FetchResponse> {
  const data = await fetch(`https://api.themoviedb.org/3/${input}`, {
    ...init,
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
    },
  })

  const response = await data.json()

  return {
    statusCode: data.status,
    body: response as T,
  }
}
