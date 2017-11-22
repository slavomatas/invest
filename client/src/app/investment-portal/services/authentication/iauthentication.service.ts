import {RequestStatus} from '../../types/types';

export interface IAuthenticationService {
  register(name: string, email: string, password: string): Promise<RequestStatus>;
}
