import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged, signOut
} from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { auth, firestore } from './firebaseConfig'

// Função para registro de usuários
export const registerUser = async (email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password)
  const user = userCredential.user

  // Salvar informações extras no Firestore
  await setDoc(doc(firestore, 'users', user.uid), {
    email: user.email,
    createdAt: new Date(),
    role: 'user',
  })

  return user
}

// Função para login de usuários
export const loginUser = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password)
  return userCredential.user
}

// Função para monitorar o estado do usuário autenticado
export const getCurrentUser = (callback: (user: unknown) => void) => {
  return onAuthStateChanged(auth, callback)
}

export const logoutUser = async (): Promise<void> => {
  await signOut(auth)
}
