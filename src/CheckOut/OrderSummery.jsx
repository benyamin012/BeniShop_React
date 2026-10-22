import useAppStore from "../store/useZustand";

const OrderSummery = () => {
  const { cart } = useAppStore();

  const Tax = 7.35;

  const getUsdPrice = (item) => Number(item.priceUsd ?? item.price ?? 0);

  const total = cart.reduce((sum, item) => {
    return sum + getUsdPrice(item) * item.quantity;
  }, 0);

  const formatUSD = (amount) =>
    amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <div className="w-full min-w-0 rounded-2xl bg-white py-4 shadow-[0_0px_10px_rgba(0,0,0,0.10)] sm:py-6">
      <h1 className="px-4 text-lg font-bold sm:px-6 sm:text-xl">
        Order Summary
      </h1>

      <div className="px-4 py-3 sm:px-6">
        <div className="flex max-h-80 flex-col gap-3 overflow-y-auto [&::-webkit-scrollbar]:hidden sm:max-h-80">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex w-full min-w-0 items-start gap-3 py-2"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-16 w-16 shrink-0 rounded-lg bg-gray-100 p-2 object-contain sm:h-20 sm:w-20"
              />

              <div className="min-w-0 flex-1">
                <h4 className="line-clamp-2 wrap-break-words text-sm font-semibold sm:text-base">
                  {item.title}
                </h4>

                <span className="mt-1 block truncate text-xs text-gray-400 sm:text-sm">
                  {item.category}
                </span>

                <div className="mt-2 flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                  <span className="text-sm font-semibold">
                    ${formatUSD(getUsdPrice(item))}
                  </span>

                  <span className="text-xs text-gray-500 sm:text-sm">
                    Qty: {item.quantity}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {cart.length === 0 && (
          <p className="py-5 text-center text-sm text-gray-500">
            Your cart is empty.
          </p>
        )}

        <span className="mt-4 block h-px w-full bg-gray-200" />
      </div>

      <div className="flex flex-col gap-4 px-4 pt-2 sm:gap-5 sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm font-semibold sm:text-base">Subtotal</span>
          <span className="break-all text-right text-sm sm:text-base">
            ${formatUSD(total)}
          </span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <span className="text-sm font-semibold sm:text-base">Shipping</span>
          <span className="text-sm font-medium text-[#25b375] sm:text-base">
            Free
          </span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <span className="text-sm font-semibold sm:text-base">Tax</span>
          <span className="text-sm sm:text-base">${formatUSD(Tax)}</span>
        </div>

        <span className="block h-px w-full bg-gray-200" />

        <div className="flex items-center justify-between gap-3">
          <span className="text-base font-bold sm:text-lg">Total</span>

          <span className="break-all text-right text-xl font-bold text-[#0746f2] sm:text-2xl">
            ${formatUSD(total + Tax)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummery;
