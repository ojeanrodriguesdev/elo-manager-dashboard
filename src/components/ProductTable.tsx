import { useState, useEffect } from 'react'
import { fetchProducts, deleteProduct, Product } from '../services/productService'
import Modal from './Modal'
import ProductForm from './ProductForm'

export default function ProductTable() {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts()
        setProducts(data)
      } catch (err) {
        setError('Erro ao carregar os produtos. Por favor, tente novamente mais tarde.')
        console.error(err)
      }
    }
    loadProducts()
  }, [])

  const handleDelete = async (id: number) => {
    try {
      await deleteProduct(id)
      setProducts(prev => prev.filter(product => product.id !== id))
    } catch (err) {
      setError('Erro ao excluir o produto.')
      console.error(err)
    }
  }

  const handleEdit = (product: Product) => {
    setSelectedProduct(product)
    setIsEditing(true)
    setIsEditModalOpen(true)
  }

  const handleViewInfo = (product: Product) => {
    setSelectedProduct(product)
    setIsInfoModalOpen(true)
  }

  const handleAdd = () => {
    setSelectedProduct(null)
    setIsEditing(false)
    setIsEditModalOpen(true)
  }

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false)
    setSelectedProduct(null)
  }

  const handleCloseInfoModal = () => {
    setIsInfoModalOpen(false)
    setSelectedProduct(null)
  }

  const handleSave = (updatedProduct: Product) => {
    if (isEditing) {
      setProducts(prev =>
        prev.map(product => (product.id === updatedProduct.id ? updatedProduct : product))
      )
    } else {
      setProducts(prev => [updatedProduct, ...prev])
    }
    handleCloseEditModal()
  }

  if (error) {
    return <p className="text-red-500">{error}</p>
  }

  return (
    <div className="w-full relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Produtos</h2>
        <button
          onClick={handleAdd}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Adicionar Produto
        </button>
      </div>

      {/* Contêiner com scroll para a tabela */}
      <div className="max-h-screen overflow-y-auto border border-gray-200 rounded-md">
        <table className="table-auto w-full mb-16">
          <thead>
            <tr>
              <th className="border px-4 py-2">Título</th>
              <th className="border px-4 py-2">Preço</th>
              <th className="border px-4 py-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr
                key={product.id}
                onClick={() => handleViewInfo(product)} // Exibe modal de informações
              >
                <td className="border px-4 py-2">{product.title}</td>
                <td className="border px-4 py-2">${product.price}</td>
                <td className="border px-4 py-2 flex gap-2">
                  <button
                    onClick={e => {
                      e.stopPropagation() // Evita disparar o clique do produto
                      handleEdit(product) // Exibe modal de edição
                    }}
                    className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded"
                  >
                    Editar
                  </button>
                  <button
                    onClick={e => {
                      e.stopPropagation() // Evita disparar o clique do produto
                      handleDelete(product.id)
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de Edição */}
      {isEditModalOpen && (
        <Modal isOpen={isEditModalOpen} onClose={handleCloseEditModal}>
          <ProductForm
            product={selectedProduct}
            isEditing={isEditing}
            onSave={handleSave}
            onClose={handleCloseEditModal}
          />
        </Modal>
      )}

      {/* Modal de Informações */}
      {isInfoModalOpen && selectedProduct && (
        <Modal isOpen={isInfoModalOpen} onClose={handleCloseInfoModal}>
          <div className="p-4">
            <h2 className="text-lg font-bold">{selectedProduct.title}</h2>
            <p className="mt-2">{selectedProduct.description}</p>
          </div>
        </Modal>
      )}
    </div>
  )
}
