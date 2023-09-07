import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from '../services/user.service';
import { User } from '../entities/user.entity';
import { CreateUserInput } from '../dto/create-user.input';
import { DeleteResult } from 'typeorm';


@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) { }

  //create new user function 
  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput): Promise<User | string> {
    return this.userService.createUser(createUserInput);
  }

  //fetch all users on the database 
  @Query(() => [User], { name: 'users' })
  async findAllUsers(): Promise<User[]> {
    return this.userService.findAllIUsers();
  }

  //find user by email
  @Query(() => User, { name: 'user' })
  findOne(@Args('email', { type: () => String }) email: string) {
    return this.userService.findOne(email);
  }

  //Delete user from the database....
  @Mutation(() => User)
  async removeUser(@Args('id', { type: () => Int }) id: number): Promise<DeleteResult> {
    return this.userService.removeUser(id)
  }
}

 // @Mutation(() => User)
  // updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
  //   return this.userService.update(u updateUserInput);
  // }
