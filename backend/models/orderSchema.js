import joi from "joi";

export const orderSchema = joi.object({
  orderStatus: joi
    .string()
    .valid("Pending", "Preparing", "Done") // Exempel på möjliga statusar
    .required()
    .messages({
      "any.required": "Order status is required.",
      "any.only": "Order status must be one of 'Pending', 'Preparing', 'Done'.",
    }),
  kitchenMessage: joi.string().required(),
  orderItems: joi
    .array()
    .items(
      joi.object({
        productID: joi.string().required(),
        productName: joi.string().required(),
        productPrice: joi.number().required(),
        productTotalPrice: joi.number().required(),
        productQuantity: joi.number().required(),
      })
    )
    .required(),
  paymentStatus: joi.string().required(),
  customerName: joi.string().required(),
  customerContacts: joi
    .object({
      email: joi.string().email().required(),
    })
    .required(),
});

export const updateOrderSchema = joi
  .object({
    orderStatus: joi.string().optional().valid("Pending", "Preparing", "Done"),
    kitchenMessage: joi.string().min(3),

    orderItems: joi
      .array()
      .items(
        joi.object({
          productID: joi.string().optional(),
          productName: joi.string().optional(),
          productPrice: joi.number().optional(),
          productTotalPrice: joi.number().optional(),
          productQuantity: joi.number().optional(),
        })
      )
      .optional(),
    paymentStatus: joi.string().optional(),
    customerName: joi.string().optional(),
    customerContacts: joi
      .object({
        email: joi.string().email().optional(),
      })
      .optional(),
  })
  .min(1);

//Författare: Sandra, Anton, Adréan
