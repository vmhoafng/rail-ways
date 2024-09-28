'use client'
import React, { useState } from 'react'
import { useModal } from './RegisterModalContext'

const RegisterModal = () => {
    const { isModalOpen, closeModal } = useModal()
    if (!isModalOpen) return null // Don't render the modal if it's not open

    const handleModalClick = (e: React.MouseEvent) => {
        e.stopPropagation() // Prevents modal click from closing the modal
    }
    return (
        <div
            onClick={closeModal}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        >
            <div
                onClick={handleModalClick}
                className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg"
            >
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-bold">Đăng ký khóa học</h2>
                    <button
                        onClick={closeModal}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="icon icon-tabler icons-tabler-outline icon-tabler-x"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M18 6l-12 12" />
                            <path d="M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form className="space-y-4">
                    <input
                        type="text"
                        placeholder="Họ tên"
                        className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-400 focus:outline-none"
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-400 focus:outline-none"
                    />

                    <input
                        type="text"
                        placeholder="Số điện thoại"
                        className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-400 focus:outline-none"
                    />

                    <button
                        type="submit"
                        className="w-full rounded-full bg-[#47CFA9] py-3 font-semibold text-white hover:bg-[#041686] hover:text-[#47CFA9]"
                    >
                        Đăng ký ngay
                    </button>
                </form>
            </div>
        </div>
    )
}

export default RegisterModal
