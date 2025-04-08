export type Status = 'good' | 'normal' | 'bad'

export interface Data {
  id: number
  content: string
  status: Status
}