import { create } from "zustand";

const useAppStore = create((set) => ({
  cart: [],

  user: JSON.parse(localStorage.getItem("currentUser") || "null"),
  accessToken: sessionStorage.getItem("accessToken") || null,

  login: (user, accessToken) => {
    localStorage.setItem("currentUser", JSON.stringify(user));
    sessionStorage.setItem("accessToken", accessToken);

    set({ user, accessToken });
  },

  logout: async () => {
    try {
      await fetch("http://localhost:4000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout request failed:", error);
    } finally {
      localStorage.removeItem("currentUser");
      sessionStorage.removeItem("accessToken");

      set({ user: null, accessToken: null });
    }
  },

  addToCart: (product) => {
    set((state) => {
      const existingProduct = state.cart.find((item) => item.id === product.id);

      if (existingProduct) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item,
          ),
        };
      }

      return {
        cart: [
          ...state.cart,
          {
            ...product,
            quantity: 1,
          },
        ],
      };
    });
  },

  increaseQuantity: (id) => {
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      ),
    }));
  },

  decreaseQuantity: (id) => {
    set((state) => {
      const product = state.cart.find((item) => item.id === id);

      if (!product) {
        return {};
      }

      if (product.quantity === 1) {
        return {
          cart: state.cart.filter((item) => item.id !== id),
        };
      }

      return {
        cart: state.cart.map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        ),
      };
    });
  },

  removeFromCart: (id) => {
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    }));
  },
}));

export default useAppStore;
