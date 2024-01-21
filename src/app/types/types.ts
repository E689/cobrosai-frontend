// Auth types
export interface SignInParams {
  email: string,
  password: string
}

export interface SignOutParams {
  jwt: string
}

export interface RegisterParams {
  email: string,
  password: string,
  file?: string
}

export interface RecoverParams {
  email: string,
}

export interface ChangeParams {
  password: string,
  passwordMatch: string
}

// AuthContext 
export interface IAuthContext {
  authUser: string | null,
  setAuthUser: Function,
  isLoggedIn: Boolean | null,
  setIsLoggedIn: Function
}

// General types
export interface UserAccount {
  email: string,
  jwt: string | undefined,
  type: string,
  id: string
}

// Auth Form 
export interface AuthFormProps {
  submitText: string,
  formType: "signin" | "signout" | "register" | "change" | "recover"
}