import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity.js';
import { Repository } from 'typeorm';
import { createUserDTO } from './dto/user.create.dto.js';

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

    async getUsers(): Promise<User[]> {
        return await this.userRepository.find({})
    }

    async getUsersByID(id: number): Promise<User | null> {
        const user = await this.userRepository.findOne({
            where: { id },
        });
        if (!user)
            throw new NotFoundException("User with the id not found ")
        return user
    }
    async createUser(data: createUserDTO): Promise<User> {
        const existingUser = await this.userRepository.findOne({
            where: { email: data.email },
        });

        if (existingUser) {
            throw new ConflictException('User Already Exists');
        }

        const user = this.userRepository.create(data);

        return await this.userRepository.save(user);
    }

}
