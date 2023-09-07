import { Injectable, Logger } from '@nestjs/common';
import { UserService } from 'src/user/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginResponse } from '../dto/login-response';



@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    // Validate user email and password 
    async validateUser(email: string, password: string) {
        const user = await this.userService.findOne(email)
        if (user && user.password === password) {
            const { password, ...results } = user
            return results;

        }
        return null;
    }

    //assign the login user with  jwt token and return the response
    async login(user: any): Promise<LoginResponse> {
        const payload = { sub: user.id, email: user.email }
        const access_token = this.jwtService.sign(payload);
        const loginResponse: LoginResponse = {
            access_token,
            user,
        };
        return loginResponse
    }

}
