import Joi from "joi";

export const signUpUserSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().email().required(),
    subscription: Joi.string().required().valid("starter", "pro", "business")
});

export const logInUserSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().email().required(),
});