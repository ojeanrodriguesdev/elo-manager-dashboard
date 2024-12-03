import { useState, useEffect } from 'react'
import { Product } from '../services/productService'

interface ProductFormProps {
  product: Product | null
  isEditing: boolean
  onSave: (product: Product) => void
  onClose: () => void
}

export default function ProductForm({ product, isEditing, onSave, onClose }: ProductFormProps) {
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (product && isEditing) {
      setTitle(product.title)
      setPrice(product.price.toString())
      setDescription(product.description)
    } else {
      setTitle('')
      setPrice('')
      setDescription('')
    }
  }, [product, isEditing])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newProduct: Product = {
      id: isEditing && product ? product.id : Math.random(),
      title,
      price: parseFloat(price),
      description,
    }
    onSave(newProduct)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pb-10">
      <div>
        <label className="block text-sm font-medium text-gray-700">Título</label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="block w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Preço</label>
        <input
          type="number"
          value={price}
          onChange={e => setPrice(e.target.value)}
          className="block w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Descrição</label>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="block w-full p-2 border rounded"
          required
        ></textarea>
      </div>
      <div className="flex justify-end gap-4">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {isEditing ? 'Atualizar' : 'Salvar'}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}
