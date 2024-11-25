import Joi from "joi";

export const paymentSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 2 characters long",
  }),
  email: Joi.string()
    .email({ tlds: { allow: ["com", "net", "nu", "se"] } })
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Email must be valid",
    }),
  cardNumber: Joi.string()
    .length(16)
    .required()
    .pattern(/^[0-9]+$/)
    .messages({
      "string.empty": "Card number is required",
      "string.pattern.base": "Card number must contain only numbers", // När ogiltiga tecken används
      "string.length": "Card number must be exactly 16 digits",
    }),
  cvv: Joi.string()
    .pattern(/^[0-9]{3}$/)
    .length(3)
    .required()
    .messages({
      "string.empty": "CVV is required",
      "string.length": "CVV must be exactly 3 digits",
      "string.pattern.base": "CVV must contain only numbers",
    }),
  mm: Joi.string().min(2).max(2).required().messages({
    "number.base": "Month is required",
    "number.min": "Month must be between 1 and 12",
    "number.max": "Month must be between 1 and 12",
    "string.pattern.base": "MM must contain only numbers",
  }),
  yy: Joi.string().min(2).max(2).required().messages({
    "number.base": "Year is required",
    "number.min": "Year must be valid",
    "string.pattern.base": "YY must contain only numbers",
  }),
});
