import { axios } from "../utils/axios"
import { Signin, Signup } from "../types/auth"

const signup = async (body: Signup) => {
    const { data } = await axios.post('/signup', body)
    return data
}

const signin = async (body: Signin) => {
    const { data } = await axios.post('/signin', body)
    return data
}

export const authService = {
    signup,
    signin
}