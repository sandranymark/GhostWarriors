import joi from 'joi';

export const loginSchema = joi.object({
    username: joi.string().required().messages({
        'string.base': `"username" should be a type of 'text'`,
        'string.empty': `"username" cannot be an empty field`,
        'any.required': `"username" is a required field`
    }),
    password: joi.string().min(8).required().messages({
        'string.base': `"password" should be a type of 'text'`,
        'string.empty': `"password" cannot be an empty field`,
        'string.min': `"password" should have a minimum length of 8 characters`,
        'any.required': `"password" is a required field`
    })
})