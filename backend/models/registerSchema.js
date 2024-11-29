import Joi from 'joi';

export const registerUserSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required().messages({
        'string.base': `"username" should be a type of 'text'`,
        'string.empty': `"username" cannot be an empty field`,
        'string.alphanum': `"username" should only contain letters and numbers`,
        'string.min': `"username" should have a minimum length of 3 characters`,
        'string.max': `"username" should have a maximum length of 30 characters`,
        'any.required': `"username" is a required field`
    }),
    email: Joi.string().email().required().messages({
        'string.base': `"email" should be a type of 'text'`,
        'string.empty': `"email" cannot be an empty field`,
        'string.email': `"email" must be a valid email address`,
        'any.required': `"email" is a required field`
    }),
    password: Joi.string().min(8).required().messages({
        'string.base': `"password" should be a type of 'text'`,
        'string.empty': `"password" cannot be an empty field`,
        'string.min': `"password" should have a minimum length of 8 characters`,
        'any.required': `"password" is a required field`
    })
});