/* eslint-disable no-unused-vars */
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_TMDB_ACCESS_TOKEN: string
    }
  }
}

export {}
