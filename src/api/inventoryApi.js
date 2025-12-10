import api from './api';

const BASE_URL = '/inventory'; 

export const adjustStock = async (productId, delta) => {
  try {
    const response = await api.post(`${BASE_URL}/stock/adjust`, {
      productId,
      delta, 
    });
    return response.data;
  } catch (error) {
    console.error("Error adjusting stock:", error);
    throw error; 
  }
};
