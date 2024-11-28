import middy from '@middy/core';
import { sendResponse, sendError } from '../../responses/responses.js';
import { checkRole } from '../../middleware/checkRole.js';

const protectedEndpoint = async (event) => {
  try {
    // Användarens data finns eventet från checkRole middleware
    const user = event.user;
    console.log('Authenticated user:', user);

    // Exempel på användardata
    return sendResponse(200, { message: 'Access granted', user });
  } catch (error) {
    return sendError(401, error.message);
  }
};

// Använd checkRole middleware för att kontrollera roller innan vi exekverar endpointen
export const handler = middy(protectedEndpoint)
  .use(checkRole(['admin', 'user'])); // Exempel på roller som tillåts