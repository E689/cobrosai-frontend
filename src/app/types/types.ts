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
  setIsLoggedIn: Function,
  loading: boolean
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
  setStep?: Function,
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

// AI Statuses
export interface IAIStatuses {
  status: "AIOff" | "Human" | "Paid" | "Process" | "Anulada"
}

// AIStats interface
export interface IAIStatsProps {
  automatedQty: number,
  automatedMax: number
}

// AI Selector interface
export interface IAISelector {
  defaultValue: IAIStatuses,
  billId: string,
  clientId: string
}

// Bills interfaces
export interface IBillsParams extends IAIStatuses {
  date: string | undefined,
  clientName: string | undefined,
  clientId: number | undefined,
  billId: string | undefined,
  amount: number | undefined,
  creditDays: number | undefined,
  log?: string | undefined
}

export interface ICreateBillManuallyParams {
  amount: number,
  date: string,
  clientId: string,
  clientName?: string,
  billId: string,
  userId: string
}

export interface IBillLogData {
  date: string,
  case: number,
  content: string,
  role: string
}

// Clients interfaces
export interface IClientParams {
  clientId: string,
  clientName: string,
  nit: number,
  creditDays?: number,
  clientCollectionSchedule?: string,
  contactName?: string,
  contactLastName?: string,
  email?: string,
  phone?: number,
  aIToggle?: boolean
}

export interface IClientExtendedParams extends IClientParams {
  expired: number,
  lowExpired: number,
  mediumExpired: number,
  highExpired: number,
  criticalExpired: number,
  lastMessage: string,
  ignoredMsgs: number,
  brokenPromises: number,
  collectionFlow: string
}

export interface IClientsFormParams {
  action: "edit" | "create",
  client?: IClientParams | undefined
}

// Client Flow Selector interface
export interface IClientFlowSelector {
  defaultValue: string,
  clientId: string
}

// Flow Interfaces
export interface IFlowPreCollection {
  instruction: string
}

export interface IFlowCollectionPaymentConfirmation {
  instruction: string,
}

export interface IFlowCollectionPaymentDelay {
  instruction: string,
}

export interface IFlowCollectionIgnore {
  instruction: string,
}

export interface IFlowParams {
  _id?: string,
  name: string,
  preCollection?: string,
  paymentConfirmation?: string,
  paymentConfirmationVerify?: string,
  paymentDelay?: string,
  paymentDelayNewDate?: string,
  collectionIgnored?: string
}

export interface ICreateFlowFormParams {
  userId: string,
  action: "edit" | "create",
  flowId?: string
}

export interface ICreateFlowRequest extends IFlowParams {
  userId: string,
}

// Use profile interfaces
export interface IUserProfile {
  companyName: string,
  businessLogic: string,
  assistantContext: string
 }