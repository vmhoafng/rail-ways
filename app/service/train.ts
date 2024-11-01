import { ENDPOINTS } from '@/constants/endpoint'
import { getPublic } from '@/lib/api'

export const getCinema = () => {
    return getPublic(ENDPOINTS.CINEMA.LIST)
}