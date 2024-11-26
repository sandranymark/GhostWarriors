import Joi, { ObjectSchema } from "joi";
import { FormData } from "../types/formData";

export const paymentSchema: ObjectSchema<FormData> = Joi.object({
  name: Joi.string().min(3).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 3 characters long",
  }),
  email: Joi.string()
    .email({ tlds: { allow: ["com", "net", "nu", "se"] } })
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Email must be valid",
    }),
  cardNumber: Joi.string()
    .required()
    .pattern(/^[0-9]{16}$/) // Detta matchar endast strängar som är exakt 16 siffror långa.
    .messages({
      "string.empty": "Card number is required",
      "string.pattern.base": "Card number must be exactly 16 digits and contain only numbers", // När ogiltiga tecken används
    }),
  cvv: Joi.string()
    .pattern(/^[0-9]{3}$/) // säkerställer att strängen är exakt 3 siffror lång och att alla tecken är siffror
    .required()
    .messages({
      "string.empty": "CVV is required",
      "string.pattern.base": "CVV must be exactly 3 digits and contain only numbers",
    }),
  mm: Joi.string()
    .pattern(/^(0[1-9]|1[0-2])$/) // Mönster för månader mellan 01 och 12
    .required()
    .messages({
      "string.empty": "Month is required",
      "string.pattern.base": "Month must be between 01 and 12 and contain only numbers",
    }),
  yy: Joi.string()
    .pattern(/^\d{2}$/) // Kontrollera att det är exakt två siffror
    .required()
    .messages({
      "string.empty": "Year is required",
      "string.pattern.base": "Year must be exactly two digits and contain only numbers",
    }),
});
