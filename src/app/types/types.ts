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
  password?: string,
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
  file?: File,
  formType: "signin" | "signout" | "register" | "change" | "recover" | "quick"
}

// DropZone component
export interface IDropZoneViewElements {
  setStep: Function,
}

export interface IDropZoneProps extends IDropZoneViewElements {
  setFile: Function
}

export interface IDropZoneBillForm extends IDropZoneViewElements {
  setDate: Function,
  setInvoiceNo: Function,
  setNIT: Function,
  setAmount: Function,
  setCompanyName: Function
}

export interface IDropZoneEmailForm extends IDropZoneViewElements {
  setEmail: Function
}

// Bills interfaces
export interface IBillsTable {
  date: string,
  clientName: string,
  clientNit: number,
  billId: string,
  amount: number,
  status: "AIOff" | "Human" | "Paid" | "Process",
  dueDays: number,
  logs: string
}