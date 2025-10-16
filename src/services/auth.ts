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

const logout = async (token: string) => {
    const { data } = await axios.post("/logout", {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return data
}

const tokenIsActive = async (token: string) => {
    const { data } = await axios.get("/session/active", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return data
}

export const authService = {
    signup,
    signin,
    logout,
    tokenIsActive
}