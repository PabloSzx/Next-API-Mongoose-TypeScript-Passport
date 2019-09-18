import { Router } from "express";
import morgan from "morgan";

export const common = Router();

common.use(morgan("combined"));
