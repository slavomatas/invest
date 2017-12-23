import { User } from '../../types/types';
import { RequestStatus, Token } from '../../types/authentication-types';

export interface IAuthenticationService {
  register(name: string, surname: string, email: string, password: string): Promise<RequestStatus>;
  login(email: string, password: string): Promise<Token>;
  getUser(token: string): Promise<User>;
  getRegisterVerificationResult(token: string): Promise<RequestStatus>;
}
