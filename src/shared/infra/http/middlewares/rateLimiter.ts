import * as redis from "redis";
import { RateLimiterRedis } from "rate-limiter-flexible";
import { NextFunction, Request, Response } from "express";
import { AppError } from "@shared/errors/AppError";

const redisClient = redis.createClient({
    legacyMode: true,
    socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
    }
});

const limiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: "rateLimiter",
    points: 10, // 10 requests
    duration: 5, // per 1 second by IP
});
  
export default async function rateLimiter(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        await redisClient.connect();

        await limiter.consume(req.ip);

        return next();
    }catch(err) {
        throw new AppError("Too many requests", 429);
    }finally {
        await redisClient.disconnect();
    }
};