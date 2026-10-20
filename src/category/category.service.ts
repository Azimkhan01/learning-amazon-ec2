import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDTO } from './dto/create.category.dto.js';
import { Repository } from 'typeorm';
import { Category } from '../entity/category.entity.js';
import { ConflictException, Injectable } from '@nestjs/common';

@Injectable()
export class CategoryService {

    constructor(@InjectRepository(Category)
    private categoryRepository: Repository<Category>,) { }

    async createCategory(createCategoryDTO: CreateCategoryDTO): Promise<Category | null> {
        let u = await this.categoryRepository.findOne({
            where: { name: createCategoryDTO.name }
        })

        if (u)
            throw new ConflictException("Category already exists")
        else {
         
            u  = this.categoryRepository.create(createCategoryDTO)
            return await this.categoryRepository.save(u);

        }
    }

    async getCategory(): Promise<Category[]> {
        return await this.categoryRepository.find()
    }

    async getCategoryById(id: number): Promise<Category | null> {
        return await this.categoryRepository.findOne({
            where: { id }
        })
    }

}
