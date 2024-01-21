import { SignInParams, SignOutParams, RecoverParams, ChangeParams, IAuthContext } from "@/app/types/types"
import { AuthContext } from "@/providers/AuthProvider"
import { useContext } from "react"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const SignIn = async ({email, password}: SignInParams): Promise<any> => {
  console.log("SingIn with: (", email, ", ", password, ")")

  const credentials = {}
  /**
  const res = await fetch(API_URL + "/users/login", {
    method: 'POST',
    body: JSON.stringify(credentials),
    headers: { "Content-Type": "application/json" }
  })
  // TODO: Add logic to handdle exceptions on wrong request or incorrect credentials.
  // throw new Error();

  const user = await res.json()

  */
  // Here I should set JWT cookie and user info as localstorage.
  //cookies().set('jwt', 'test-jwt', {secure: true})
  sessionStorage.setItem('user', JSON.stringify({email: "beta@cobros.ai"}))
}

export const SignOut = async ({jwt}: SignOutParams): Promise<any> => {
  console.log("SignOut with: (", jwt, ")")

  const credentials = {}
  /**
  const res = await fetch(API_URL + "/users/logout", {
    method: 'POST',
    body: JSON.stringify(credentials),
    headers: { "Content-Type": "application/json" }
  })
  // TODO: Add logic to handdle exceptions on wrong request or incorrect credentials.
  // throw new Error();

  */
  // Here I should remove JWT cookie and user info from localstorage.
  //cookies().delete('jwt')
  sessionStorage.removeItem('user')
}
