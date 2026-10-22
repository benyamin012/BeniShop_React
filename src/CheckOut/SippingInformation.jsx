import { useState } from "react";
import { GoShieldCheck } from "react-icons/go";
import { apiFetch } from "../lib/apiFetch.js";
import useAppStore from "../store/useZustand.js";
import LocationPicker from "./LocationPicker.jsx";

const fieldClass =
  "box-border w-full min-w-0 rounded-[10px] border border-gray-200 p-3 text-sm outline-none transition focus:border-blue-500 sm:text-base";

export default function ShippingInf() {
  const cart = useAppStore((state) => state.cart);
  const clearCart = useAppStore((state) => state.clearCart);
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [order, setOrder] = useState(null);

  async function submitOrder(event) {
    event.preventDefault();
    setError("");
    if (!cart.length) {
      setError("Your cart is empty.");
      return;
    }
    if (!coordinates) {
      setError("Please select a delivery location on the map.");
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      fullName: String(formData.get("fullName") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      nationalId: String(formData.get("nationalId") || "").trim(),
      address: address.trim(),
      notes: String(formData.get("notes") || "").trim(),
      latitude: coordinates.lat,
      longitude: coordinates.lng,
      items: cart.map((item) => ({
        productId: Number(item.id),
        quantity: Number(item.quantity),
      })),
    };

    if (!payload.items.every((item) =>
      Number.isSafeInteger(item.productId) && item.productId > 0 &&
      Number.isSafeInteger(item.quantity) && item.quantity > 0
    )) {
      setError("The cart has invalid items. Refresh and try again.");
      return;
    }

    setBusy(true);
    try {
      const response = await apiFetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(result?.error?.message || "Could not place the order.");
      }
      if (!result?.order?.orderNumber) {
        throw new Error("The server response was incomplete. Check the order before retrying.");
      }
      setOrder(result.order);
      clearCart();
      form.reset();
      setAddress("");
      setCoordinates(null);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Network error. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  if (order) {
    return (
      <section className="w-full rounded-2xl bg-white p-6 shadow" aria-live="polite">
        <h2 className="text-xl font-bold text-green-700">Order placed successfully</h2>
        <p className="mt-3 text-sm">Order number: <strong>{order.orderNumber}</strong></p>
        <p className="mt-2 text-sm">Total: {Number(order.totalUsd).toLocaleString("en-US", { style: "currency", currency: "USD" })}</p>
        <p className="mt-2 text-sm text-gray-500">Status: {order.status}</p>
      </section>
    );
  }

  return (
    <div className="w-full min-w-0 rounded-2xl bg-white py-4 shadow-[0_0px_10px_rgba(0,0,0,0.10)] sm:py-6">
      <div className="flex items-center gap-3 px-4 pb-5 sm:px-6">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#005ed9] font-bold text-white">1</span>
        <h2 className="text-lg font-bold sm:text-xl">Shipping Information</h2>
      </div>
      <form className="space-y-5 px-4 sm:px-6" onSubmit={submitOrder}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="fullName" className="text-sm font-semibold">Full Name</label>
            <input id="fullName" name="fullName" autoComplete="name" required maxLength={160} placeholder="Enter your full name" className={fieldClass} />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-semibold">Email Address</label>
            <input id="email" name="email" type="email" autoComplete="email" required maxLength={254} placeholder="Enter your email" className={fieldClass} />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="nationalId" className="text-sm font-semibold">National ID Number</label>
            <input id="nationalId" name="nationalId" maxLength={30} placeholder="Enter National ID Number" className={fieldClass} />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className="text-sm font-semibold">Phone Number</label>
            <input id="phone" name="phone" type="tel" autoComplete="tel" required maxLength={40} placeholder="Enter Phone Number" className={fieldClass} />
          </div>
        </div>

        <LocationPicker value={coordinates} onChange={(next) => { setCoordinates(next); setError(""); }} />

        <div className="flex flex-col gap-2">
          <label htmlFor="address" className="text-sm font-semibold">Delivery Address</label>
          <input id="address" name="address" autoComplete="street-address" required minLength={5} maxLength={1000} value={address} onChange={(event) => setAddress(event.target.value)} placeholder="Street, building, unit..." className={fieldClass} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="notes" className="text-sm font-semibold">Additional Notes</label>
          <textarea id="notes" name="notes" rows={4} maxLength={5000} placeholder="Add any notes about your order..." className={fieldClass + " resize-y"} />
        </div>

        {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}

        <button type="submit" disabled={busy || !cart.length} className="w-full rounded-[10px] bg-[#054eed] px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">
          {busy ? "Placing Order..." : "Place Order"}
        </button>
        {!cart.length && <p className="text-center text-sm text-amber-700">Your cart is empty.</p>}
        <div className="flex items-center justify-center gap-2 text-center text-xs text-gray-500 sm:text-sm">
          <GoShieldCheck color="blue" size={20} />
          <span>Product prices are checked by the server before the order is saved.</span>
        </div>
      </form>
    </div>
  );
}
