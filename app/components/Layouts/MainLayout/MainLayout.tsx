import React from 'react'
import { LayoutProps } from './MainLayout.type'
import Navbar from '../../Navbar'
import Footer from '../../Footer'
import Sidebar from '../../Sidebar'
import RegisterModal from '../../Modal/RegisterModal/RegisterModal'

function Layout({ children }: LayoutProps) {
    return (
        <div className="relative">
            <header>
                <Navbar />
            </header>
            <main className="mt-12 min-h-screen bg-slate-50 pb-20 lg:mt-20">
                {children}
            </main>
            <footer>
                <Footer />
            </footer>
            <Sidebar />
            <RegisterModal />
        </div>
    )
}

export default Layout
