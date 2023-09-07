import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from "passport-jwt";


@Injectable()
export class JWtStrategy extends PassportStrategy(Strategy) {
    constructor(
    ) {
        super(
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                ignoreExpiration: false,
                secretOrKey: 'lukumay',
            }
        )
    }

    //valid user from the payload request
    async validate(payload: any): Promise<any> {
        return {
            userId: payload.sub,
            email: payload.email
        }
    }
}