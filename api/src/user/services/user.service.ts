import { Injectable } from '@nestjs/common';
import { CreateUserInput } from '../dto/create-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm'
import { User } from '../entities/user.entity';



@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) { }

  //function to create user
  async createUser(userInput: CreateUserInput): Promise<User | string> {
    const userExist = await this.userRepository.findOne({ where: { name: userInput.name } })
    try {
      if (userExist) {
        return `{ ${userInput.name} Already taken try another.}`
      }
      const newUser = this.userRepository.create(userInput)
      return this.userRepository.save(newUser);

    } catch {
      throw new Error('): Something went wrong!')
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
}
