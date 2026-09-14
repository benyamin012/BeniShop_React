import { useContext } from "react";
import { CartContext } from "../context";
import ShippingInf from "./SippingInformation.jsx";
import OrderSummery from "./OrderSummery.jsx";
import useAppStore from "../store/useZustand.js";
function CheckOut() {
  const {
    cart,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useAppStore();

  console.log("cart", cart);

  console.log("user", user);
  console.log("add", addToCart);
  console.log("incers", increaseQuantity);

  return (
    <>
      <div className="container mx-auto px-9">
        <h1 className="text-start items-start mx-auto  font-bold text-[24px] container m-10">
          Checkout Page
        </h1>
        <div className="w-full flex bg-amber-200 gap-2.5 contaner">
          <div className="w-[70%] h-150  bg-[#005ed9] ">
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
