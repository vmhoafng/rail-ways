import { cookies } from 'next/headers'
import React from 'react'

const HelloUser = () => {
    const cookieStore = cookies()
    const accessToken = cookieStore.get('accessToken')

    return (
        <div></div>
    )
}

export default HelloUser