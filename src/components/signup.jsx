import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();
  const formhandle = async (data) => {
    console.log(data);

    const response = await fetch("http://localhost:3000/User", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    });
    if (data.password === data.confirmPassword) {
      if (response.ok) {
        alert("Signin sucss");

        // navigate("/Login");
      }
    } else {
      alert("password not like confirmPassword");
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

          <h1 className="text-3xl font-bold text-slate-800">
            Create an account
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            To get started, enter your information.
          </p>
        </div>

        {/* userName */}
        <div className="mb-5">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            userName
          </label>

          <input
            type="text"
            placeholder="Like, Benyamin"
            className={`w-full rounded-xl border px-4 py-3 outline-none transition
              ${
                errors.userName
                  ? "border-red-400 focus:ring-2 focus:ring-red-100"
                  : "border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              }
            `}
            {...register("userName", {
              required: "لطفا نام کاربری را وارد کنید",
            })}
          />

          {errors.userName && (
            <p className="mt-2 text-xs text-red-500">
              {errors.userName.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="mb-5">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password."
            className={`w-full rounded-xl border px-4 py-3 outline-none transition
              ${
                errors.password
                  ? "border-red-400 focus:ring-2 focus:ring-red-100"
                  : "border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              }
            `}
            {...register("password", {
              required: "لطفا رمز عبور را وارد کنید",
            })}
          />

          {errors.password && (
            <p className="mt-2 text-xs text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Confirm password
          </label>

          <input
            type="password"
            placeholder="Re-enter the password"
            className={`w-full rounded-xl border px-4 py-3 outline-none transition
              ${
                errors.confirmPassword
                  ? "border-red-400 focus:ring-2 focus:ring-red-100"
                  : "border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              }
            `}
            {...register("confirmPassword", {
              required: "لطفا تکرار رمز عبور را وارد کنید",
            })}
          />

          {errors.confirmPassword && (
            <p className="mt-2 text-xs text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl bg-blue-600 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 hover:shadow-blue-600/30 active:scale-[0.98] cursor-pointer"
        >
          {isSubmitting ? "Creating account..." : "Create an account"}
        </button>

        {/* Login */}
        <p className="mt-6 text-center text-sm text-slate-500">
          Do you already have an account?{" "}
          <Link
            to={"/Login"}
            className="font-semibold text-blue-600 hover:text-blue-700"
          >
            Log in
          </Link>
        </p>

        {/* Divider */}
        <div className="my-7 flex items-center gap-4">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="text-xs text-slate-400">or continue with</span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 cursor-pointer"
          >
            <FcGoogle className="text-xl" />
            Google
          </button>

          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-xl bg-[#1877F2] py-3 text-sm font-medium text-white transition hover:bg-[#166fe5] cursor-pointer"
          >
            <FaFacebookF />
            Facebook
          </button>
        </div>
      </form>
    </div>
  );
}
