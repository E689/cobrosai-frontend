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
  email: string | undefined,
  password?: string,
  file?: File | undefined,
  bill?: IBillsParams
}

export interface IRecoverParams {
  email: string,
}

export interface IChangeParams {
  email: string,
  oldPassword: string,
  newPassword: string,
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
  type: number,
  id: string
}

// Auth Form 
export interface IAuthFormProps {
  submitText: string,
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

// AIStats interface
export interface IAIStatsProps {
  automatedQty: number,
  automatedMax: number
}

// Bills interfaces
export interface IBillsParams {
  date: string | undefined,
  clientName: string | undefined,
  clientId: number | undefined,
  billId: string | undefined,
  amount: number | undefined,
  status: "AIOff" | "Human" | "Paid" | "Process",
  creditDays: number | undefined,
  logs?: string | undefined
}