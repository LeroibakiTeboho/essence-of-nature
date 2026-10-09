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
  const [products, setProducts] = useState(productsDummyData);

  // User data
  const [userData, setUserData] = useState(false);

  // Seller status comes directly from Clerk
  const isSeller = user?.publicMetadata?.role === "seller";

  // Cart
  const [cartItems, setCartItems] = useState({});

  // Fetch product data from the database or API
  const fetchProductData = async () => {
    try {
      // Later, fetch products from your API/database here
      setProducts(productsDummyData);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  // Fetch user data from the database or API
  const fetchUserData = async () => {
    try {
      if (!user) return;

      const token = await getToken();
      const { data } = await axios.get("/api/user/data", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setUserData(data.user);
        setCartItems(data.user, cartItems);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Add product to cart
  const addToCart = async (itemId) => {
    const cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }

    setCartItems(cartData);
  };

  // Update cart quantity
  const updateCartQuantity = async (itemId, quantity) => {
    const cartData = structuredClone(cartItems);

    if (quantity === 0) {
      delete cartData[itemId];
    } else {
      cartData[itemId] = quantity;
    }

    setCartItems(cartData);
  };

  // Get total number of items in cart
  const getCartCount = () => {
    let totalCount = 0;

    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalCount += cartItems[item];
      }
    }

    return totalCount;
  };

  // Get total cart amount
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

  // Fetch user data when Clerk user becomes available
  useEffect(() => {
    if (user) {
      // fetchUserData(); this will be fixed soon!
    }
  }, [user]);

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
