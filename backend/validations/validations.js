import Joi from 'joi';

export const productSchema = Joi.object({
  productName: Joi.string().min(1).required().description("Product name is required and must be a non-empty string."),
  productPrice: Joi.number().min(0).required().description("Product price must be a number greater than or equal to 0."),
  category: Joi.string().min(1).required().description("Category is required and must be a non-empty string."),
  imageURL: Joi.string().uri().optional().description("Image URL must be a valid URI."),
  description: Joi.string().optional(),
  ingredients: Joi.object().optional(),
  inStock: Joi.boolean().optional(),
  preparationTime: Joi.string().optional(),
});