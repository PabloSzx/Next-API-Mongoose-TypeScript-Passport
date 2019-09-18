import { Router } from "express";
import { checkSchema, Location, validationResult, ValidationSchema } from "express-validator";

export const validation = (
  schema: ValidationSchema,
  location: Location[] = ["body"]
) => {
  const validator = Router();
  validator.use(checkSchema(schema, location));
  validator.use((req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      return next();
    }
    res.status(422).send(errors.array());
  });
  return validator;
};
