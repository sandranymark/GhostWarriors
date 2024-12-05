import bcrypt from "bcryptjs";
import db from "../../../services/services.js";
import { sendResponse, sendError } from "../../../responses/responses.js";
import jsonBodyParser from "@middy/http-json-body-parser";
import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import { loginSchema } from "../../../models/loginSchema.js";
import { generateJWT } from "../../../utils/environment.js";

async function LoginUser(event) {
  const { username, password } = event.body;

  // Validera användarens inloggningsuppgifter
  const { error } = loginSchema.validate({ username, password });
  if (error) {
    return sendError(400, error.details[0].message);
  }

  try {
    const params = {
      TableName: "usersTable",
      IndexName: "username-index",
      KeyConditionExpression: "username = :username",
      ExpressionAttributeValues: {
        ":username": username,
      },
    };

    const result = await db.query(params);

    if (result.Items.length === 0) {
      return sendError(404, "Invalid username or password");
    }

    const user = result.Items[0];

    // Validerar lösenordet
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return sendError(401, "Invalid username or password");
    }

    // Generera JWT-token och inkludera användarroll
    const token = generateJWT({
      userId: user.userId,
      username: user.username,
      email: user.email,
      role: user.role, // Lägger till roll i JWT
    });

    // Returnera token och användarinformation
    return sendResponse(200, {
      message: "Login successful",
      token,
      user: {
        userId: user.userId,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error logging in:", error);
    return sendError(500, "Error logging in");
  }
}

export const handler = middy(LoginUser)
  .use(jsonBodyParser())
  .use(httpErrorHandler());

//Författare: SANDRA
