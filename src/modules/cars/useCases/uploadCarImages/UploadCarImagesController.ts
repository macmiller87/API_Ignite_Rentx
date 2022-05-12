import { Request, Response } from "express";
import { container } from "tsyringe";
import { UploadCarImagesUseCase } from "./UploadCarImagesUseCase";

interface IFiles {
    filename: string;
}

class UploadCarImagesController {

    async handle(req: Request, res: Response): Promise<Response> {

        const images = req.files as IFiles[];
        const { id } = req.params;

        const uploadCarImagesUseCase = container.resolve(UploadCarImagesUseCase);

        const images_name = images.map((file) => file.filename);

        await uploadCarImagesUseCase.execute({
            car_id: id,
            images_name,
        });

        return res.status(201).send();
    }
}

export { UploadCarImagesController };