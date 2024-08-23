import { Request, Response, NextFunction, Router } from "express";

import { AnyZodObject } from "zod";

export const validateData = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
      });
      return next();
    } catch (error) {
      next(error);
    }
  };
};
