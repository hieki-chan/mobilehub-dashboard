import api from "./api";

const BASE_URL = "/admin/orders";

export const fetchAdminOrdersPaged = async ({
  page,
  size,
  orderStatus,
  paymentMethod,
  shippingMethod
}) => {
  const res = await api.get(`${BASE_URL}`, {
    params: {
      page,
      size,
      orderStatus: orderStatus === "ALL" ? undefined : orderStatus,
      paymentMethod: paymentMethod === "ALL" ? undefined : paymentMethod,
      shippingMethod: shippingMethod === "ALL" ? undefined : shippingMethod,
    }
  });

  return res.data;
};


export const confirmOrder = async (orderId) => {
  const res = await api.post(`${BASE_URL}/${orderId}/confirm`);
  return res.data;
};

export const setOrderDelivered = async (orderId) => {
  const res = await api.post(`${BASE_URL}/${orderId}/delivered`);
  return res.data;
};

export const setOrderFailed= async (orderId) => {
  const res = await api.post(`${BASE_URL}/${orderId}/failed`);
  return res.data;
};

export const fetchMonthlySales = async () => {
  try {
    const res = await api.get(`${BASE_URL}/sales/monthly`);
    console.log(res.data);
    return res.data; 
  } catch (error) {
    console.error("Error fetching monthly sales data", error);
    throw error;
  }
};

export const fetchMonthlyOrderCount = async () => {
  try {
    const res = await api.get(`${BASE_URL}/monthly`); 
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("Error fetching monthly order count data", error);
    throw error;
  }
};

export const fetchOrderStatusStats = async () => {
  try {
    const res = await api.get(`/admin/orders/status`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("Error fetching order status stats", error);
    throw error;
  }
};

export const fetchBestSellers = async () => {
  const res = await api.get(`/admin/orders/products/best-sellers`);
  return res.data;
};

export const fetchTotalSoldQuantity = async () => {
  const res = await api.get("/admin/orders/products/total-sold");
  return res.data;
};

