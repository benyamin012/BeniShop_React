import { GoShieldCheck } from "react-icons/go";

const ShippingInf = () => {
  return (
    <div className="w-full min-w-0 rounded-2xl bg-white py-4 shadow-[0_0px_10px_rgba(0,0,0,0.10)] sm:py-6">
      {/* Heading */}
      <div className="flex items-center gap-3 px-4 pb-5 sm:gap-4 sm:px-6">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#005ed9] text-base font-bold text-white">
          1
        </span>

        <h1 className="min-w-0 text-lg font-bold sm:text-xl">
          Shipping Information
        </h1>
      </div>

      <form className="space-y-5 px-4 sm:px-6">
        {/* Personal Information */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
          <div className="flex min-w-0 flex-col">
            <label className="mb-2 text-sm font-semibold sm:text-base">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              autoComplete="name"
              placeholder="Enter your full name"
              className="box-border w-full min-w-0 rounded-[10px] border border-gray-200 p-3 text-sm outline-none transition focus:border-blue-500 sm:text-base"
            />
          </div>

          <div className="flex min-w-0 flex-col">
            <label className="mb-2 text-sm font-semibold sm:text-base">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              autoComplete="email"
              placeholder="Enter your email"
              className="box-border w-full min-w-0 rounded-[10px] border border-gray-200 p-3 text-sm outline-none transition focus:border-blue-500 sm:text-base"
            />
          </div>

          <div className="flex min-w-0 flex-col">
            <label className="mb-2 text-sm font-semibold sm:text-base">
              National ID Number
            </label>
            <input
              type="text"
              name="nationalId"
              placeholder="Enter National ID Number"
              className="box-border w-full min-w-0 rounded-[10px] border border-gray-200 p-3 text-sm outline-none transition focus:border-blue-500 sm:text-base"
            />
          </div>

          <div className="flex min-w-0 flex-col">
            <label className="mb-2 text-sm font-semibold sm:text-base">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              autoComplete="tel"
              placeholder="Enter Phone Number"
              className="box-border w-full min-w-0 rounded-[10px] border border-gray-200 p-3 text-sm outline-none transition focus:border-blue-500 sm:text-base"
            />
          </div>
        </div>

        {/* Address */}
        <div className="flex min-w-0 flex-col">
          <label className="mb-2 text-sm font-semibold sm:text-base">
            Address
          </label>
          <input
            type="text"
            name="address"
            autoComplete="street-address"
            placeholder="Enter Your Address"
            className="box-border w-full min-w-0 rounded-[10px] border border-gray-200 p-3 text-sm outline-none transition focus:border-blue-500 sm:text-base"
          />
        </div>

        {/* Additional Notes */}
        <div className="flex min-w-0 flex-col">
          <label className="mb-2 text-sm font-semibold sm:text-base">
            Additional Notes
          </label>
          <textarea
            name="notes"
            rows={4}
            placeholder="Add any notes about your order..."
            className="box-border w-full min-w-0 resize-y rounded-[10px] border border-gray-200 p-3 text-sm outline-none transition focus:border-blue-500 sm:text-base"
          />
        </div>

        {/* Submit */}
        <div className="space-y-4">
          <button
            type="submit"
            className="w-full rounded-[10px] bg-[#054eed] px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:text-base"
          >
            Place Order
          </button>

          <div className="flex items-start justify-center gap-2 text-center text-xs text-gray-500 sm:items-center sm:text-sm">
            <GoShieldCheck color="blue" size={20} className="shrink-0" />
            <span>Your payment information is secure and safe.</span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ShippingInf;
