import joi from "joi";

export const orderSchema = joi.object({
    orderStatus:joi.string()
    .valid("Pending", "Confirmed", "Completed", "Cancelled") // Exempel på möjliga statusar
    .required()
    .messages({
      "any.required": "Order status is required.",
      "any.only": "Order status must be one of 'Pending', 'Confirmed', 'Completed', 'Cancelled'.",
    }),

    orderItems: joi.array().items(joi.object({
        productID: joi.string().required(),
        dishName: joi.string().required(),
        dishPrice: joi.number().required(),
        dishQuantity: joi.number().required(),
    })).required(),
    totalPrice: joi.number().required(),
    customerID: joi.string().required(),
    paymentStatus: joi.string().required(),
    customerName: joi.string().required(),
    customerContacts: joi.object({
        email: joi.string().email().required(),
        phone: joi.string().required(),
    }).required(),
    });

//Författare: SANDRA
//EJ KLART. MÅSTE FÅ UPP FUNKTIONERANA FÖR ATT KUNNA TESTA.