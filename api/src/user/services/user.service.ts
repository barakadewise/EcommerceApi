import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserInput } from '../dto/create-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm'
import { User } from '../entities/user.entity';
import { UpdateUserInput } from '../dto/update-user.input';



@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) { }

  //function to create user
  async createUser(userInput: CreateUserInput): Promise<User> {
    const userExist = await this.userRepository.findOne({ where: { email: userInput.email } })
    try {
      if (userExist) {
        throw new UnauthorizedException();
      }
      const newUser = this.userRepository.create(userInput)
      return this.userRepository.save(newUser);

    } catch {
      throw new Error('User exist')
    }

  }

  //fetch all users from the database
  async findAllIUsers(): Promise<User[]> {
    return this.userRepository.find()
  }

  ///find one user with email
  async findOne(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email: email } })
  }


  //dete user from the database 
  async removeUser(id: number): Promise<DeleteResult> {
    return this.userRepository.delete(id)
  }

  //update user profila data 
  async updateUser(updateUserInput: UpdateUserInput): Promise<UpdateUserInput> {
    try {
      const userExist = await this.userRepository.findOne({ where: { email: updateUserInput.email } });
      if (!userExist) {
        throw new Error('User not found!')
      }
      await this.userRepository.update(userExist.id, updateUserInput);
      return updateUserInput;

    } catch (error
    ) {
      throw error;

    }
  }
}
