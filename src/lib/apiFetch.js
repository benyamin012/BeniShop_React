import useAppStore from "../store/useZustand";

export const API_URL = "http://localhost:4000";

export const API_PATHS = {
  login: "/api/auth/login",
  register: "/api/auth/register",
  refresh: "/api/auth/refresh",
  logout: "/api/auth/logout",
  me: "/api/auth/me",
};

let refreshPromise = null;

async function refreshAccessToken() {
  // اگر چند درخواست هم‌زمان 401 بگیرند،
  // فقط یک درخواست refresh ارسال می‌شود.
  if (!refreshPromise) {
    refreshPromise = (async () => {
      const response = await fetch(`${API_URL}${API_PATHS.refresh}`, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        useAppStore.setState({
          user: null,
          accessToken: null,
          authStatus: "unauthenticated",
        });

        localStorage.removeItem("currentUser");
        sessionStorage.removeItem("accessToken");
        throw new Error("Session expired. Please log in again.");
      }

      const result = await response.json();

      if (!result.accessToken || !result.user) {
        throw new Error("Invalid refresh response.");
      }

      localStorage.setItem("currentUser", JSON.stringify(result.user));

      sessionStorage.setItem("accessToken", result.accessToken);

      useAppStore.setState({
        user: result.user,
        accessToken: result.accessToken,
        authStatus: "authenticated",
      });

      return result.accessToken;
    })().finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
}

export async function apiFetch(path, options = {}) {
  const token = useAppStore.getState().accessToken;

  const sendRequest = (accessToken) => {
    const headers = new Headers(options.headers || {});

    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }

    return fetch(`${API_URL}${path}`, {
      ...options,
      headers,
      credentials: "include",
    });
  };

  let response = await sendRequest(token);

  if (response.status === 401 && token) {
    const newToken = await refreshAccessToken();
    response = await sendRequest(newToken);
  }

  return response;
}
