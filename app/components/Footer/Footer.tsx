import React from 'react'
import { FooterProps } from './Footer.type'
import Image from 'next/image'
import { GoogleMaps } from './components/GoogleMaps'
import Contact from './components/Contact'
import ContactInfo from './components/ContactInfo'
import CoursesMenu from './components/CoursesMenu'
import Suggestion from './components/Suggestion'

function Footer({}: FooterProps) {
    return (
        <div>
            <Contact />
            <GoogleMaps />
            <footer className="mx-auto mb-28 mt-14 flex flex-col gap-7 px-3 text-[#666] lg:grid lg:grid-cols-3 lg:gap-14 lg:px-14 xl:mx-44 lg:max-w-[1140px] 2xl:max-w-[1440px]">
                <ContactInfo />
                <CoursesMenu />
                <Suggestion />
            </footer>
        </div>
    )
}

export default Footer
