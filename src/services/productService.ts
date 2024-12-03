import axios from 'axios'

export interface Product {
  id: number
  title: string
  price: number
  description: string
}

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await axios.get('https://fakestoreapi.com/products')
  return response.data
}

export const deleteProduct = async (id: number): Promise<void> => {
  await fetch(`https://fakestoreapi.com/products/${id}`, { method: "DELETE" });
};