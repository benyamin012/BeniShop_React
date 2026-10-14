import React from "react";
import ShippingInf from "./SippingInformation.jsx";
import OrderSummery from "./OrderSummery.jsx";
function CheckOut() {
  return (
    <>
      <div className="container mx-auto px-9">
        <h1 className="text-start items-start mx-auto  font-bold text-[24px] container m-10">
          Checkout Page
        </h1>
        <div className="w-full flex gap-2.5 contaner">
          <div className="w-[70%] h-150  ">
            <ShippingInf />
          </div>
          <div className="w-[30%] h-150 ">
            <OrderSummery />
          </div>
        </div>
      </div>
    </>
  );
}

export default CheckOut;
