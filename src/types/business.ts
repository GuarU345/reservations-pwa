
export interface Business {
    id: string
    user_id: string
    category_id: string
    name: string
    description: string
    address: string
    phone: string
    email: string
    active: boolean
    created_at: string
    liked: boolean
    business_categories: BusinessCategory
    business_hours?: BusinessHour[]
}

interface BusinessCategory {
    category: string
}

export interface BusinessHour {
    day_of_week: number
    open_time: string
    close_time: string
    is_closed: boolean
}