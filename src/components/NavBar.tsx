import { useState } from 'react'

interface NavBarProps {
  links: { name: string; href: string }[]
  onLogout: () => Promise<void>
}

export default function NavBar({ links, onLogout }: NavBarProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleLinkClick = () => {
    if (!isOpen) return
    setIsOpen(false) // Fecha o menu em telas menores
  }

  return (
    <>
      {/* Botão do menu hambúrguer (apenas para telas menores) */}
      <div className="absolute top-2 right-4 flex-row justify-end z-50 lg:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-3xl text-black rounded-full focus:outline-none"
        >
          {isOpen ? 'x' : '☰'}
        </button>
      </div>

      {/* Overlay com fundo desfocado (apenas para telas menores) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* NavBar */}
      <aside
        className={`fixed top-0 right-0 h-screen bg-white shadow-md transform lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 z-40 w-[200px] lg:static lg:shadow-none lg:w-64`}
      >
        <div className="mt-16 px-4">
          <h2 className="text-lg font-bold">Dashboard</h2>
        </div>
        <nav className="mt-4">
          <ul className="space-y-2">
            {links.map(link => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={handleLinkClick} // Fecha o menu ao clicar no link
                  className="block px-4 py-2 text-black hover:bg-gray-200 rounded"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="absolute bottom-0 w-full px-4 py-4">
          <button
            onClick={onLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded w-full"
          >
            Sair
          </button>
        </div>
      </aside>
    </>
  )
}
