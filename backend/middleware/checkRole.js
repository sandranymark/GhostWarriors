import jwt from 'jsonwebtoken';

// Middleware som både verifierar JWT och kontrollerar användarroll
export const checkRole = (requiredRoles) => ({
  before: (handler) => {
    // Extrahera token från Authorization-headern
    const token = handler.event.headers?.Authorization?.split(' ')[1];
    
    // Om token saknas, kasta ett fel
    if (!token) {
      throw new Error('Token not provided');
    }

    try {
      // Verifiera token och extrahera användardata
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Kontrollera om användarens roll finns i de tillåtna rollerna
      if (!requiredRoles.includes(decoded.role)) {
        throw new Error('Access denied');
      }

      // Lägg till användardata i eventet för att använda senare
      handler.event.user = decoded;

    } catch (err) {
      // Kasta fel om token inte är giltig eller om det uppstår något annat fel
      throw new Error('Invalid or expired token');
    }
  }
});
