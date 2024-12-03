import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../services/authService'
import { FirebaseError } from 'firebase/app'

interface RegisterFormProps {
  onClose: () => void
}

export default function RegisterForm({ onClose }: RegisterFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const isPasswordStrong = (password: string): boolean => {
    const hasMinLength = password.length >= 8
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
    return hasMinLength && hasSpecialChar
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('As senhas não correspondem.')
      return
    }

    if (!isPasswordStrong(password)) {
      setError(
        'A senha deve ter pelo menos 8 caracteres e conter um caractere especial (!@#$%^&*(),.?":{}|<>).'
      )
      return
    }

    try {
      await registerUser(email, password)
      navigate('/dashboard')
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        // Verifica os códigos de erro do Firebase
        if (err.code === 'auth/email-already-in-use') {
          setError('Este e-mail já está sendo usado. Tente outro.')
        } else if (err.code === 'auth/weak-password') {
          setError('A senha é fraca. Deve conter pelo menos 8 caracteres e 1 caractere especial.')
        } else {
          setError('Erro ao registrar. Verifique as informações.')
        }
      } else {
        // Caso o erro não seja do Firebase
        setError('Ocorreu um erro desconhecido.')
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <h2 className="text-2xl font-bold mb-4">Registrar</h2>
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="block w-full p-2 border rounded mb-4"
        required
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="block w-full p-2 border rounded mb-4"
        required
      />
      <input
        type="password"
        placeholder="Confirme a senha"
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
        className="block w-full p-2 border rounded mb-4"
        required
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full mb-4">
        Registrar
      </button>
      <button
        type="button"
        onClick={onClose}
        className="bg-gray-500 text-white px-4 py-2 rounded w-full"
      >
        Cancelar
      </button>
    </form>
  )
}
