import React, { createContext, useContext, useState } from 'react'

interface AuthenticationContext {
  sessionUser: SessionUserType | null | undefined
  setUser: (user: SessionUserType) => void
}

interface AuthenticationContextProps {
  children: React.ReactNode
}

export type SessionUserType = {
  username: string
  password: string
  request_token: string
}

const AuthenticationContext = createContext<AuthenticationContext | null>(null)

export const AuthenticationProvider: React.FC<AuthenticationContextProps> = ({
  children
}) => {
  const [sessionUser, setSessionUser] = useState<SessionUserType | null>()

  function setUser(data: SessionUserType) {
    setSessionUser(data)
  }

  return (
    <AuthenticationContext.Provider value={{ sessionUser, setUser }}>
      {children}
    </AuthenticationContext.Provider>
  )
}

export function useAuthentication(): AuthenticationContext {
  const context = useContext(AuthenticationContext)

  if (!context) {
    throw new Error('useFavorites must be used within a AuthenticationContext.')
  }

  return context
}
