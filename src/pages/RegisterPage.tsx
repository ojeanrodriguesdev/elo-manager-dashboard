import RegisterForm from '../components/RegisterForm'
import { useAuth } from '../hooks/useAuth'

export default function RegisterPage() {
  const { registerUser } = useAuth()

  const handleRegister = async (email: string, password: string) => {
    try {
      await registerUser(email, password)
      console.log('Registro concluído!')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <RegisterForm onRegister={handleRegister} onClose={() => console.log('Modal fechado')}/>
    </div>
  )
}
