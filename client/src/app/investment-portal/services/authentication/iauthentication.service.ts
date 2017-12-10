import {RequestStatus, Token, User} from '../../types/types';

export interface IAuthenticationService {
  register(name: string, surname: string, email: string, password: string): Promise<RequestStatus>;
  login(email: string, password: string): Promise<Token>;
  getUser(token: string): Promise<User>;
}
