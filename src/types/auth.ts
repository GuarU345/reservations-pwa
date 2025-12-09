
export interface Signup {
    name: string,
    email: string,
    password: string
    role: string
}

export interface Signin {
    email: string,
    password: string
    role: string
}

export interface VerifyCodeResponse {
  message: string;
  tok_token: string;
  usr_id: string;
  cmp_id: string;
}