export interface Event {
  name: string;
  duration: number;
  type: string;
  url: string;
  color: string;
  createdBy?: string;
  businessId?: unknown;
  id?: string

}

export const initialEvent = {
  name: '',
  duration: 0,
  type: '',
  url: '',
  color: '',
  createdBy: '',
  businessId: '',
  id: ''

}
export interface UserDetail {
  userName: string;
  email: string;
  note: string
}