import "reflect-metadata";
import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUi  from "swagger-ui-express";
import { AppError } from "@shared/errors/AppError";
import { router } from "./routes";
import '@shared/container/index'; 
import swaggerFile from "../../../swagger.json";
import createConnection from "@shared/infra/typeorm/index";
import upload from "@config/upload";

createConnection();

const app = express();
app.use(express.json()); 
app.use(router); 

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile)); 
app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));
app.use("/cars", express.static(`${upload.tmpFolder}/cars`));
  
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {

    if(err instanceof AppError) {
        return res.status(err.statusCode).json({
            message: err.message
        });
    }
    return res.status(500).json({
        status: "error",
        message: `Internal server error - ${err.message}`
    })
});

export { app };


