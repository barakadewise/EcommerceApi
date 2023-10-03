import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from '../services/auth.service';
import { LoginResponse } from '../dto/login-response';
import { LoginUserInput } from '../dto/login-user-iputs';
import { UnauthorizedException} from '@nestjs/common'




@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,


  ) { }

  @Query(() => LoginResponse)
  async login(@Args('loginInput') loginInput: LoginUserInput): Promise<LoginResponse> {
    const user = await this.authService.validateUser(
      loginInput.email,
      loginInput.password
    )
    if (!user) {
      throw new UnauthorizedException('Invalid credentials...')
    }
    return this.authService.login(user)

  }
}
