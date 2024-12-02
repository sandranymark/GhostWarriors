import joi from "joi";

export const orderSchema = joi.object({
        orderID: joi.string().optional(),
      orderStatus: joi
        .string()
        .valid("Pending", "Preparing", "Done") // Exempel på möjliga statusar
        .required()
        .messages({
          "any.required": "Order status is required.",
          "any.only": "Order status must be one of 'Pending', 'Preparing', 'Done'.",
        }),
      orderItems: joi
        .array()
        .items(
          joi.object({
            productID: joi.string().required(),
            productName: joi.string().required(),
            productPrice: joi.number().required(),
            productQuantity: joi.number().required(),
            productTotalPrice: joi.number().required(),
          })
        )
        .required(),
        customerID: joi.string().required(),
        totalPrice: joi.number().required(),
        kitchenMessage: joi.string().optional(),
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
    kitchenMessage: joi.string().optional(),

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
  

//Författare: Sandra, Anton, Adréan
