import { create } from "zustand";

import { API_PATHS } from "../lib/apiFetch";

const useAppStore = create((set) => ({
  cart: [],

  user: JSON.parse(localStorage.getItem("currentUser") || "null"),
  accessToken: sessionStorage.getItem("accessToken") || null,

  authStatus: "checking",

  restoreSession: async () => {
    try {
      const response = await fetch(
        `http://localhost:4000${API_PATHS.refresh}`,
        {
          method: "POST",
          credentials: "include",
        },
      );

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem("currentUser");
          sessionStorage.removeItem("accessToken");
          localStorage.removeItem("accessToken");

          set({
            user: null,
            accessToken: null,
            authStatus: "unauthenticated",
          });

          return;
        }

        set({ authStatus: "error" });
        return;
      }

      const result = await response.json();

      console.log(result);

      if (!result.accessToken || !result.user) {
        set({ authStatus: "error" });
        return;
      }

      localStorage.setItem("currentUser", JSON.stringify(result.user));
      sessionStorage.setItem("accessToken", result.accessToken);

      set({
        user: result.user,
        accessToken: result.accessToken,
        authStatus: "authenticated",
      });
    } catch (error) {
      console.error("Session restoration failed:", error);
      set({ authStatus: "error" });
    }
  },

  login: (user, accessToken) => {
    localStorage.setItem("currentUser", JSON.stringify(user));
    sessionStorage.setItem("accessToken", accessToken);

    set({ user, accessToken, authStatus: "authenticated" });
  },

  logout: async () => {
    try {
      await fetch(`http://localhost:4000${API_PATHS.logout}`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout request failed:", error);
    } finally {
      localStorage.removeItem("currentUser");
      sessionStorage.removeItem("accessToken");

      set({ user: null, accessToken: null, authStatus: "unauthenticated" });
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
