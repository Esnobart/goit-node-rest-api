import Joi from "joi";

export const signUpUserSchema = Joi.object({
    password: Joi.string(),
    email: Joi.string().email(),
    subscription: Joi.string().valid("starter", "pro", "business")
});

export const logInUserSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().email().required(),
});