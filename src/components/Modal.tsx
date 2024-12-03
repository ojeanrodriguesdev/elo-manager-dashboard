import React from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-60">
      <button
        onClick={onClose}
        className="flex flex-col right-[39%] text-white hover:text-gray-900"
      >
        Fechar
      </button>
      <div className="bg-white rounded-lg shadow-lg m-6 p-6 w-full max-w-md">{children}</div>
    </div>
  )
}
