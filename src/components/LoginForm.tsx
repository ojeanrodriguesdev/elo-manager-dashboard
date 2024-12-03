import { useState } from 'react'
import { FirebaseError } from 'firebase/app'
import { useNavigate } from 'react-router-dom'
import Modal from './Modal'
import RegisterForm from './RegisterForm'

interface LoginFormProps {
  onLogin: (email: string, password: string) => Promise<void>
}

export default function LoginForm({ onLogin }: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault() // Evita o recarregamento da página
    setError('') // Limpa mensagens de erro anteriores

    try {
      console.log('Tentando logar com:', email, password) // Log para depuração
      await onLogin(email, password) // Chama a função de login passada via props
      console.log('Login bem-sucedido!') // Log para confirmar sucesso
      navigate('/dashboard') // Redireciona para a dashboard
    } catch (err: unknown) {
      console.error('Erro ao logar:', err) // Log para depuração
      if (err instanceof FirebaseError) {
        setError(err.message) // Define a mensagem de erro centralizada no hook
      } else {
        setError('Ocorreu um erro desconhecido.')
      }
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-screen bg-white px-6 py-4 md:px-10 mx-10 md:mx-40 lg:mx-64 xl:mx-96 2xl:mx-[550px] rounded-xl shadow-xl"
      >
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-2xl text-center font-bold mb-4">Fazer Login</h2>
          {error && <p className="text-red-500 text-sm text-center pb-5">{error}</p>}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="block w-full p-2 border rounded mb-4"
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="block w-full p-2 border rounded mb-4"
          />
        </div>
        <div className="flex flex-row gap-4 items-center justify-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded"
          >
            Logar
          </button>
          <button
            type="button"
            onClick={() => setIsRegisterModalOpen(true)}
            className="bg-slate-900 hover:bg-slate-600 text-white px-4 py-2 rounded"
          >
            Registrar-se
          </button>
        </div>
      </form>

      <Modal isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)}>
        <RegisterForm onClose={() => setIsRegisterModalOpen(false)} />
      </Modal>
    </>
  )
}
