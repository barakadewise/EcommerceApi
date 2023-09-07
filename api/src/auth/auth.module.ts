import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthResolver } from './resolvers/auth.resolver';
import { LocalStrategy } from './strategy/local.startegy';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JWtStrategy } from './strategy/jwt.strategy';
import { LoginResponse } from './dto/login-response';


@Module({
  imports: [
    PassportModule.register({
      session: true,
      defaultStrategy: 'jwt'
    }),
    UserModule,
    JwtModule.register({
      secret: 'lukumay',
      signOptions: { expiresIn: '1000s' }
    })
  ],

  providers: [
    AuthResolver,
    AuthService,
    LocalStrategy,
    JWtStrategy,
    LoginResponse,

  ],
})
export class AuthModule { }
