import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import httpErrorHandler from "@middy/http-error-handler";
import { sendError, sendResponse } from "../../../responses/responses.js";
import db from "../../../services/services.js";
import { v4 as uuid } from "uuid";
import { orderSchema } from "../../../models/orderSchema.js";

async function createOrder(event) {
  console.log("Incoming event body:", event.body);

  try {
    const {
      orderStatus,
      orderItems = [],
      totalPrice,
      customerID,
      paymentStatus,
      customerName,
      customerContacts,
      kitchenMessage,
    } = event.body;

    const createdAt = new Date().toLocaleString("sv-SE", {
      timeZone: "Europe/Stockholm",
    });
    const updatedAt = createdAt;

    const orderData = {
      orderStatus,
      orderItems,
      totalPrice,
      customerID,
      paymentStatus,
      customerName,
      customerContacts,
      kitchenMessage,
    };

    // Validering - joi schema för order
    const validationResult = orderSchema.validate(orderData);
    if (validationResult.error) {
      return sendError(
        400,
        validationResult.error.details.map((detail) => detail.message)
      );
    }

    // Lägger till ID,createdAT och updatedAT efter validering för att undvika att det skickas med i bodyn
    orderData.id = uuid().substring(0, 8);
    orderData.orderID = orderData.id;
    orderData.createdAt = createdAt;
    orderData.updatedAt = updatedAt;

    const params = {
      TableName: "ordersTable",
      Item: orderData,
    };
    await db.put(params);
    console.log("Order successfully added to database:", orderData);

    return sendResponse(201, {
      message: "Order added successfully.",
      order: orderData,
    });
  } catch (error) {
    console.error("Error:", error.stack);
    return sendError(500, `Failed to create order: ${error.message}`);
  }
}

export const handler = middy(createOrder)
  .use(jsonBodyParser())
  .use(httpErrorHandler());

// Författare: SANDRA
