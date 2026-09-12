import React from "react";
import { FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

function BanerOfBody() {
  return (
    <div className="relative ">
      <div className="container mx-auto px-9 max-lg:px-0 max-sm:px-2.5 w-full relative ">
        <img
          src="/img/ChatGPT Image Aug 3, 2026, 01_47_50 PM.png"
          className="rounded-[20px] w-full max-sm:hidden "
        />
        <img
          src="/img/8420e57c-839c-409d-b9a9-58cdfb4bb11f.png"
          className="rounded-[20px] w-full hidden max-sm:block"
        />

        <div className="flex flex-col  left-20 z-2 items-start max-lg:left-15 max-sm:left-10 max-md:gap-1 gap-4.5 max-xl:gap-3 max-lg:gap-1 top-2.5 max-sm:top-10 bottom-0 absolute">
          <span className="text-[#65CEFA] font-medium text-[26px] max-2xl:text-[20px] max-xl:text-[18px] max-md:text-[10px]  max-lg:text-[14px] max-lg:mt-5 max-sm:text-[12px]">
            Big Sale Up To 40% Off
          </span>

          <p className="font-black text-white text-[56px] max-2xl:text-[35px] max-xl:text-[26px] max-lg:text-[20px] max-md:text-[16px] max-sm:text-[35px]">
            Find Amazing <br />
            Products
          </p>

          <p className="text-[#65CEFA] text-[20px] font-normal pb-6 max-2xl:text-[18px] max-2xl:pb-4 max-xl:text-[16px] max-xl:pb-2.5 max-lg:text-[14px] max-lg:p-1 max-lg:pb-2.5 max-md:text-[10px] max-sm:text-[10px]">
            Discover the best products with <br />
            best prices, quality, trust and speed.
          </p>

          <div className="flex gap-2 cursor-pointer bg-white p-2.5 rounded-[10px] items-center text-center justify-center max-xl:p-1 max-sm:p-2 ">
            <Link to={`/not-found`}>
              <button className="font-medium cursor-pointer text-[#1850E3] text-[20px] px-2.5 max-xl:text-[16px] max-xl:px-1 max-md:text-[12px] max-sm:text-[12px] max-sm:px-2.5">
                Shop Now
              </button>
            </Link>
            <FaAngleRight
              className="cursor-pointer text-2xl max-md:text-[18px]"
              color="#1850E3"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BanerOfBody;
