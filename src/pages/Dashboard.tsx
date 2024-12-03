import { useNavigate } from 'react-router-dom'
import ProductTable from '../components/ProductTable'
import NavBar from '../components/NavBar'
import { useAuth } from '../hooks/useAuth'

export default function Dashboard() {
  const { logoutUser } = useAuth()
  const navigate = useNavigate() // Hook para redirecionamento
  const navLinks = [
    { name: 'Visão Geral', href: '#overview' },
    { name: 'Produtos', href: '#products' },
  ]

  const handleLogout = async () => {
    try {
      await logoutUser() // Realiza o logout
      navigate('/') // Redireciona para a página inicial
    } catch (error) {
      console.error('Erro ao sair:', error)
    }
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100">
      <NavBar links={navLinks} onLogout={handleLogout} />
      <main className="flex-1 p-4">
        <div id="overview" className="mb-6">
          <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
        </div>
        <div id="products" className="mt-8">
          <ProductTable />
        </div>
      </main>
    </div>
  )
}
