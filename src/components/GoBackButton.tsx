import { ButtonHTMLAttributes, FC } from 'react'

// icons
import { ArrowLeft } from '@phosphor-icons/react'

// router
import { useNavigate } from 'react-router-dom'

export const GoBackButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  ...rest
}) => {
  const navigate = useNavigate()

  function goBack() {
    navigate(-1)
  }

  return (
    <button
      onClick={goBack}
      aria-labelledby="voltar"
      className="absolute top-2 left-2 flex items-center gap-1 rounded-lg bg-secondary-700 py-1 px-2 font-semibold text-secondary-100 transition-all hover:bg-opacity-75 lg:text-sm"
      {...rest}
    >
      <ArrowLeft size={16} />
      Voltar
    </button>
  )
}
