import React from 'react'

export const GoogleMaps = () => {
    return (
        <div>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d125405.07076015465!2d106.632512!3d10.818317!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529c8b0e8587d%3A0x6a9b830ec04c8a00!2zVHJ1bmcgVMOibSDEkMOgbyBU4bqhbyBMw6FpIFhlIFRyxrDhu51uZyBBbg!5e0!3m2!1svi!2sus!4v1723627625052!5m2!1svi!2sus"
                className='w-full'
                height="500"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </div>
    )
}
