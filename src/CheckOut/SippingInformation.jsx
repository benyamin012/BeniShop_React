import { useState } from "react";
import { GoShieldCheck } from "react-icons/go";
import LocationPicker from "./LocationPicker.jsx";

const inputClassName =
  "box-border w-full min-w-0 rounded-[10px] border border-gray-200 p-3 text-sm outline-none transition focus:border-blue-500 sm:text-base";

const ShippingInf = () => {
  const [address, setAddress] = useState("");
  const [selectedCoordinates, setSelectedCoordinates] = useState(null);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitMessage("");

    if (
      !selectedCoordinates ||
      !Number.isFinite(selectedCoordinates.lat) ||
      !Number.isFinite(selectedCoordinates.lng)
    ) {
      setSubmitMessage("Please choose your delivery location on the map.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    const checkoutDetails = {
      fullName: String(formData.get("fullName") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      nationalId: String(formData.get("nationalId") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      address: address.trim(),
      notes: String(formData.get("notes") || "").trim(),
      latitude: selectedCoordinates.lat,
      longitude: selectedCoordinates.lng,
    };

    // The repository currently has no order-creation endpoint. Keep the
    // validated payload available for connecting to that endpoint later.
    console.info("Validated checkout details (not saved to a server):", checkoutDetails);
    setSubmitMessage(
      "Delivery details validated. Your order has not been saved because the order API is not connected yet.",
    );
  };

  return (
    <div className="w-full min-w-0 rounded-2xl bg-white py-4 shadow-[0_0px_10px_rgba(0,0,0,0.10)] sm:py-6">
      <div className="flex items-center gap-3 px-4 pb-5 sm:gap-4 sm:px-6">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#005ed9] text-base font-bold text-white">
          1
        </span>
        <h1 className="min-w-0 text-lg font-bold sm:text-xl">
          Shipping Information
        </h1>
      </div>

      <form
        className="space-y-5 px-4 sm:px-6"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
          <div className="flex min-w-0 flex-col">
            <label htmlFor="fullName" className="mb-2 text-sm font-semibold sm:text-base">
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              name="fullName"
              autoComplete="name"
              placeholder="Enter your full name"
              className={inputClassName}
              required
            />
          </div>

          <div className="flex min-w-0 flex-col">
            <label htmlFor="email" className="mb-2 text-sm font-semibold sm:text-base">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              autoComplete="email"
              placeholder="Enter your email"
              className={inputClassName}
              required
            />
          </div>

          <div className="flex min-w-0 flex-col">
            <label htmlFor="nationalId" className="mb-2 text-sm font-semibold sm:text-base">
              National ID Number
            </label>
            <input
              id="nationalId"
              type="text"
              name="nationalId"
              placeholder="Enter National ID Number"
              className={inputClassName}
            />
          </div>

          <div className="flex min-w-0 flex-col">
            <label htmlFor="phone" className="mb-2 text-sm font-semibold sm:text-base">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              name="phone"
              autoComplete="tel"
              placeholder="Enter Phone Number"
              className={inputClassName}
              required
            />
          </div>
        </div>

        <LocationPicker
          value={selectedCoordinates}
          onChange={(coordinates) => {
            setSelectedCoordinates(coordinates);
            setSubmitMessage("");
          }}
        />

        <div className="flex min-w-0 flex-col">
          <label htmlFor="address" className="mb-2 text-sm font-semibold sm:text-base">
            Delivery Address
          </label>
          <input
            id="address"
            type="text"
            name="address"
            autoComplete="street-address"
            placeholder="Enter your full delivery address"
            value={address}
            onChange={(event) => {
              setAddress(event.target.value);
              setSubmitMessage("");
            }}
            className={inputClassName}
            required
          />
          <p className="mt-1 text-xs text-gray-500">
            Enter the street address and building details. The map coordinates
            are stored separately.
          </p>
        </div>

        <div className="flex min-w-0 flex-col">
          <label htmlFor="notes" className="mb-2 text-sm font-semibold sm:text-base">
            Additional Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={4}
            placeholder="Add any notes about your order..."
            className={inputClassName + " resize-y"}
          />
        </div>

        {submitMessage && (
          <p
            role="status"
            className="rounded-lg bg-amber-50 p-3 text-sm text-amber-800"
          >
            {submitMessage}
          </p>
        )}

        <div className="space-y-4">
          <button
            type="submit"
            className="w-full rounded-[10px] bg-[#054eed] px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:text-base"
          >
            Validate Delivery Details
          </button>

          <div className="flex items-start justify-center gap-2 text-center text-xs text-gray-500 sm:items-center sm:text-sm">
            <GoShieldCheck color="blue" size={20} className="shrink-0" />
            <span>
              Your delivery address and map coordinates will be ready to send
              when order creation is connected.
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ShippingInf;
