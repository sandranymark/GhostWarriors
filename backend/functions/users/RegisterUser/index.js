import bcrypt from "bcryptjs";
import db from "../../../services/services.js";
import { sendResponse, sendError } from "../../../responses/responses.js";
import jsonBodyParser from "@middy/http-json-body-parser";
import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import { v4 as uuid } from "uuid";
import { registerUserSchema } from "../../../models/registerSchema.js";

async function RegisterUser(event) {
  const { username, email, password, role = "user" } = event.body; // Ta emot role (default till 'user')

  // Validera användardata med Joi
  const { error } = registerUserSchema.validate({ username, email, password });
  if (error) {
    return sendError(400, error.details[0].message); // Returnera Joi-felmeddelande om validering misslyckas
  }

  try {
    // Kontrollera om användarnamn redan finns
    const usernameParams = {
      TableName: "usersTable",
      IndexName: "username-index",
      KeyConditionExpression: "username = :username",
      ExpressionAttributeValues: {
        ":username": username,
      },
    };
    const usernameResult = await db.query(usernameParams);

    if (usernameResult.Items && usernameResult.Items.length > 0) {
      return sendError(400, "Username already exists");
    }

    // Kontrollera om e-post redan finns
    const emailParams = {
      TableName: "usersTable",
      IndexName: "email-index",
      KeyConditionExpression: "email = :email",
      ExpressionAttributeValues: {
        ":email": email,
      },
    };
    const emailResult = await db.query(emailParams);

    if (emailResult.Items && emailResult.Items.length > 0) {
      return sendError(400, "Email already exists");
    }

    // Skapa ett unikt användar-ID
    const userId = uuid().substring(0, 8);

    // Hasha lösenordet innan du sparar det
    const hashedPassword = await bcrypt.hash(password, 10);

    // Spara användaren i DynamoDB
    const paramsPut = {
      TableName: "usersTable",
      Item: {
        userId,
        username,
        email,
        password: hashedPassword,
        role, // Lägg till rollen
      },
    };
    await db.put(paramsPut);

    return sendResponse(201, { message: "User registered successfully!" });
  } catch (error) {
    console.error("Error registering user:", error);
    return sendError(500, "Error registering user");
  }
}

export const handler = middy(RegisterUser)
  .use(jsonBodyParser())
  .use(httpErrorHandler());

//Författare: SANDRA
