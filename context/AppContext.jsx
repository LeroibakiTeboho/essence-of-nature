"use client";

import { productsDummyData } from "@/assets/assets";
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppContextProvider = (props) => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY;
  const router = useRouter();

  const { user } = useUser();
  const { getToken } = useAuth();

  // Products
  const [products, setProducts] = useState([]);

  // User data
  const [userData, setUserData] = useState(false);

  // Seller status comes directly from Clerk
  const isSeller = user?.publicMetadata?.role === "seller";

  // Cart
  const [cartItems, setCartItems] = useState({});

  // ─────────────────────────────────────────────────────────────
  // Fetch product data (also exposed for manual refresh)
  // ─────────────────────────────────────────────────────────────
  const fetchProductData = async () => {
    try {
      const { data } = await axios.get("/api/product/list");
      if (data.success) {
        setProducts(data.products);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  // ─────────────────────────────────────────────────────────────
  // Fetch user data (exposed so components can trigger a refresh,
  // e.g. after checkout)
  // ─────────────────────────────────────────────────────────────
  const fetchUserData = async () => {
    if (!user) return;
    try {
      const token = await getToken();
      const { data } = await axios.get("/api/user/data", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setUserData(data.user);
        setCartItems(data.user.cartItems || {});
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ─────────────────────────────────────────────────────────────
  // Cart actions
  // ─────────────────────────────────────────────────────────────
const addToCart = async (itemId) => {
  // Functional update removes the stale-closure risk
  let nextCart;
  setCartItems((prev) => {
    nextCart = structuredClone(prev);
    nextCart[itemId] = (nextCart[itemId] || 0) + 1;
    return nextCart;
  });

  if (!user) return;

  try {
    const token = await getToken();
    const { data } = await axios.post(
      "/api/cart/update",
      { cartData: nextCart },
      { headers: { Authorization: `Bearer ${token}` } },
    );
    if (!data.success) throw new Error(data.message);
    toast.success("Item added to cart");
  } catch (error) {
    // Roll back optimistic update so UI matches DB
    setCartItems((prev) => {
      const rolledBack = structuredClone(prev);
      if (rolledBack[itemId] > 1) rolledBack[itemId] -= 1;
      else delete rolledBack[itemId];
      return rolledBack;
    });
    toast.error(
      error?.response?.data?.message ||
        error.message ||
        "An error occurred while updating the cart.",
    );
  }
};

const updateCartQuantity = async (itemId, quantity) => {
  let nextCart;
  setCartItems((prev) => {
    nextCart = structuredClone(prev);
    if (quantity <= 0) delete nextCart[itemId];
    else nextCart[itemId] = quantity;
    return nextCart;
  });

  if (!user) return;

  try {
    const token = await getToken();
    const { data } = await axios.post(
      "/api/cart/update",
      { cartData: nextCart },
      { headers: { Authorization: `Bearer ${token}` } },
    );
    if (!data.success) throw new Error(data.message);
  } catch (error) {
    toast.error(
      error?.response?.data?.message ||
        error.message ||
        "An error occurred while updating the cart.",
    );
    // Optional: re-fetch from server to resync
    // await fetchUserData();
  }
};

  const getCartCount = () => {
    let totalCount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalCount += cartItems[item];
      }
    }
    return totalCount;
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      const itemInfo = products.find((product) => product._id === item);
      if (itemInfo && cartItems[item] > 0) {
        totalAmount += itemInfo.offerPrice * cartItems[item];
      }
    }
    return Math.floor(totalAmount * 100) / 100;
  };

  // ─────────────────────────────────────────────────────────────
  // Effect: fetch products on mount
  // (async IIFE keeps setState out of the synchronous effect body)
  // ─────────────────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const { data } = await axios.get("/api/product/list");
        if (cancelled) return;
        if (data.success) {
          setProducts(data.products);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // ─────────────────────────────────────────────────────────────
  // Effect: fetch user data when Clerk user becomes available
  // ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!user) return;

    let cancelled = false;

    (async () => {
      try {
        const token = await getToken();
        const { data } = await axios.get("/api/user/data", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (cancelled) return;

        if (data.success) {
          setUserData(data.user);
          setCartItems(data.user.cartItems || {});
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [user, getToken]);

  const value = {
    user,
    getToken,
    currency,
    router,

    // User
    isSeller,
    userData,
    fetchUserData,

    // Products
    products,
    fetchProductData,

    // Cart
    cartItems,
    setCartItems,
    addToCart,
    updateCartQuantity,
    getCartCount,
    getCartAmount,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
