export interface IValidation {
  test(value: string, state: any): boolean
  error: string
}

export interface IInputState {
  value: string
  error: React.ReactNode
  validations: IValidation[]
}
