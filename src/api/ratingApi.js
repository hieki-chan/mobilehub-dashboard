import api from "./api";

const ADMIN_BASE_URL = "/admin/ratings";

export const getUserId = () =>
  JSON.parse(localStorage.getItem("user") || "{}").id

export const getRatings = async ({
  page = 0,
  size = 10,
  sortBy = "newest",
  stars = "ALL",
  replyStatus = "ALL",
  searchBy = "product",
  searchQuery = "",
  productId = null
}) => {
  const res = await api.get(`${ADMIN_BASE_URL}`, {
    params: {
      page,
      size,
      sortBy,
      stars,
      replyStatus,
      searchBy,
      searchQuery,
      ...(productId != null && { productId })
    },
  });
  console.log(res.data);
  return res.data;
};

export const replyRating = async (ratingId, content) => {
  const adminId = getUserId();

  const body = {
    content,
    adminId
  };

  const res = await api.post(`${ADMIN_BASE_URL}/${ratingId}/reply`, body);
  return res.data;
};

export const updateRating = async (ratingId, content) => {
  const adminId = getUserId();

  const body = {
    content,
    adminId
  };

  const res = await api.put(`${ADMIN_BASE_URL}/${ratingId}/reply`, body);
  console.log("updated");
  return res.data;
};

export const deleteRatingReply = async (ratingId) => {
  const res = await api.delete(`${ADMIN_BASE_URL}/${ratingId}/reply`);
  return res.data;
};
