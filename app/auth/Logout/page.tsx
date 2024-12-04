// 'use client'


// import authApiRequest from '@/app/apiRequests/auth'
// import { useUser } from '@/contexts/UserContext'
// import { clientAccessToken } from '@/lib/http'
// import { usePathname, useRouter, useSearchParams } from 'next/navigation'
// import { Suspense, useEffect } from 'react'

// function LogoutLogic() {
//     const router = useRouter()
//     const pathname = usePathname()
//     const searchParams = useSearchParams()
//     const accessToken = searchParams.get('accessToken')
//     const { setLoggedIn } = useUser()
//     useEffect(() => {
//         const controller = new AbortController()
//         const signal = controller.signal
//         if (accessToken === clientAccessToken.value) {
//             authApiRequest
//                 .logout.logout(true,signal)
//                 .then((res) => {
//                     setLoggedIn(false)
//                     router.push(`/auth?redirectFrom=${pathname}`)
//                 })
//         }
//         return () => {
//             controller.abort()
//         }
//     }, [accessToken, router, pathname, setLoggedIn])
//     return <div>page</div>
// }

// export default function LogoutPage() {
//     return (
//         <Suspense>
//             <LogoutLogic />
//         </Suspense>
//     )
// }