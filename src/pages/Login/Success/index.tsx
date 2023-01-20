import React, { useEffect } from 'react'

import { MoviesService } from '../../../services/apiServices'
import { ApiException } from '../../../services/apiException'
import { useAuthentication } from '../../../contexts/AuthenticationContext'

export const Success: React.FC = () => {
  const { sessionUser } = useAuthentication()

  // useEffect(() => {
  //   if (!sessionUser) return

  //   MoviesService.postUserAndValidateWithLogin(sessionUser).then(response => {
  //     if (response instanceof ApiException) {
  //       return console.log(response.message)
  //     }

  //     console.log(response)
  //   })
  // }, [sessionUser])

  return (
    <div className="flex min-h-screen w-full items-center bg-darkest text-lightest">
      <div>
        <h1>Sucesso</h1>
      </div>
    </div>
  )
}
