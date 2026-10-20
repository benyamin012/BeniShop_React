import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import useAppStore from "../store/useZustand";
import { API_PATHS, API_URL } from "../lib/apiFetch";
export default function Login() {
  const { login } = useAppStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userName: "",
      password: "",
    },
  });
  const navigate = useNavigate();
  const formhandle = async (formData) => {
    try {
      const response = await fetch(`${API_URL}${API_PATHS.login}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username: formData.userName.trim(),
          password: formData.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error.message || result.error || "Login failed.",
        );
      }

      if (!result.accessToken || !result.user) {
        throw new Error("The server response is incomplete.");
      }

      login(result.user, result.accessToken);

      navigate("/");
    } catch (error) {
      alert(error.message || "Could not connect to the server.");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center px-4 py-10">
      <form
        onSubmit={handleSubmit(formhandle)}
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 sm:p-10"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 shadow-lg shadow-blue-600/30">
            <span className="text-2xl text-white font-bold">B</span>
          </div>

          <h1 className="text-3xl font-bold text-slate-800">Welcome Back</h1>

          <p className="mt-2 text-sm text-slate-500">
            Login to your account to continue
          </p>
        </div>

        {/* userName */}
        <div className="mb-5">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            userName
          </label>

          <input
            type="text"
            placeholder="Enter your userName"
            className={`w-full rounded-xl border px-4 py-3 outline-none transition
              ${
                errors.userName
                  ? "border-red-400 focus:ring-2 focus:ring-red-100"
                  : "border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              }
            `}
            {...register("userName", {
              required: "userName is required",
              minLength: {
                message: "userName must be at least 4 characters.",
              },
            })}
          />

          {errors.userName && (
            <p className="mt-2 text-xs text-red-500">
              {errors.userName.message}
            </p>
          )}
        </div>

        {/* password */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            className={`w-full rounded-xl border px-4 py-3 outline-none transition
              ${
                errors.password
                  ? "border-red-400 focus:ring-2 focus:ring-red-100"
                  : "border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              }
            `}
            {...register("password", {
              required: "password is required",
              minLength: {
                value: 8,
                message: "password must be at least 8 characters.",
              },
              pattern: {
                message:
                  "password must contain uppercase, lowercase, number and special character.",
              },
            })}
          />

          {errors.password && (
            <p className="mt-2 text-xs text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full rounded-xl bg-blue-600 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 hover:shadow-blue-600/30 active:scale-[0.98] cursor-pointer"
        >
          Login
        </button>

        {/* Signup */}
        <p className="mt-6 text-center text-sm text-slate-500">
          Don't have an account?{" "}
          <Link
            to="/Signup"
            className="font-semibold text-blue-600 hover:text-blue-700"
          >
            Create an account
          </Link>
        </p>

        {/* Divider */}
        <div className="my-7 flex items-center gap-4">
          <div className="h-px flex-1 bg-slate-200" />

          <span className="text-xs text-slate-400">OR CONTINUE WITH</span>

          <div className="h-px flex-1 bg-slate-200" />
        </div>

        {/* Social Login */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 active:scale-[0.98] cursor-pointer"
          >
            <FcGoogle className="text-xl" />
            Google
          </button>

          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-xl bg-[#1877F2] py-3 text-sm font-medium text-white transition hover:bg-[#166fe5] active:scale-[0.98] cursor-pointer"
          >
            <FaFacebookF />
            Facebook
          </button>
        </div>
      </form>
    </div>
  );
}
