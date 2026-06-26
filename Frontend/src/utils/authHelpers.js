import { toast } from "react-toastify";

export const requireAuth = (auth, navigate) => {
  if (auth?.accessToken) return true;
  toast.error("Please login to continue.");
  setTimeout(() => navigate("/login"), 800);
  return false;
};

export const getStock = (stock) => {
  const n = parseInt(stock, 10);
  return Number.isNaN(n) ? 0 : n;
};

export const isOutOfStock = (stock) => getStock(stock) <= 0;
