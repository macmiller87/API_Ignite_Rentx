import { AppError } from "@shared/errors/AppError";
import { CategoryRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoryRepositoryInMemory:  CategoryRepositoryInMemory;

describe("Create Category", () => {

    beforeEach(() => {
        categoryRepositoryInMemory = new CategoryRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(categoryRepositoryInMemory);       
    });

    it("Should be able to create a new category", async () => {
        
        const category = {
            name: "Category Test",
            description: "Category description Test" 
        }

        await  createCategoryUseCase.execute({
            name: category.name,
            description: category.description
        });

        const categoryCreated = await categoryRepositoryInMemory.findByName(category.name);

        expect(categoryCreated).toHaveProperty("id");

    });

    it("Should not be able to create a new category with the same name", async () => {

        const category = {
            name: "Category Test",
            description: "Category description Test" 
        }

        await createCategoryUseCase.execute({
            name: category.name,
            description: category.description
        });

        await expect(
            createCategoryUseCase.execute({
                name: category.name,
                description: category.description
            })
        ).rejects.toEqual(new AppError("Category Already exists!"));
    });

});