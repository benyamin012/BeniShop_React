import { useContext } from "react";
import useAppStore from "../store/useZustand";
import { CartContext } from "../context";

const OrderSummery = () => {
  return (
    <div className="w-full h-full bg-[#e5e8ec]">
      <div className="flex items-center text-center justify-center px-6 gap-2.5">
        <h1 className="text-start items-start mx-auto px-4 font-bold text-[24px] container m-10">
          Order Summery
        </h1>
      </div>
    </div>
  );
};

export default OrderSummery;
