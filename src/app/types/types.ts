// Auth types
export interface ISignInParams {
  email: string,
  password: string,
  jwt?: string
}

export interface ISignOutParams {
  jwt: string
}

export interface IRegisterParams {
  email: string,
  password: string,
  file?: string
}

export interface IRecoverParams {
  email: string,
}

export interface IChangeParams {
  password: string,
  passwordMatch: string
}

// AuthContext 
export interface IAuthContext {
  authUser: IUserAccount | null,
  setAuthUser: Function,
  isLoggedIn: Boolean | null,
  setIsLoggedIn: Function
}

// General types
export interface IUserAccount {
  email: string,
  jwt: string | undefined,
  type: string
}

// Auth Form 
export interface IAuthFormProps {
  submitText: string,
  formType: "signin" | "signout" | "register" | "change" | "recover"
}

// DropZone component
export interface IDropZoneProps {
  setFile: Function
}