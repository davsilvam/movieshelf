import React, { useMemo } from 'react'

// Context
import { useAuthentication } from '../../contexts/AuthenticationContext'

// Form
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

// Router
import { useNavigate } from 'react-router-dom'

// Zod
import { z } from 'zod'
import { MoviesService } from '../../services/apiServices'
import { ApiException } from '../../services/apiException'

const FormSchema = z.object({
  username: z.string().min(1, 'Campo obrigatório.'),
  password: z.string().min(4, 'A senha deve conter pelo menos 4 caracteres.')
})

type FormSchemaType = z.infer<typeof FormSchema>

export const Login: React.FC = () => {
  const navigate = useNavigate()
  const { sessionUser, setUser } = useAuthentication()

  const {
    register,
    watch,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema)
  })

  const username = watch('username')
  const password = watch('password')

  async function handleLogin() {
    await MoviesService.getToken().then(response => {
      if (response instanceof ApiException) {
        return console.log(response.message)
      }

      console.log(response.request_token)

      const user = {
        username: username,
        password: password,
        request_token: response.request_token
      }

      setUser(user)

      validateUser
    })
  }

  const validateUser = useMemo(() => {
    if (!sessionUser) return

    MoviesService.postUserAndValidateWithLogin(sessionUser).then(response => {
      if (response instanceof ApiException) {
        return console.log(response.message)
      }

      console.log(response)

      navigate('/login/success')
    })
  }, [sessionUser])

  return (
    <div className="flex min-h-screen w-full items-center bg-darkest text-lightest">
      <div className="flex w-1/2 flex-col items-center justify-center">
        <form
          className="flex flex-col gap-10"
          onSubmit={handleSubmit(handleLogin)}
        >
          <div className="flex flex-col items-start">
            <h1>Boas-vindas ao Movieshelf</h1>
            <h4 className="text-lg font-medium text-cadet">
              Sua estante virtual de filmes
            </h4>
          </div>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-1">
              <input
                type="text"
                {...register('username')}
                placeholder="Nome de usuário"
                className={`border-b  bg-transparent pb-2 text-sm placeholder:text-cadet focus:border-main ${
                  username ? 'border-lightest' : 'border-cadet'
                }`}
              />
              <span className="text-xs text-red-500">
                {errors.username?.message}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <input
                type="password"
                {...register('password')}
                placeholder="Senha"
                className={`border-b  bg-transparent pb-2 text-sm placeholder:text-cadet focus:border-main ${
                  password ? 'border-lightest' : 'border-cadet'
                }`}
              />
              <span className="text-xs text-red-500">
                {errors.password?.message}
              </span>
            </div>
          </div>
          <div className="flex w-full flex-col items-center gap-5">
            <button
              disabled={isSubmitting}
              className="w-full rounded-md border-2 border-dashed border-main bg-main py-3 font-semibold shadow-md transition-colors disabled:cursor-not-allowed disabled:opacity-50"
            >
              Entrar
            </button>

            <p className="text-sm text-cadet">
              Não tem uma conta?{' '}
              <a className="cursor-pointer font-semibold text-secondary">
                Registre-se!
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
