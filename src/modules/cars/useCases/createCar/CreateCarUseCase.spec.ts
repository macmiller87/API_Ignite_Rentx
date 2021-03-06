import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase:  CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    });

    it("Should be able a create a new car", async () => {

      const car = await createCarUseCase.execute({
            name: "Name Car", 
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Brand",
            category_id: "Category"  
        });

        expect(car).toHaveProperty("id");
    });

    it("Should not be able to create a car, if already exists a  car with same license plate!", async () => {

        await createCarUseCase.execute({
            name: "Car 1", 
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Brand",
            category_id: "Category"  
        });

        await expect(
            createCarUseCase.execute({
                name: "Car 2", 
                description: "Description Car",
                daily_rate: 100,
                license_plate: "ABC-1234",
                fine_amount: 60,
                brand: "Brand",
                category_id: "Category"  
            })  
        ).rejects.toEqual(new AppError("Car already exists!"));
    }); 

    it("Should be able to create a car with true availability by default!", async () => {

        const car = await createCarUseCase.execute({
            name: "Car Available", 
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ABCD-1234",
            fine_amount: 60,
            brand: "Brand",
            category_id: "Category"  
        }); 

        expect(car.available).toBe(true);
    }); 

});