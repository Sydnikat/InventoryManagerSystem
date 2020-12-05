const authServicePort = 9000;
export const authServiceUrl = `http://localhost:${authServicePort}/api/users`;

const imsServicePort = 5080;
const imsServiceBaseUrl = `http://localhost:${imsServicePort}/api`;
export const stockServiceUrl = `${imsServiceBaseUrl}/stock`;
export const supplyServiceUrl = `${imsServiceBaseUrl}/supplies`;
