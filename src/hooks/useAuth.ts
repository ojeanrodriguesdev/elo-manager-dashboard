import { useState } from 'react'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '../services/firebaseConfig'

// Função auxiliar para tratar erros do Firebase
const getFirebaseErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    case 'auth/user-not-found':
      return 'Usuário não encontrado.'
    case 'auth/wrong-password':
      return 'Senha incorreta. Tente novamente.'
    case 'auth/email-already-in-use':
      return 'Este e-mail já está sendo usado. Tente outro.'
    case 'auth/weak-password':
      return 'A senha é fraca. Deve conter pelo menos 8 caracteres e 1 caractere especial.'
    default:
      return 'Erro ao fazer login. Tente novamente.'
  }
}

export const useAuth = () => {
  const [error, setError] = useState<string | null>(null)

  const loginUser = async (email: string, password: string): Promise<void> => {
    try {
      setError(null)
      await signInWithEmailAndPassword(auth, email, password)
    } catch (err: unknown) {
      if (err instanceof Error) {
        const errorMessage = getFirebaseErrorMessage(err.message)
        setError(errorMessage)
        throw new Error(errorMessage)
      } else {
        throw new Error('Erro desconhecido.')
      }
    }
  }

  const registerUser = async (email: string, password: string): Promise<void> => {
    try {
      setError(null)
      await createUserWithEmailAndPassword(auth, email, password)
    } catch (err: unknown) {
      if (err instanceof Error) {
        const errorMessage = getFirebaseErrorMessage(err.message)
        setError(errorMessage)
        throw new Error(errorMessage)
      } else {
        throw new Error('Erro desconhecido.')
      }
    }
  }

  const logoutUser = async (): Promise<void> => {
    try {
      setError(null)
      await signOut(auth)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
        throw new Error(err.message)
      } else {
        throw new Error('Erro desconhecido.')
      }
    }
  }

  return { loginUser, registerUser, logoutUser, error }
}
