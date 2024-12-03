import { useAuth } from '../hooks/useAuth'
import LoginForm from '../components/LoginForm'

export default function LoginPage() {
  const { loginUser } = useAuth()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <LoginForm onLogin={loginUser} />
    </div>
  )
}