import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function ProductDetailLoading() {
  return (
    <div className="shadow-[0_1px_4px_rgba(0,0,0,0.16)] container mx-auto px-2.5 flex rounded-[10px]">
      <div className="w-110 h-110 m-5 p-5 bg-[#F8F9FA] rounded-[10px]">
        <Skeleton width="100%" height="100%" borderRadius={10} />
      </div>

      <div className="flex flex-col gap-4 p-5 flex-1">
        <Skeleton width="80%" height={32} />

        <div className="flex items-center gap-2">
          <Skeleton width={130} height={28} />
        </div>

        <Skeleton width={120} height={32} />

        <div className="border-t border-gray py-5 mt-5 flex flex-col gap-3">
          <Skeleton width={130} height={25} />

          <Skeleton width="90%" height={18} />

          <Skeleton width="75%" height={18} />
        </div>

        <div className="flex items-center gap-5">
          <Skeleton width={100} height={24} />
          <Skeleton width={140} height={20} />
        </div>
      </div>

      <div className="shadow-[0_1px_4px_rgba(0,0,0,0.16)] p-5 w-[25%] rounded-[10px] flex items-start gap-2.5 m-10">
        <div className="flex flex-col w-full gap-5">
          <Skeleton width={100} height={25} />

          <div className="flex items-center justify-between border border-[#EFF1F6] rounded-[10px] overflow-hidden">
            <Skeleton width={55} height={60} />

            <Skeleton width={30} height={25} />

            <Skeleton width={55} height={60} />
          </div>

          <div className="flex flex-col w-full gap-5 py-3.5">
            <Skeleton width="100%" height={55} borderRadius={10} />

            <Skeleton width="100%" height={55} borderRadius={10} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailLoading;
