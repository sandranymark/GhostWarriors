import jwt from "jsonwebtoken";
import "dotenv/config";
import { sendError } from "../responses/responses.js";

// Middleware som både verifierar JWT och kontrollerar användarroll
export const checkRole = (requiredRoles) => ({
  before: (handler) => {
    // Extrahera token från Authorization-headern
    const token =
      handler.event.headers.authorization &&
      handler.event.headers.authorization.split(" ")[1];
    console.log("validate", token);

    if (!token) {
      console.log("Token not provided");
      return sendError(401, "Token not provided");
    }

    try {
      // Verifiera token och extrahera användardata
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("decoded", decoded);

      // Kontrollera om användarens roll finns i de tillåtna rollerna
      if (!requiredRoles.includes(decoded.role)) {
        console.log(`Unauthorized access attempt by role: ${decoded.role}`);
        return sendError(403, "Access denied"); // Returnera ett felmeddelande om användarens roll inte är tillåten
      }

      // Lägg till användardata i eventet för att kunna användas i efterföljande funktioner
      handler.event.user = decoded;
    } catch (err) {
      console.error("Invalid or expired token:", err.message);
      return sendError(401, "Invalid or expired token"); // Returnera ett felmeddelande vid valideringsfel
    }
  },
});
