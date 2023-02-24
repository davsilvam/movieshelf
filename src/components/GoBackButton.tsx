import { FC } from 'react'

// Icons
import { ArrowLeftIcon } from '@heroicons/react/20/solid'

// Router
import { useNavigate } from 'react-router-dom'

export const GoBackButton: FC = () => {
  const navigate = useNavigate()

  function goBack() {
    navigate(-1)
  }

  return (
    <button
      onClick={goBack}
      className="absolute top-2 left-2 flex items-center gap-1 rounded-lg bg-secondary-700 py-1 px-2 font-semibold text-secondary-100 transition-all hover:bg-opacity-75"
    >
      <ArrowLeftIcon className="w-6" />
      Voltar
    </button>
  )
}
