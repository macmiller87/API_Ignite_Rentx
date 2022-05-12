import { inject, injectable } from "tsyringe"; 
import { AppError } from "@shared/errors/AppError";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class  CreateCategoryUseCase {
    
    constructor(@inject("CategoriesRepository") private categoriesRepository: ICategoriesRepository) {}

    async execute({ name, description }: IRequest): Promise<void> {
        const categoryAlredyExists = await this.categoriesRepository.findByName(name); 

        if(categoryAlredyExists) {
            throw new AppError("Category Already exists!");
        }

       await this.categoriesRepository.create({ name, description });
    }
}

export { CreateCategoryUseCase };