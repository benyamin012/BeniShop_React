import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingFunction = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {Array(20)
        .fill(null)
        .map((_, index) => (
          <div
            key={index}
            className="flex flex-col rounded-[15px] overflow-hidden border border-[#EFF1F6]"
          >
            {/* Image */}
            <Skeleton height={230} width="100%" className="rounded-none" />

            {/* اطلاعات محصول */}
            <div className="flex flex-col gap-3 p-3">
              {/* ستاره + قیمت */}
              <div className="flex justify-between items-center">
                <Skeleton width={100} height={18} />
                <Skeleton width={60} height={22} />
              </div>

              {/* title */}
              <Skeleton width="90%" height={20} />
              <Skeleton width="65%" height={20} />

              {/* مشخصات */}
              <Skeleton width="100%" height={18} />

              {/* Add to cart */}
              <Skeleton width="100%" height={45} className="rounded-b-[7px]" />
            </div>
          </div>
        ))}
    </div>
  );
};

export default LoadingFunction;
