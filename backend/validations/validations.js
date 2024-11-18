import Joi from 'joi';

//CreateProduct validation schema
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

//UpdateProduct validation schema
export const updateProductSchema = Joi.object({
  productName: Joi.string().min(1).optional(),
  productPrice: Joi.number().min(0).optional(),
  category: Joi.string().min(1).optional(),
  imageURL: Joi.string().uri().optional(),
  description: Joi.string().optional(),
  ingredients: Joi.object().optional(),
  inStock: Joi.boolean().optional(),
  preparationTime: Joi.string().optional(),
}).min(1); // Ensure at least one field is provided for update


//GetProductById validation schema
export const getProductByIdSchema = Joi.object({
  id: Joi.string()
    .length(8) // Kontrollera att ID:t har exakt 8 tecken
    .required()
    .description("The product ID must be an 8-character string."),
});

//DeleteProduct validation schema
export const deleteProductSchema = Joi.object({
  id: Joi.string()
    .length(8) // Kontrollera att ID:t har exakt 8 tecken
    .required()
    .description("The product ID must be an 8-character string."),
});



// Get All Products Schema
// För att hämta alla produkter behöver man egentligen inte validera något, men om man till exempel har filter eller paginering kan man lägga till några valideringar. 
//Här är ett exempel för att hämta alla produkter med möjlighet till filtrering via kategori:


// export const getAllProductsSchema = Joi.object({
//   category: Joi.string().optional().description("Filter products by category."),
//   limit: Joi.number().min(1).optional().default(10).description("Limit the number of products returned."),
//   page: Joi.number().min(1).optional().default(1).description("Page number for pagination."),
// });


// FÖRFATTARE: SANDRA