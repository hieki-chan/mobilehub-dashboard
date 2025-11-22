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