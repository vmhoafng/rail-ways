'use client'
import React, { useContext, useState } from 'react'
import { MobileSidebarProps } from './MobileSidebar.type'
import { motion, useCycle } from 'framer-motion'
import { useModal } from '../../Modal/RegisterModal/RegisterModalContext'
import { MenuItem } from './MenuItem'

function MobileSidebar({}: MobileSidebarProps) {
    const { openModal, isModalOpen } = useModal()
    const [isOpen, toggleOpen] = useCycle(false, true)
    return (
        openModal && (
            <motion.div
                initial={false}
                animate={isOpen ? 'open' : 'closed'}
                className="fixed bottom-5 right-4 flex flex-col gap-1 lg:hidden"
            >
                <div className="flex flex-col gap-1">
                    {/* <button className="flex size-16 items-center justify-center rounded-full bg-[#e60808] drop-shadow-lg">
                        <a href="">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="icon icon-tabler icons-tabler-outline icon-tabler-map-pin-2"
                            >
                                <path
                                    stroke="none"
                                    d="M0 0h24v24H0z"
                                    fill="none"
                                />
                                <path d="M12 18.5l-3 -1.5l-6 3v-13l6 -3l6 3l6 -3v7" />
                                <path d="M9 4v13" />
                                <path d="M15 7v5" />
                                <path d="M21.121 20.121a3 3 0 1 0 -4.242 0c.418 .419 1.125 1.045 2.121 1.879c1.051 -.89 1.759 -1.516 2.121 -1.879z" />
                                <path d="M19 18v.01" />
                            </svg>
                        </a>
                    </button>
                    <button className="flex size-16 items-center justify-center rounded-full bg-[#0087FD] drop-shadow-lg">
                        <a href="">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="icon icon-tabler icons-tabler-outline icon-tabler-phone"
                            >
                                <path
                                    stroke="none"
                                    d="M0 0h24v24H0z"
                                    fill="none"
                                />
                                <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
                            </svg>
                        </a>
                    </button>
                    <button
                        onClick={openModal}
                        className="flex size-16 items-center justify-center rounded-full bg-[#0018E2] drop-shadow-lg"
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
                            className="icon icon-tabler icons-tabler-outline icon-tabler-mail"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" />
                            <path d="M3 7l9 6l9 -6" />
                        </svg>
                    </button>
                    <button className="flex size-16 items-center justify-center rounded-full bg-[#ff9900] drop-shadow-lg">
                        <a href="">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="icon icon-tabler icons-tabler-outline icon-tabler-brand-messenger"
                            >
                                <path
                                    stroke="none"
                                    d="M0 0h24v24H0z"
                                    fill="none"
                                />
                                <path d="M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1" />
                                <path d="M8 13l3 -2l2 2l3 -2" />
                            </svg>
                        </a>
                    </button> */}
                    <MenuItem openModal={openModal} />
                </div>
                <button
                    onClick={() => toggleOpen()}
                    className={`flex size-12 items-center justify-center rounded-full bg-[#47CFA9] drop-shadow-lg transition-all duration-700 will-change-auto ${isOpen && 'rotate-[135deg]'}`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="icon icon-tabler icons-tabler-outline icon-tabler-plus"
                    >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M12 5l0 14" />
                        <path d="M5 12l14 0" />
                    </svg>
                </button>
            </motion.div>
        )
    )
}

export default MobileSidebar
