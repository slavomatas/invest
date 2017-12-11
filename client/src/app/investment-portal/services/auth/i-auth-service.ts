import { Observable } from "rxjs/Observable";

export abstract class IAuthService {
    abstract getRegisterVerificationResult(token: string): Promise<boolean>;
}