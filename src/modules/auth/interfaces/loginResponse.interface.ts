import { PayloadUser } from '../types/payloadUser.type';

export default interface LoginResponse {
  user: PayloadUser,
  token: string,
}