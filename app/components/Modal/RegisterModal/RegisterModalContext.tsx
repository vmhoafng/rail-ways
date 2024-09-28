'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react'

// Define the type for the context value
interface ModalContextType {
    isModalOpen: boolean
    openModal: () => void
    closeModal: () => void
}

// Create the context with a default value
const ModalContext = createContext<ModalContextType | undefined>(undefined)

// Custom hook to use the ModalContext
export const useModal = (): ModalContextType => {
    const context = useContext(ModalContext)
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider')
    }
    return context
}

// Define the type for the provider's props
interface ModalProviderProps {
    children: ReactNode
}

// Create the provider component
export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    const openModal = () => setIsModalOpen(true)
    const closeModal = () => setIsModalOpen(false)

    return (
        <ModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>
            {children}
        </ModalContext.Provider>
    )
}
