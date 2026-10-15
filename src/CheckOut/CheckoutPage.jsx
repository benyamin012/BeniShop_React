import ShippingInf from "./SippingInformation.jsx";
import OrderSummery from "./OrderSummery.jsx";

function CheckOut() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <h1 className="mb-6 text-2xl font-bold sm:mb-8 sm:text-3xl">
        Checkout Page
      </h1>

      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[minmax(0,1.7fr)_minmax(280px,1fr)] lg:gap-6">
        <section className="w-full min-w-0">
          <ShippingInf />
        </section>

        <aside className="w-full min-w-0">
          <OrderSummery />
        </aside>
      </div>
    </main>
  );
}

export default CheckOut;
