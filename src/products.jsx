import React, { Component } from "react";
import { useState } from "react";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa6";
import { data, Link } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { useContext } from "react";
import { CartContext } from "./context";
import useAppStore from "./store/useZustand";

function Product({ data }) {
  const { item, toAdd, plus, minus } = useContext(CartContext);

  const [productQuantity, setProductQuantity] = useState([]);
  const [them, setThem] = useState("");

  const {
    cart,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useAppStore();

  const handleToggleCart = () => {
    const isInCart = cart.some((cartItem) => cartItem.id === item.id);

    if (isInCart) {
      removeFromCart(item.id);
      setThem("");
    } else {
      addToCart(item);

      setThem("bg-green text-[#114EF7]");
    }
  };

  // const counterHandlerPlus = () => {
  //   plus(item);
  // };

  // const counterHandlerMinus = () => {
  //   minus(item);
  // };

  return (
    <>
      <div className=" bg-[#ffffff]  h-90 max-lg:h-70 w-full rounded-xl shadow-[0_1px_4px_rgba(0,0,0,0.16)]   flex flex-col justify-between   ">
        <div className="flex justify-center items-center  flex-col  ">
          <Link to={`/product/${item.id}`}>
            <img
              src={item.image}
              className="w-40 h-40 mb-5 max-lg:w-30 max-lg:h-30   max-sm:w-30  max-sm:20  cursor-pointer  items-center flex  rounded-[10px]"
            />
          </Link>

          <div className=" flex   pb-2 pt-2 px-3.5 justify-between border-t  border-[#EFF1F6]  w-full">
            <div className="flex flex-col w-full justify-between">
              <div className="flex  gap-2.5 justify-between ">
                <div className="flex flex-3 items-center justify-start gap-1.5  max-lg:flex-wrap text-center ">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <FaStar
                      key={index}
                      className={
                        index + 1 <= item.rating.rate
                          ? "text-yellow-400 max-lg:text-[10px]  max-xl:text-[14px] max-md:text-[12px]"
                          : "text-gray-300  max-lg:text-[10px]  max-xl:text-[14px] max-md:text-[12px]"
                      }
                    />
                  ))}
                  <span className="text-gray text-[14px] flex justify-end max-sm:text-[12px] font-extralight ">
                    ({item.rating.rate})
                  </span>
                </div>
                <h1 className=" font-bold text-[16px] py-1.5 max-lg:text-[14px] text-[#114EF7]">
                  {Number(item.priceIrr ?? item.price).toLocaleString("fa-IR")} تومان
                </h1>
              </div>

              <h1 className=" font-bold ]max-sm:text-[14px] text-[16px] max-lg:text-[12px]  max-[500px]:text-[10px]! text-black  w-full  py-0.5 line-clamp-2 ">
                {item.title}
              </h1>

              <span className="text-gray-600 font-medium text-[14px] ">
                {[
                  item.ram,

                  item["CPU"],

                  item.Hz,

                  item["USB port"],
                  item.size,
                  item.brand,
                  item.Capacity,

                  item.hard,
                  item.color,
                ]
                  .filter(Boolean)
                  .join(" - ")}
              </span>
            </div>
          </div>
        </div>

        <div className=" gap-10 items-center text-center flex justify-between   border-t  border-[#EFF1F6]   w-full rounded-t-[10px]">
          <button
            className={
              them === "bg-green text-[#114EF7]"
                ? "bg-[#ffffff4e]  cursor-pointer border border-[blue] p-1.5 duration-100 delay-100 rounded-b-[7px] text-[#0084ff] text-[14px] gap-2.5 w-full items-center text-center flex justify-center  "
                : " cursor-pointer bg-[#0257EF] p-1.5 rounded-b-[7px] text-[#CEE7FE] text-[14px] gap-2.5 w-full items-center text-center flex justify-center  "
            }
            onClick={handleToggleCart}
          >
            {them === "bg-green text-[#114EF7]" ? (
              <FiMinus size={20} className="duration-200 delay-200" />
            ) : (
              <IoCartOutline size={25} className="duration-200 delay-200" />
            )}
            {them === "bg-green text-[#114EF7]" ? "Remove" : " Add To Cart"}
          </button>
        </div>
      </div>
    </>
  );
}
export default Product;

// import { useMutation, useQuery } from "@tanstack/react-query";
// import { useNavigate, useParams } from "react-router-dom";
// import { getCompanyDetails, postCompanyDetails } from "./requests";
// import { ChangeEvent, useEffect, useState } from "react";
// import Input from "../../../components/inputs/Input";
// import { useClickOutside } from "../../../hooks/useClickOutside";
// import ProfileSelectorInput from "../../../components/profileSelector/ProfileSelectorInput";
// import MainButton from "../../../components/buttons/MainButton";
// import { useForm } from "react-hook-form";
// import SelectLocation from "../../../components/map/SelectLocation";
// import PhoneInput from "../../../components/inputs/PhoneInput";
// import { Company } from "./types";
// import SwitchButton from "../../../components/inputs/SwitchButton";
// import useBreadcrumbStore from "../../../store/breadcrumb/profile/breadcrumbStore";
// import BackButton from "../../../components/buttons/BackButton";
// import LoaderScreen from "../../../components/loaders/LoaderScreen";
// import InfoAlert from "../../../components/alert/InfoAlert";
// import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
// import Textarea from "../../../components/inputs/Textarea";
// import { enterJustNumber } from "../../../utils/helper";
// import { BiErrorCircle } from "react-icons/bi";
// import Modal from "../../../components/modals/Modal";

// const CompanyInfo = () => {
//   const {
//     register,
//     setValue,
//     watch,
//     reset,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   const { setSubBreadcrumb } = useBreadcrumbStore();
//   const navigate = useNavigate();
//   const [isShow, setIsShow] = useState(false);
//   const [isGridGuidShow, setIsGridGuidShow] = useState(false);
//   const [selectedLevel, setSelectedLevel] = useState("سطح 5");
//   const [tempSelectedLevel, setTempSelectedLevel] = useState("سطح 5");
//   const [isGridGuidSelect, setIsGridGuidSelect] = useState(false);
//   const [companyPhoneNumberError, setCompanyPhoneNumberError] = useState("");
//   const { companyId } = useParams();
//   const { data: companyData, isLoading } = useQuery({
//     queryKey: ["company_data"],
//     queryFn: () => getCompanyDetails(companyId, setSubBreadcrumb),
//   });

//   const companyLevels = [
//     {
//       id: "سطح 5",
//       title: "VIP",
//       score: "90-100",
//       color: "#248a2f",
//       backgroundColor: "#f3fbee",
//       borderColor: "#248a2f",
//     },
//     {
//       id: "سطح 4",
//       title: "ممتاز",
//       score: "80-89",
//       color: "#84a759",
//       backgroundColor: "#f9fcfe",
//       borderColor: "#84a759",
//     },
//     {
//       id: "سطح 3",
//       title: "حرفه‌ای",
//       score: "70-79",
//       color: "#e2b051",
//       backgroundColor: "#fffcf3",
//       borderColor: "#e2b051",
//     },
//     {
//       id: "سطح 2",
//       title: "فعال",
//       score: "60-69",
//       color: "#f2883f",
//       backgroundColor: "#fcf8f5",
//       borderColor: "#f2883f",
//     },
//     {
//       id: "سطح 1",
//       title: "تازه وارد",
//       score: "0-59",
//       color: "#ab1e35",
//       backgroundColor: "#fbf6f4",
//       borderColor: "#ab1e35",
//     },
//   ];

//   const selectedLevelData = companyLevels.find((level) => {
//     // level.id === selectedLevel;
//     console.log(level.id);
//     const [min, max] = level.score.split("-");

//     console.log(Number(max), Number(min));

//     return (
//       companyData?.companyScore >= Number(min) &&
//       companyData?.companyScore <= Number(max)
//     );
//   });

//   useEffect(() => {
//     if (selectedLevelData) {
//       setSelectedLevel(selectedLevelData.id);
//     }
//   }, [selectedLevelData]);

//   console.log("selectedLevelData", selectedLevel);

//   const { mutate: handleSubmitMutation, isPending } = useMutation({
//     mutationFn: ({
//       companyId,
//       data,
//     }: {
//       companyId: string | undefined;
//       data: Company;
//     }) => postCompanyDetails(companyId, data, navigate),
//   });

//   const handleSubmitForm = () => {
//     const formData = {
//       companyName: watch("companyName"),
//       nationalCode: watch("nationalCode"),
//       companyPhoneNumber: watch("companyPhoneNumber"),
//       economicCode: watch("economicCode"),
//       address: watch("address"),
//       avatar: watch("avatar"),
//       coordinate: watch("coordinate"),
//       userName: watch("userName"),
//       firstName: watch("firstName"),
//       lastName: watch("lastName"),
//       email: watch("email"),
//       isActive: watch("isActive") || false,
//       userPhoneNumber: watch("userPhoneNumber"),
//       userId: watch("userId"),
//       monthlySalaryMessage: watch("monthlySalaryMessage"),
//       password: watch("password"),
//       isDailyService: watch("isDailyService"),
//       isNightShift: watch("isNightShift"),
//       isColorBadge: watch("isColorBadge"),
//       isCloseService: watch("isCloseService"),
//     };

//     // Validate phone numbers
//     const isValidPhoneNumbers = formData?.companyPhoneNumber?.every(
//       (phoneObj: any) => {
//         const phone = phoneObj.phone;
//         return (
//           /^\d{11}$/.test(phone) &&
//           (phone.startsWith("0") || phone.startsWith("09"))
//         );
//       },
//     );

//     if (!isValidPhoneNumbers) {
//       setCompanyPhoneNumberError("لطفا شماره تلفن را به صورت صحیح وارد کنید.");
//       return; // Stop execution if validation fails
//     } else {
//       setCompanyPhoneNumberError("");
//     }
//     handleSubmitMutation({
//       companyId: companyId,
//       data: formData,
//     });
//   };

//   const menuRef = useClickOutside<HTMLDivElement>(
//     () => setIsGridGuidShow(false),
//     [isGridGuidShow],
//   );

//   useEffect(() => {
//     companyId === "new" && setSubBreadcrumb([{ text: "ایجاد شرکت" }]);
//     if (companyData && companyId !== "new") {
//       reset({
//         firstName: companyData.firstName,
//         lastName: companyData.lastName,
//         email: companyData.email,
//         avatar: companyData.avatar,
//         userName: companyData.userName,
//         nationalCode: companyData.nationalCode,
//         economicCode: companyData.economicCode,
//         companyName: companyData.companyName,
//         address: companyData.address,
//         monthlySalaryMessage: companyData.monthlySalaryMessage,
//         coordinate: {
//           lat: companyData.coordinate?.lat,
//           lng: companyData.coordinate?.lng,
//         },
//         companyPhoneNumber: companyData.companyPhoneNumber,
//         isActive: companyData.isActive,
//         userPhoneNumber: companyData.userPhoneNumber,
//         userId: companyData.userId,
//         isDailyService: companyData.isDailyService,
//         isNightShift: companyData.isNightShift,
//         isColorBadge: companyData.isColorBadge,
//         isCloseService: companyData.isCloseService,
//       });
//     }
//   }, [companyData]);
//   return isLoading ? (
//     <LoaderScreen />
//   ) : (
//     <div>
//       <div className="flex gap-4 flex-col-reverse lg:flex-row relative z-10">
//         <form
//           onSubmit={handleSubmit(handleSubmitForm)}
//           className="flex-[3] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
//         >
//           <Input
//             {...register("firstName", {
//               required: "نام الزامی است",
//             })}
//             label="نام نماینده"
//             errorText={`${errors.firstName?.message || ""}`}
//           />
//           <Input
//             errorText={`${errors.lastName?.message || ""}`}
//             {...register("lastName", {
//               required: "نام خانوادگی الزامی است",
//             })}
//             label="نام  خانوادگی نماینده"
//           />
//           <Input
//             maxLength={11}
//             type="tel"
//             errorText={`${errors.userPhoneNumber?.message || ""}`}
//             {...register("userPhoneNumber")}
//             label="تلفن نماینده"
//             onInput={enterJustNumber}
//             name="none_auto"
//           />

//           {/* <Input
//             {...register("userName", {
//               required: "نام کاربری الزامی است",
//             })}
//             errorText={`${errors.userName?.message || ""}`}
//             label="نام کاربری"
//           /> */}
//           <Input
//             {...register("email", {
//               required: "ایمیل الزامی است",
//               pattern: {
//                 value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                 message: "ایمیل معتبر نیست",
//               },
//             })}
//             label="ایمیل و نام کاربری "
//             errorText={`${errors.email?.message || ""}`}
//           />
//           <Input
//             errorText={`${errors.companyName?.message || ""}`}
//             {...register("companyName", {
//               required: "نام شرکت الزامی است",
//             })}
//             label="نام شرکت"
//           />
//           <Input
//             errorText={`${errors.nationalCode?.message || ""}`}
//             {...register("nationalCode", {
//               required: "شناسه ملی الزامی است",
//             })}
//             maxLength={11}
//             label="شناسه ملی"
//           />
//           <Input
//             {...register("economicCode", {
//               required: "کد اقتصادی الزامی است",
//             })}
//             maxLength={12}
//             label="کد اقتصادی"
//             errorText={`${errors.economicCode?.message || ""}`}
//           />

//           <Input
//             errorText={`${errors.address?.message || ""}`}
//             {...register("address", {
//               required: "آدرس شرکت الزامی است",
//             })}
//             label="آدرس شرکت"
//           />
//           <div>
//             <Input
//               type={isShow ? "text" : "password"}
//               dir="ltr"
//               icon={
//                 isShow ? (
//                   <EyeIcon
//                     className="h-5 w-5 text-secondary-800"
//                     aria-hidden="true"
//                     onClick={() => setIsShow(!isShow)}
//                   />
//                 ) : (
//                   <EyeSlashIcon
//                     className="h-5 w-5 text-secondary-800"
//                     onClick={() => setIsShow(!isShow)}
//                   />
//                 )
//               }
//               errorText={`${errors.password?.message || ""}`}
//               {...register("password", {
//                 validate: {
//                   // Apply validation only if the password field is not empty
//                   validatePassword: (value) => {
//                     if (value && value.trim() !== "") {
//                       if (value.length < 8) {
//                         return "رمز عبور باید حداقل 8 کاراکتر باشد";
//                       }
//                       // if (!/[A-Z]/.test(value)) {
//                       //   return "رمز عبور باید حداقل یک حرف بزرگ داشته باشد";
//                       // }
//                       // if (!/[a-z]/.test(value)) {
//                       //   return "رمز عبور باید حداقل یک حرف کوچک داشته باشد";
//                       // }
//                     }
//                     return true; // No error if the field is empty
//                   },
//                 },
//               })}
//               label="رمز عبور"
//             />
//             {companyId !== "new" ? (
//               <span className="text-sm text-blue lg:text-nowrap">
//                 در صورت وارد کردن رمز عبور جدید ، رمز عبور فعلی شما تغییر خواهد
//                 کرد
//               </span>
//             ) : (
//               <span className="text-sm text-blue lg:text-nowrap">
//                 درصورت وارد نکردن رمز عبور ، شناسه ملی به عنوان رمز عبور استفاده
//                 خواهده شد
//               </span>
//             )}
//           </div>
//           <Textarea
//             {...register("monthlySalaryMessage")}
//             label="پیام ارسالی برای کرایه"
//           />
//           <div className="mt-4 flex col-span-2 items-center justify-between">
//             <PhoneInput
//               errorText={companyPhoneNumberError}
//               label="شماره تماس های شرکت"
//               phoneNumber={watch("companyPhoneNumber")}
//               onChange={(newPhoneNumbers) => {
//                 setValue("companyPhoneNumber", newPhoneNumbers);
//               }}
//             />
//           </div>
//         </form>

//         <div className="flex-1">
//           <ProfileSelectorInput
//             {...register("avatar")}
//             profileImageUrl={watch("avatar")}
//             onChangeImage={(img) => setValue("avatar", img)}
//           />

//           <div className="flex mt-10 gap-x-2 justify-center">
//             <div className=" flex items-center justify-center relative">
//               <div
//                 ref={menuRef}
//                 onClick={() => setIsGridGuidShow(!isGridGuidShow)}
//                 className=" flex items-center justify-center  cursor-pointer rounded-lg  aspect-square"
//               >
//                 <BiErrorCircle size={20} color={"#427bd2"} />
//               </div>

//               <div
//                 className={`${isGridGuidShow ? "block" : "hidden"} w-[276px] cursor-auto p-3 rounded-sm bg-white top-11 z-10000 shadow-[0px_0px_8px_1px_rgba(0,_0,_0,_0.1)] absolute`}
//               >
//                 <h5 className="font-semibold mb-2 text-sm">
//                   راهنمای رتبه‌بندی شرکت
//                 </h5>

//                 <p className="text-xs leading-5 mb-3 block">
//                   رتبه شرکت براساس شاخص‌هایی مثل میزان همکاری، تعداد و نظم
//                   سرویس‌ها، وضعیت پرداخت‌ها و عملکرد کلی شرکت محاسبه می‌شود.
//                 </p>

//                 <ul>
//                   {companyLevels.map((level) => (
//                     <li
//                       key={level.id}
//                       className="flex gap-x-5 mb-2  items-center"
//                     >
//                       <div
//                         dir="ltr"
//                         className="w-14 h-6 flex items-center justify-center rounded-lg"
//                         style={{
//                           backgroundColor: level.backgroundColor,
//                           border: `1px solid ${level.borderColor}33`,
//                         }}
//                       >
//                         <span
//                           className="font-bold text-xs"
//                           style={{
//                             color: level.color,
//                           }}
//                         >
//                           {level.id}
//                         </span>
//                       </div>
//                       <p className="text-xs min-w-10 font-medium">
//                         {level.score}
//                       </p>

//                       <p className="text-xs font-medium">{level.title}</p>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>

//             <div
//               dir="ltr"
//               onClick={() => {
//                 setIsGridGuidSelect(true);
//                 setTempSelectedLevel(selectedLevel);
//               }}
//               className="w-20 h-11 flex items-center justify-center rounded-lg cursor-pointer transition-all"
//               style={{
//                 backgroundColor: selectedLevelData?.backgroundColor,
//                 border: `1px solid ${selectedLevelData?.borderColor}33`,
//               }}
//             >
//               <span
//                 className="font-bold text-xl"
//                 style={{
//                   color: selectedLevelData?.color,
//                 }}
//               >
//                 {selectedLevelData?.id}
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="space-y-4 pt-4">
//         <InfoAlert title="توجه :">
//           با فعال کردن فلگ های دلخواه، سرویس های مربوطه برای شرکت فعال و در پنل
//           سازمانی قابل مشاهده خواهد شد.
//         </InfoAlert>
//         <div className="flex flex-wrap gap-3">
//           <SwitchButton
//             className="px-0"
//             label="فعال / غیر فعال"
//             isChecked={watch("isActive")}
//             name="isActive"
//             onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//               setValue("isActive", e.target.checked)
//             }
//           />
//           <SwitchButton
//             name="isDailyService"
//             label="سرویس روزانه"
//             isChecked={watch("isDailyService")}
//             className="!col-span-6"
//             onChange={(e: ChangeEvent<HTMLInputElement>) =>
//               setValue("isDailyService", e.target.checked)
//             }
//           />

//           <SwitchButton
//             name="isNightShift"
//             label="شیفت شب"
//             isChecked={watch("isNightShift")}
//             className="!col-span-6"
//             onChange={(e: ChangeEvent<HTMLInputElement>) =>
//               setValue("isNightShift", e.target.checked)
//             }
//           />
//           <SwitchButton
//             name="isCloseService"
//             label="سرویس آژانسی / دربستی"
//             isChecked={watch("isCloseService")}
//             className="!col-span-6"
//             onChange={(e: ChangeEvent<HTMLInputElement>) =>
//               setValue("isCloseService", e.target.checked)
//             }
//           />
//           <SwitchButton
//             name="colorLabel"
//             label="برچسب رنگ"
//             isChecked={watch("isColorBadge")}
//             className="!col-span-6"
//             onChange={(e: ChangeEvent<HTMLInputElement>) =>
//               setValue("isColorBadge", e.target.checked)
//             }
//           />
//         </div>
//       </div>
//       <div className="flex mt-4 gap-4 items-center justify-end">
//         <MainButton
//           type="submit"
//           loading={isPending}
//           onClick={handleSubmit(handleSubmitForm)}
//         >
//           ثبت
//         </MainButton>
//         <BackButton />
//       </div>
//       <div className="mt-4 relative z-0">
//         <SelectLocation
//           currentCoordinate={watch("coordinate")}
//           locationHandler={(newLocation) => {
//             setValue("address", newLocation.address);
//             setValue("coordinate", {
//               lat: newLocation.lat,
//               lng: newLocation.lng,
//             });
//           }}
//         />
//       </div>

//       <Modal
//         title="انتخاب سطح"
//         size="lg"
//         onClose={() => {
//           setIsGridGuidSelect(false);
//         }}
//         isOpen={isGridGuidSelect}
//       >
//         <div className="flex  px-5 gap-x-10">
//           <div className="grid w-8/12 grid-cols-3 gap-3 p-2">
//             {companyLevels.map((level) => {
//               const isSelected = tempSelectedLevel === level.id;

//               return (
//                 <div
//                   key={level.id}
//                   dir="rtl"
//                   onClick={() => {
//                     setTempSelectedLevel(level.id);
//                   }}
//                   className="cursor-pointer h-full rounded-lg p-3 transition-all"
//                   style={{
//                     backgroundColor: isSelected
//                       ? level.backgroundColor
//                       : "#ffffff",

//                     border: `1px solid ${
//                       isSelected ? level.borderColor : "#e5e7eb"
//                     }`,
//                   }}
//                 >
//                   <div className="flex relative">
//                     <div className="text-center w-full flex flex-col justify-between gap-y-5">
//                       <span
//                         className="text-3xl font-bold block"
//                         style={{
//                           color: level.color,
//                         }}
//                       >
//                         {level.id}
//                       </span>

//                       <span className="text-xs font-medium text-gray-700">
//                         {level.title}
//                       </span>
//                     </div>

//                     {isSelected && (
//                       <div
//                         className="w-5 h-5 absolute left-0 rounded-full flex items-center justify-center"
//                         style={{
//                           backgroundColor: level.color,
//                         }}
//                       >
//                         <span className="text-white text-xs">✓</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           <div className="w-4/12">
//             <h5 className="font-semibold mb-2 text-sm">
//               راهنمای رتبه‌بندی شرکت
//             </h5>

//             <p className="text-xs leading-5 mb-3 block">
//               رتبه شرکت براساس شاخص‌هایی مثل میزان همکاری، تعداد و نظم سرویس‌ها،
//               وضعیت پرداخت‌ها و عملکرد کلی شرکت محاسبه می‌شود.
//             </p>
//             <ul>
//               {companyLevels.map((level) => (
//                 <li key={level.id} className="flex gap-x-5 mb-3 items-center">
//                   <div
//                     dir="ltr"
//                     className="w-14 h-6 flex items-center justify-center rounded-lg"
//                     style={{
//                       backgroundColor: level.backgroundColor,
//                       border: `1px solid ${level.borderColor}33`,
//                     }}
//                   >
//                     <span
//                       className="font-bold text-xs"
//                       style={{
//                         color: level.color,
//                       }}
//                     >
//                       {level.id}
//                     </span>
//                   </div>
//                   <p className="text-sm font-medium">{level.score}</p>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//         <div className="flex items-center justify-center gap-4 mt-4 w-52 mx-auto">
//           <MainButton
//             onClick={() => {
//               setIsGridGuidSelect(false);
//             }}
//             theme="secondary"
//             className="flex-1"
//           >
//             انصراف
//           </MainButton>
//           <MainButton
//             onClick={() => {
//               setSelectedLevel(tempSelectedLevel);
//               setIsGridGuidSelect(false);
//             }}
//             className="flex-1"
//           >
//             ثبت
//           </MainButton>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default CompanyInfo;

// /////////////////////////////////////////////////////out click on all menu to close///////////////////////////

// import { useEffect, useRef } from "react";

// export const useClickOutside = <T extends HTMLElement>(
//   callback: () => void,
//   deps: any[] = [],
// ) => {
//   const ref = useRef<T | null>(null);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (ref.current && !ref.current.contains(event.target as Node)) {
//         callback();
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);

//     // Clean up with a check to avoid null error
//     return () => {
//       if (ref.current) {
//         document.removeEventListener("mousedown", handleClickOutside);
//       }
//     };
//   }, deps);

//   return ref;
// };
/////////////////////////////////////////////////////////

////////////////////////////////////////////////////////
// import { useMutation, useQuery } from "@tanstack/react-query";
// import { useNavigate, useParams } from "react-router-dom";
// import { getCompanyDetails, postCompanyDetails } from "./requests";
// import { ChangeEvent, useEffect, useState } from "react";
// import Input from "../../../components/inputs/Input";
// import { useClickOutside } from "../../../hooks/useClickOutside";
// import ProfileSelectorInput from "../../../components/profileSelector/ProfileSelectorInput";
// import MainButton from "../../../components/buttons/MainButton";
// import { useForm } from "react-hook-form";
// import SelectLocation from "../../../components/map/SelectLocation";
// import PhoneInput from "../../../components/inputs/PhoneInput";
// import { Company } from "./types";
// import SwitchButton from "../../../components/inputs/SwitchButton";
// import useBreadcrumbStore from "../../../store/breadcrumb/profile/breadcrumbStore";
// import BackButton from "../../../components/buttons/BackButton";
// import LoaderScreen from "../../../components/loaders/LoaderScreen";
// import InfoAlert from "../../../components/alert/InfoAlert";
// import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
// import Textarea from "../../../components/inputs/Textarea";
// import { enterJustNumber } from "../../../utils/helper";
// import { BiErrorCircle } from "react-icons/bi";
// import Modal from "../../../components/modals/Modal";
// // import { postMethod } from "../../../api/callApi";
// // import { notify } from "../../../utils/notify/notify";
// // import { DELETE_HEAD_DRIVER_WORKGROUP } from "../../../api/endpoints/employees/head_driver_endpoints";
// interface LevelType {
//   id: string;
//   title: string;
//   score: string;
//   color: string;
//   backgroundColor: string;
//   borderColor: string;
// }
// const companyLevels: LevelType[] = [
//   {
//     id: "سطح 5",
//     title: "VIP",
//     score: "90-100",
//     color: "#248a2f",
//     backgroundColor: "#f3fbee",
//     borderColor: "#248a2f",
//   },
//   {
//     id: "سطح 4",
//     title: "ممتاز",
//     score: "80-89",
//     color: "#84a759",
//     backgroundColor: "#f9fcfe",
//     borderColor: "#84a759",
//   },
//   {
//     id: "سطح 3",
//     title: "حرفه‌ای",
//     score: "70-79",
//     color: "#e2b051",
//     backgroundColor: "#fffcf3",
//     borderColor: "#e2b051",
//   },
//   {
//     id: "سطح 2",
//     title: "فعال",
//     score: "60-69",
//     color: "#f2883f",
//     backgroundColor: "#fcf8f5",
//     borderColor: "#f2883f",
//   },
//   {
//     id: "سطح 1",
//     title: "تازه وارد",
//     score: "0-59",
//     color: "#ab1e35",
//     backgroundColor: "#fbf6f4",
//     borderColor: "#ab1e35",
//   },
// ];
// const CompanyInfo = () => {
//   const {
//     register,
//     setValue,
//     watch,
//     reset,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   const { setSubBreadcrumb } = useBreadcrumbStore();
//   const navigate = useNavigate();
//   const [isShow, setIsShow] = useState(false);
//   const [isGridGuidShow, setIsGridGuidShow] = useState(false);
//   const [selectedLevel, setSelectedLevel] = useState<LevelType | null>(null);
//   const [tempSelectedLevel, setTempSelectedLevel] = useState("سطح 5");
//   const [isGridGuidSelect, setIsGridGuidSelect] = useState(false);
//   const [companyPhoneNumberError, setCompanyPhoneNumberError] = useState("");
//   const { companyId } = useParams();
//   const { data: companyData, isLoading } = useQuery({
//     queryKey: ["company_data"],
//     queryFn: async () => {
//       const response = await getCompanyDetails(companyId, setSubBreadcrumb);
//       console.log(response);

//       if (response) {
//         const selectedLevelData = companyLevels.find((level) => {
//           console.log(level.id);
//           const [min, max] = level.score.split("-");
//           console.log(Number(max), Number(min));

//           return (
//             response?.companyScore >= Number(min) &&
//             response?.companyScore <= Number(max)
//           );
//         });
//         console.log(response);

//         setSelectedLevel(selectedLevelData || null);
//       }
//       console.log(selectedLevel);
//     },
//   });

//   console.log(tempSelectedLevel);

//   console.log("selectedLevelData", selectedLevel);

//   const { mutate: handleSubmitMutation, isPending } = useMutation({
//     mutationFn: ({
//       companyId,
//       data,
//     }: {
//       companyId: string | undefined;
//       data: Company;
//     }) => postCompanyDetails(companyId, data, navigate),
//   });

//   const handleSubmitForm = () => {
//     const formData = {
//       companyName: watch("companyName"),
//       nationalCode: watch("nationalCode"),
//       companyPhoneNumber: watch("companyPhoneNumber"),
//       economicCode: watch("economicCode"),
//       address: watch("address"),
//       avatar: watch("avatar"),
//       coordinate: watch("coordinate"),
//       userName: watch("userName"),
//       firstName: watch("firstName"),
//       lastName: watch("lastName"),
//       email: watch("email"),
//       isActive: watch("isActive") || false,
//       userPhoneNumber: watch("userPhoneNumber"),
//       userId: watch("userId"),
//       monthlySalaryMessage: watch("monthlySalaryMessage"),
//       password: watch("password"),
//       isDailyService: watch("isDailyService"),
//       isNightShift: watch("isNightShift"),
//       isColorBadge: watch("isColorBadge"),
//       isCloseService: watch("isCloseService"),
//       // companyScore: watch("companyScore"),
//     };

//     // Validate phone numbers
//     const isValidPhoneNumbers = formData?.companyPhoneNumber?.every(
//       (phoneObj: any) => {
//         const phone = phoneObj.phone;
//         return (
//           /^\d{11}$/.test(phone) &&
//           (phone.startsWith("0") || phone.startsWith("09"))
//         );
//       },
//     );

//     if (!isValidPhoneNumbers) {
//       setCompanyPhoneNumberError("لطفا شماره تلفن را به صورت صحیح وارد کنید.");
//       return; // Stop execution if validation fails
//     } else {
//       setCompanyPhoneNumberError("");
//     }
//     handleSubmitMutation({
//       companyId: companyId,
//       data: formData,
//     });
//   };

//   const menuRef = useClickOutside<HTMLDivElement>(
//     () => setIsGridGuidShow(false),
//     [isGridGuidShow],
//   );

//   useEffect(() => {
//     companyId === "new" && setSubBreadcrumb([{ text: "ایجاد شرکت" }]);
//     if (companyData && companyId !== "new") {
//       reset({
//         firstName: companyData.firstName,
//         lastName: companyData.lastName,
//         email: companyData.email,
//         avatar: companyData.avatar,
//         userName: companyData.userName,
//         nationalCode: companyData.nationalCode,
//         economicCode: companyData.economicCode,
//         companyName: companyData.companyName,
//         address: companyData.address,
//         monthlySalaryMessage: companyData.monthlySalaryMessage,
//         coordinate: {
//           lat: companyData.coordinate?.lat,
//           lng: companyData.coordinate?.lng,
//         },
//         companyPhoneNumber: companyData.companyPhoneNumber,
//         isActive: companyData.isActive,
//         userPhoneNumber: companyData.userPhoneNumber,
//         userId: companyData.userId,
//         isDailyService: companyData.isDailyService,
//         isNightShift: companyData.isNightShift,
//         isColorBadge: companyData.isColorBadge,
//         isCloseService: companyData.isCloseService,
//       });
//     }
//   }, [companyData]);
//   return isLoading ? (
//     <LoaderScreen />
//   ) : (
//     <div>
//       <div className="flex gap-4 flex-col-reverse lg:flex-row relative z-10">
//         <form
//           onSubmit={handleSubmit(handleSubmitForm)}
//           className="flex-[3] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
//         >
//           <Input
//             {...register("firstName", {
//               required: "نام الزامی است",
//             })}
//             label="نام نماینده"
//             errorText={`${errors.firstName?.message || ""}`}
//           />
//           <Input
//             errorText={`${errors.lastName?.message || ""}`}
//             {...register("lastName", {
//               required: "نام خانوادگی الزامی است",
//             })}
//             label="نام  خانوادگی نماینده"
//           />
//           <Input
//             maxLength={11}
//             type="tel"
//             errorText={`${errors.userPhoneNumber?.message || ""}`}
//             {...register("userPhoneNumber")}
//             label="تلفن نماینده"
//             onInput={enterJustNumber}
//             name="none_auto"
//           />

//           {/* <Input
//             {...register("userName", {
//               required: "نام کاربری الزامی است",
//             })}
//             errorText={`${errors.userName?.message || ""}`}
//             label="نام کاربری"
//           /> */}
//           <Input
//             {...register("email", {
//               required: "ایمیل الزامی است",
//               pattern: {
//                 value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                 message: "ایمیل معتبر نیست",
//               },
//             })}
//             label="ایمیل و نام کاربری "
//             errorText={`${errors.email?.message || ""}`}
//           />
//           <Input
//             errorText={`${errors.companyName?.message || ""}`}
//             {...register("companyName", {
//               required: "نام شرکت الزامی است",
//             })}
//             label="نام شرکت"
//           />
//           <Input
//             errorText={`${errors.nationalCode?.message || ""}`}
//             {...register("nationalCode", {
//               required: "شناسه ملی الزامی است",
//             })}
//             maxLength={11}
//             label="شناسه ملی"
//           />
//           <Input
//             {...register("economicCode", {
//               required: "کد اقتصادی الزامی است",
//             })}
//             maxLength={12}
//             label="کد اقتصادی"
//             errorText={`${errors.economicCode?.message || ""}`}
//           />

//           <Input
//             errorText={`${errors.address?.message || ""}`}
//             {...register("address", {
//               required: "آدرس شرکت الزامی است",
//             })}
//             label="آدرس شرکت"
//           />
//           <div>
//             <Input
//               type={isShow ? "text" : "password"}
//               dir="ltr"
//               icon={
//                 isShow ? (
//                   <EyeIcon
//                     className="h-5 w-5 text-secondary-800"
//                     aria-hidden="true"
//                     onClick={() => setIsShow(!isShow)}
//                   />
//                 ) : (
//                   <EyeSlashIcon
//                     className="h-5 w-5 text-secondary-800"
//                     onClick={() => setIsShow(!isShow)}
//                   />
//                 )
//               }
//               errorText={`${errors.password?.message || ""}`}
//               {...register("password", {
//                 validate: {
//                   // Apply validation only if the password field is not empty
//                   validatePassword: (value) => {
//                     if (value && value.trim() !== "") {
//                       if (value.length < 8) {
//                         return "رمز عبور باید حداقل 8 کاراکتر باشد";
//                       }
//                       // if (!/[A-Z]/.test(value)) {
//                       //   return "رمز عبور باید حداقل یک حرف بزرگ داشته باشد";
//                       // }
//                       // if (!/[a-z]/.test(value)) {
//                       //   return "رمز عبور باید حداقل یک حرف کوچک داشته باشد";
//                       // }
//                     }
//                     return true; // No error if the field is empty
//                   },
//                 },
//               })}
//               label="رمز عبور"
//             />
//             {companyId !== "new" ? (
//               <span className="text-sm text-blue lg:text-nowrap">
//                 در صورت وارد کردن رمز عبور جدید ، رمز عبور فعلی شما تغییر خواهد
//                 کرد
//               </span>
//             ) : (
//               <span className="text-sm text-blue lg:text-nowrap">
//                 درصورت وارد نکردن رمز عبور ، شناسه ملی به عنوان رمز عبور استفاده
//                 خواهده شد
//               </span>
//             )}
//           </div>
//           <Textarea
//             {...register("monthlySalaryMessage")}
//             label="پیام ارسالی برای کرایه"
//           />
//           <div className="mt-4 flex col-span-2 items-center justify-between">
//             <PhoneInput
//               errorText={companyPhoneNumberError}
//               label="شماره تماس های شرکت"
//               phoneNumber={watch("companyPhoneNumber")}
//               onChange={(newPhoneNumbers) => {
//                 setValue("companyPhoneNumber", newPhoneNumbers);
//               }}
//             />
//           </div>
//         </form>

//         <div className="flex-1">
//           <ProfileSelectorInput
//             {...register("avatar")}
//             profileImageUrl={watch("avatar")}
//             onChangeImage={(img) => setValue("avatar", img)}
//           />

//           <div className="flex mt-10 gap-x-2 justify-center">
//             <div className=" flex items-center justify-center relative">
//               <div
//                 ref={menuRef}
//                 onClick={() => setIsGridGuidShow(!isGridGuidShow)}
//                 className=" flex items-center justify-center  cursor-pointer rounded-lg  aspect-square"
//               >
//                 <BiErrorCircle size={20} color={"#427bd2"} />
//               </div>

//               <div
//                 className={`${isGridGuidShow ? "block" : "hidden"} w-[276px] cursor-auto p-3 rounded-sm bg-white top-11 z-10000 shadow-[0px_0px_8px_1px_rgba(0,_0,_0,_0.1)] absolute`}
//               >
//                 <h5 className="font-semibold mb-2 text-sm">
//                   راهنمای رتبه‌بندی شرکت
//                 </h5>

//                 <p className="text-xs leading-5 mb-3 block">
//                   رتبه شرکت براساس شاخص‌هایی مثل میزان همکاری، تعداد و نظم
//                   سرویس‌ها، وضعیت پرداخت‌ها و عملکرد کلی شرکت محاسبه می‌شود.
//                 </p>

//                 <ul>
//                   {companyLevels.map((level) => (
//                     <li
//                       key={level.id}
//                       className="flex gap-x-5 mb-2  items-center"
//                     >
//                       <div
//                         dir="ltr"
//                         className="w-14 h-6 flex items-center justify-center rounded-lg"
//                         style={{
//                           backgroundColor: level.backgroundColor,
//                           border: `1px solid ${level.borderColor}33`,
//                         }}
//                       >
//                         <span
//                           className="font-bold text-xs"
//                           style={{
//                             color: level.color,
//                           }}
//                         >
//                           {level.id}
//                         </span>
//                       </div>
//                       <p className="text-xs min-w-10 font-medium">
//                         {level.score}
//                       </p>

//                       <p className="text-xs font-medium">{level.title}</p>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>

//             <div
//               dir="ltr"
//               onClick={() => {
//                 setIsGridGuidSelect(true);
//                 // setTempSelectedLevel(selectedLevel);
//               }}
//               className="w-20 h-11 flex items-center justify-center rounded-lg cursor-pointer transition-all"
//               style={{
//                 backgroundColor: selectedLevel?.backgroundColor,
//                 border: `1px solid ${selectedLevel?.borderColor}33`,
//               }}
//             >
//               <span
//                 className="font-bold text-xl"
//                 style={{
//                   color: selectedLevel?.color,
//                 }}
//               >
//                 {selectedLevel?.id}
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="space-y-4 pt-4">
//         <InfoAlert title="توجه :">
//           با فعال کردن فلگ های دلخواه، سرویس های مربوطه برای شرکت فعال و در پنل
//           سازمانی قابل مشاهده خواهد شد.
//         </InfoAlert>
//         <div className="flex flex-wrap gap-3">
//           <SwitchButton
//             className="px-0"
//             label="فعال / غیر فعال"
//             isChecked={watch("isActive")}
//             name="isActive"
//             onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//               setValue("isActive", e.target.checked)
//             }
//           />
//           <SwitchButton
//             name="isDailyService"
//             label="سرویس روزانه"
//             isChecked={watch("isDailyService")}
//             className="!col-span-6"
//             onChange={(e: ChangeEvent<HTMLInputElement>) =>
//               setValue("isDailyService", e.target.checked)
//             }
//           />

//           <SwitchButton
//             name="isNightShift"
//             label="شیفت شب"
//             isChecked={watch("isNightShift")}
//             className="!col-span-6"
//             onChange={(e: ChangeEvent<HTMLInputElement>) =>
//               setValue("isNightShift", e.target.checked)
//             }
//           />
//           <SwitchButton
//             name="isCloseService"
//             label="سرویس آژانسی / دربستی"
//             isChecked={watch("isCloseService")}
//             className="!col-span-6"
//             onChange={(e: ChangeEvent<HTMLInputElement>) =>
//               setValue("isCloseService", e.target.checked)
//             }
//           />
//           <SwitchButton
//             name="colorLabel"
//             label="برچسب رنگ"
//             isChecked={watch("isColorBadge")}
//             className="!col-span-6"
//             onChange={(e: ChangeEvent<HTMLInputElement>) =>
//               setValue("isColorBadge", e.target.checked)
//             }
//           />
//         </div>
//       </div>
//       <div className="flex mt-4 gap-4 items-center justify-end">
//         <MainButton
//           type="submit"
//           loading={isPending}
//           onClick={handleSubmit(handleSubmitForm)}
//         >
//           ثبت
//         </MainButton>
//         <BackButton />
//       </div>
//       <div className="mt-4 relative z-0">
//         <SelectLocation
//           currentCoordinate={watch("coordinate")}
//           locationHandler={(newLocation) => {
//             setValue("address", newLocation.address);
//             setValue("coordinate", {
//               lat: newLocation.lat,
//               lng: newLocation.lng,
//             });
//           }}
//         />
//       </div>

//       <Modal
//         title="انتخاب سطح"
//         size="lg"
//         onClose={() => {
//           setIsGridGuidSelect(false);
//         }}
//         isOpen={isGridGuidSelect}
//       >
//         <div className="flex  px-5 gap-x-10">
//           <div className="grid w-8/12 grid-cols-3 gap-3 p-2">
//             {companyLevels.map((level) => {
//               const isSelected = tempSelectedLevel === level.id;

//               return (
//                 <div
//                   key={level.id}
//                   dir="rtl"
//                   onClick={() => {
//                     setTempSelectedLevel(level.id);
//                   }}
//                   className="cursor-pointer h-full rounded-lg p-3 transition-all"
//                   style={{
//                     backgroundColor: isSelected
//                       ? level.backgroundColor
//                       : "#ffffff",

//                     border: `1px solid ${
//                       isSelected ? level.borderColor : "#e5e7eb"
//                     }`,
//                   }}
//                 >
//                   <div className="flex relative">
//                     <div className="text-center w-full flex flex-col justify-between gap-y-5">
//                       <span
//                         className="text-3xl font-bold block"
//                         style={{
//                           color: level.color,
//                         }}
//                       >
//                         {level.id}
//                       </span>

//                       <span className="text-xs font-medium text-gray-700">
//                         {level.title}
//                       </span>
//                     </div>

//                     {isSelected && (
//                       <div
//                         className="w-5 h-5 absolute left-0 rounded-full flex items-center justify-center"
//                         style={{
//                           backgroundColor: level.color,
//                         }}
//                       >
//                         <span className="text-white text-xs">✓</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           <div className="w-4/12">
//             <h5 className="font-semibold mb-2 text-sm">
//               راهنمای رتبه‌بندی شرکت
//             </h5>

//             <p className="text-xs leading-5 mb-3 block">
//               رتبه شرکت براساس شاخص‌هایی مثل میزان همکاری، تعداد و نظم سرویس‌ها،
//               وضعیت پرداخت‌ها و عملکرد کلی شرکت محاسبه می‌شود.
//             </p>
//             <ul>
//               {companyLevels.map((level) => (
//                 <li key={level.id} className="flex gap-x-5 mb-3 items-center">
//                   <div
//                     dir="ltr"
//                     className="w-14 h-6 flex items-center justify-center rounded-lg"
//                     style={{
//                       backgroundColor: level.backgroundColor,
//                       border: `1px solid ${level.borderColor}33`,
//                     }}
//                   >
//                     <span
//                       className="font-bold text-xs"
//                       style={{
//                         color: level.color,
//                       }}
//                     >
//                       {level.id}
//                     </span>
//                   </div>
//                   <p className="text-sm font-medium">{level.score}</p>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//         <div className="flex items-center justify-center gap-4 mt-4 w-52 mx-auto">
//           <MainButton
//             onClick={() => {
//               setIsGridGuidSelect(false);
//             }}
//             theme="secondary"
//             className="flex-1"
//           >
//             انصراف
//           </MainButton>
//           <MainButton onClick={() => {}} className="flex-1">
//             ثبت
//           </MainButton>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default CompanyInfo;
// ////////////////////////////////////////////////////////////////////////// last and corect code from admin companis part to تعین سطح شرکت ها ///////////////////////
// import { useMutation, useQuery } from "@tanstack/react-query";
// import { useNavigate, useParams } from "react-router-dom";
// import { getCompanyDetails, postCompanyDetails } from "./requests";
// import { ChangeEvent, useEffect, useState } from "react";
// import Input from "../../../components/inputs/Input";
// import { useClickOutside } from "../../../hooks/useClickOutside";
// import ProfileSelectorInput from "../../../components/profileSelector/ProfileSelectorInput";
// import MainButton from "../../../components/buttons/MainButton";
// import { useForm } from "react-hook-form";
// import SelectLocation from "../../../components/map/SelectLocation";
// import PhoneInput from "../../../components/inputs/PhoneInput";
// import { Company } from "./types";
// import SwitchButton from "../../../components/inputs/SwitchButton";
// import useBreadcrumbStore from "../../../store/breadcrumb/profile/breadcrumbStore";
// import BackButton from "../../../components/buttons/BackButton";
// import LoaderScreen from "../../../components/loaders/LoaderScreen";
// import InfoAlert from "../../../components/alert/InfoAlert";
// import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
// import Textarea from "../../../components/inputs/Textarea";
// import { enterJustNumber } from "../../../utils/helper";
// import { BiErrorCircle } from "react-icons/bi";
// import Modal from "../../../components/modals/Modal";
// const companyLevels = [
//   {
//     id: "سطح 5",
//     title: "VIP",
//     score: "90-100",
//     color: "#248a2f",
//     backgroundColor: "#f3fbee",
//     borderColor: "#248a2f",
//     value: 95,
//   },
//   {
//     id: "سطح 4",
//     title: "ممتاز",
//     score: "80-89",
//     color: "#84a759",
//     backgroundColor: "#f9fcfe",
//     borderColor: "#84a759",
//     value: 85,
//   },
//   {
//     id: "سطح 3",
//     title: "حرفه‌ای",
//     score: "70-79",
//     color: "#e2b051",
//     backgroundColor: "#fffcf3",
//     borderColor: "#e2b051",
//     value: 75,
//   },
//   {
//     id: "سطح 2",
//     title: "فعال",
//     score: "60-69",
//     color: "#f2883f",
//     backgroundColor: "#fcf8f5",
//     borderColor: "#f2883f",
//     value: 65,
//   },
//   {
//     id: "سطح 1",
//     title: "تازه وارد",
//     score: "0-59",
//     color: "#ab1e35",
//     backgroundColor: "#fbf6f4",
//     borderColor: "#ab1e35",
//     value: 55,
//   },
// ];

// const CompanyInfo = () => {
//   const {
//     register,
//     setValue,
//     watch,
//     reset,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   const { setSubBreadcrumb } = useBreadcrumbStore();
//   const navigate = useNavigate();
//   const [isShow, setIsShow] = useState(false);
//   const [isGridGuidShow, setIsGridGuidShow] = useState(false);
//   const [tempSelectedLevel, setTempSelectedLevel] = useState<any>(null);
//   const [isGridGuidSelect, setIsGridGuidSelect] = useState(false);
//   const [companyPhoneNumberError, setCompanyPhoneNumberError] = useState("");
//   const { companyId } = useParams();
//   const { data: companyData, isLoading } = useQuery({
//     queryKey: ["company_data"],
//     queryFn: async () => {
//       const response = await getCompanyDetails(companyId, setSubBreadcrumb);
//       if (response?.isSuccess) {
//         const level = companyLevels.find((level) => {
//           const [min, max] = level.score.split("-");
//           const minNumber = Number(min);
//           const maxNumber = Number(max);
//           return (
//             response?.data?.companyScore >= minNumber &&
//             response?.data?.companyScore <= maxNumber
//           );
//         });
//         console.log(level);

//         if (level) {
//           setTempSelectedLevel(level);
//         }
//       }
//       return response;
//     },
//   });

//   const { mutate: handleSubmitMutation, isPending } = useMutation({
//     mutationFn: ({
//       companyId,
//       data,
//     }: {
//       companyId: string | undefined;
//       data: Company;
//     }) => postCompanyDetails(companyId, data, navigate),
//   });

//   const handleSubmitForm = () => {
//     const formData = {
//       companyName: watch("companyName"),
//       nationalCode: watch("nationalCode"),
//       companyPhoneNumber: watch("companyPhoneNumber"),
//       economicCode: watch("economicCode"),
//       address: watch("address"),
//       avatar: watch("avatar"),
//       coordinate: watch("coordinate"),
//       userName: watch("userName"),
//       firstName: watch("firstName"),
//       lastName: watch("lastName"),
//       email: watch("email"),
//       isActive: watch("isActive") || false,
//       userPhoneNumber: watch("userPhoneNumber"),
//       userId: watch("userId"),
//       monthlySalaryMessage: watch("monthlySalaryMessage"),
//       password: watch("password"),
//       isDailyService: watch("isDailyService"),
//       isNightShift: watch("isNightShift"),
//       isColorBadge: watch("isColorBadge"),
//       isCloseService: watch("isCloseService"),
//       companyScore: watch("companyScore"),
//     };

//     // Validate phone numbers
//     const isValidPhoneNumbers = formData?.companyPhoneNumber?.every(
//       (phoneObj: any) => {
//         const phone = phoneObj.phone;
//         return (
//           /^\d{11}$/.test(phone) &&
//           (phone.startsWith("0") || phone.startsWith("09"))
//         );
//       },
//     );

//     if (!isValidPhoneNumbers) {
//       setCompanyPhoneNumberError("لطفا شماره تلفن را به صورت صحیح وارد کنید.");
//       return; // Stop execution if validation fails
//     } else {
//       setCompanyPhoneNumberError("");
//     }
//     handleSubmitMutation({
//       companyId: companyId,
//       data: formData,
//     });
//   };

//   const menuRef = useClickOutside<HTMLDivElement>(
//     () => setIsGridGuidShow(false),
//     [isGridGuidShow],
//   );

//   useEffect(() => {
//     companyId === "new" && setSubBreadcrumb([{ text: "ایجاد شرکت" }]);
//     if (companyData && companyId !== "new") {
//       reset({
//         firstName: companyData.firstName,
//         lastName: companyData.lastName,
//         email: companyData.email,
//         avatar: companyData.avatar,
//         userName: companyData.userName,
//         nationalCode: companyData.nationalCode,
//         economicCode: companyData.economicCode,
//         companyName: companyData.companyName,
//         address: companyData.address,
//         monthlySalaryMessage: companyData.monthlySalaryMessage,
//         coordinate: {
//           lat: companyData.coordinate?.lat,
//           lng: companyData.coordinate?.lng,
//         },
//         companyPhoneNumber: companyData.companyPhoneNumber,
//         isActive: companyData.isActive,
//         userPhoneNumber: companyData.userPhoneNumber,
//         userId: companyData.userId,
//         isDailyService: companyData.isDailyService,
//         isNightShift: companyData.isNightShift,
//         isColorBadge: companyData.isColorBadge,
//         isCloseService: companyData.isCloseService,
//         companyScore: companyData.companyScore,
//       });
//     }
//   }, [companyData]);
//   return isLoading ? (
//     <LoaderScreen />
//   ) : (
//     <div>
//       <div className="flex gap-4 flex-col-reverse lg:flex-row relative z-10">
//         <form
//           onSubmit={handleSubmit(handleSubmitForm)}
//           className="flex-[3] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
//         >
//           <Input
//             {...register("firstName", {
//               required: "نام الزامی است",
//             })}
//             label="نام نماینده"
//             errorText={`${errors.firstName?.message || ""}`}
//           />
//           <Input
//             errorText={`${errors.lastName?.message || ""}`}
//             {...register("lastName", {
//               required: "نام خانوادگی الزامی است",
//             })}
//             label="نام  خانوادگی نماینده"
//           />
//           <Input
//             maxLength={11}
//             type="tel"
//             errorText={`${errors.userPhoneNumber?.message || ""}`}
//             {...register("userPhoneNumber")}
//             label="تلفن نماینده"
//             onInput={enterJustNumber}
//             name="none_auto"
//           />

//           {/* <Input
//             {...register("userName", {
//               required: "نام کاربری الزامی است",
//             })}
//             errorText={`${errors.userName?.message || ""}`}
//             label="نام کاربری"
//           /> */}
//           <Input
//             {...register("email", {
//               required: "ایمیل الزامی است",
//               pattern: {
//                 value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                 message: "ایمیل معتبر نیست",
//               },
//             })}
//             label="ایمیل و نام کاربری "
//             errorText={`${errors.email?.message || ""}`}
//           />
//           <Input
//             errorText={`${errors.companyName?.message || ""}`}
//             {...register("companyName", {
//               required: "نام شرکت الزامی است",
//             })}
//             label="نام شرکت"
//           />
//           <Input
//             errorText={`${errors.nationalCode?.message || ""}`}
//             {...register("nationalCode", {
//               required: "شناسه ملی الزامی است",
//             })}
//             maxLength={11}
//             label="شناسه ملی"
//           />
//           <Input
//             {...register("economicCode", {
//               required: "کد اقتصادی الزامی است",
//             })}
//             maxLength={12}
//             label="کد اقتصادی"
//             errorText={`${errors.economicCode?.message || ""}`}
//           />

//           <Input
//             errorText={`${errors.address?.message || ""}`}
//             {...register("address", {
//               required: "آدرس شرکت الزامی است",
//             })}
//             label="آدرس شرکت"
//           />
//           <div>
//             <Input
//               type={isShow ? "text" : "password"}
//               dir="ltr"
//               icon={
//                 isShow ? (
//                   <EyeIcon
//                     className="h-5 w-5 text-secondary-800"
//                     aria-hidden="true"
//                     onClick={() => setIsShow(!isShow)}
//                   />
//                 ) : (
//                   <EyeSlashIcon
//                     className="h-5 w-5 text-secondary-800"
//                     onClick={() => setIsShow(!isShow)}
//                   />
//                 )
//               }
//               errorText={`${errors.password?.message || ""}`}
//               {...register("password", {
//                 validate: {
//                   // Apply validation only if the password field is not empty
//                   validatePassword: (value) => {
//                     if (value && value.trim() !== "") {
//                       if (value.length < 8) {
//                         return "رمز عبور باید حداقل 8 کاراکتر باشد";
//                       }
//                       // if (!/[A-Z]/.test(value)) {
//                       //   return "رمز عبور باید حداقل یک حرف بزرگ داشته باشد";
//                       // }
//                       // if (!/[a-z]/.test(value)) {
//                       //   return "رمز عبور باید حداقل یک حرف کوچک داشته باشد";
//                       // }
//                     }
//                     return true; // No error if the field is empty
//                   },
//                 },
//               })}
//               label="رمز عبور"
//             />
//             {companyId !== "new" ? (
//               <span className="text-sm text-blue lg:text-nowrap">
//                 در صورت وارد کردن رمز عبور جدید ، رمز عبور فعلی شما تغییر خواهد
//                 کرد
//               </span>
//             ) : (
//               <span className="text-sm text-blue lg:text-nowrap">
//                 درصورت وارد نکردن رمز عبور ، شناسه ملی به عنوان رمز عبور استفاده
//                 خواهده شد
//               </span>
//             )}
//           </div>
//           <Textarea
//             {...register("monthlySalaryMessage")}
//             label="پیام ارسالی برای کرایه"
//           />
//           <div className="mt-4 flex col-span-2 items-center justify-between">
//             <PhoneInput
//               errorText={companyPhoneNumberError}
//               label="شماره تماس های شرکت"
//               phoneNumber={watch("companyPhoneNumber")}
//               onChange={(newPhoneNumbers) => {
//                 setValue("companyPhoneNumber", newPhoneNumbers);
//               }}
//             />
//           </div>
//         </form>

//         <div className="flex-1">
//           <ProfileSelectorInput
//             {...register("avatar")}
//             profileImageUrl={watch("avatar")}
//             onChangeImage={(img) => setValue("avatar", img)}
//           />

//           <div className="flex mt-10 gap-x-2 justify-center">
//             <div className=" flex items-center justify-center relative">
//               <div
//                 ref={menuRef}
//                 onClick={() => setIsGridGuidShow(!isGridGuidShow)}
//                 className=" flex items-center justify-center  cursor-pointer rounded-lg  aspect-square"
//               >
//                 <BiErrorCircle size={20} color={"#427bd2"} />
//               </div>

//               <div
//                 className={`${isGridGuidShow ? "block" : "hidden"} w-[276px] cursor-auto p-3 rounded-sm bg-white top-11 z-10000 shadow-[0px_0px_8px_1px_rgba(0,_0,_0,_0.1)] absolute`}
//               >
//                 <h5 className="font-semibold mb-2 text-sm">
//                   راهنمای رتبه‌بندی شرکت
//                 </h5>

//                 <p className="text-xs leading-5 mb-3 block">
//                   رتبه شرکت براساس شاخص‌هایی مثل میزان همکاری، تعداد و نظم
//                   سرویس‌ها، وضعیت پرداخت‌ها و عملکرد کلی شرکت محاسبه می‌شود.
//                 </p>

//                 <ul>
//                   {companyLevels.map((level) => (
//                     <li
//                       key={level.id}
//                       className="flex gap-x-5 mb-2  items-center"
//                     >
//                       <div
//                         dir="ltr"
//                         className="w-14 h-6 flex items-center justify-center rounded-lg"
//                         style={{
//                           backgroundColor: level.backgroundColor,
//                           border: `1px solid ${level.borderColor}33`,
//                         }}
//                       >
//                         <span
//                           className="font-bold text-xs"
//                           style={{
//                             color: level.color,
//                           }}
//                         >
//                           {level.id}
//                         </span>
//                       </div>
//                       <p className="text-xs min-w-10 font-medium">
//                         {level.score}
//                       </p>

//                       <p className="text-xs font-medium">{level.title}</p>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//             <div
//               dir="ltr"
//               onClick={() => {
//                 setIsGridGuidSelect(true);
//               }}
//               className="w-20 h-11 flex items-center justify-center rounded-lg cursor-pointer transition-all"
//               style={{
//                 backgroundColor: tempSelectedLevel?.backgroundColor,
//                 border: `1px solid ${tempSelectedLevel?.borderColor}33`,
//               }}
//             >
//               <span
//                 className={`font-bold ${tempSelectedLevel?.id ? "text-xl" : "text-sm shrink-0"}`}
//                 style={{
//                   color: tempSelectedLevel?.color,
//                 }}
//               >
//                 {tempSelectedLevel?.id ?? "تعیین سطح"}
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="space-y-4 pt-4">
//         <InfoAlert title="توجه :">
//           با فعال کردن فلگ های دلخواه، سرویس های مربوطه برای شرکت فعال و در پنل
//           سازمانی قابل مشاهده خواهد شد.
//         </InfoAlert>
//         <div className="flex flex-wrap gap-3">
//           <SwitchButton
//             className="px-0"
//             label="فعال / غیر فعال"
//             isChecked={watch("isActive")}
//             name="isActive"
//             onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//               setValue("isActive", e.target.checked)
//             }
//           />
//           <SwitchButton
//             name="isDailyService"
//             label="سرویس روزانه"
//             isChecked={watch("isDailyService")}
//             className="!col-span-6"
//             onChange={(e: ChangeEvent<HTMLInputElement>) =>
//               setValue("isDailyService", e.target.checked)
//             }
//           />

//           <SwitchButton
//             name="isNightShift"
//             label="شیفت شب"
//             isChecked={watch("isNightShift")}
//             className="!col-span-6"
//             onChange={(e: ChangeEvent<HTMLInputElement>) =>
//               setValue("isNightShift", e.target.checked)
//             }
//           />
//           <SwitchButton
//             name="isCloseService"
//             label="سرویس آژانسی / دربستی"
//             isChecked={watch("isCloseService")}
//             className="!col-span-6"
//             onChange={(e: ChangeEvent<HTMLInputElement>) =>
//               setValue("isCloseService", e.target.checked)
//             }
//           />
//           <SwitchButton
//             name="colorLabel"
//             label="برچسب رنگ"
//             isChecked={watch("isColorBadge")}
//             className="!col-span-6"
//             onChange={(e: ChangeEvent<HTMLInputElement>) =>
//               setValue("isColorBadge", e.target.checked)
//             }
//           />
//         </div>
//       </div>
//       <div className="flex mt-4 gap-4 items-center justify-end">
//         <MainButton
//           type="submit"
//           loading={isPending}
//           onClick={handleSubmit(handleSubmitForm)}
//         >
//           ثبت
//         </MainButton>
//         <BackButton />
//       </div>
//       <div className="mt-4 relative z-0">
//         <SelectLocation
//           currentCoordinate={watch("coordinate")}
//           locationHandler={(newLocation) => {
//             setValue("address", newLocation.address);
//             setValue("coordinate", {
//               lat: newLocation.lat,
//               lng: newLocation.lng,
//             });
//           }}
//         />
//       </div>

//       <Modal
//         title="انتخاب سطح"
//         size="lg"
//         onClose={() => {
//           setIsGridGuidSelect(false);
//           setTempSelectedLevel(null);
//         }}
//         isOpen={isGridGuidSelect}
//       >
//         <div className="flex  px-5 gap-x-10">
//           <div className="grid w-8/12 grid-cols-3 gap-3 p-2">
//             {companyLevels.map((level) => {
//               const isSelected = tempSelectedLevel?.id === level.id;

//               return (
//                 <div
//                   key={level.id}
//                   dir="rtl"
//                   onClick={() => {
//                     setTempSelectedLevel(level);
//                   }}
//                   className="cursor-pointer h-full rounded-lg p-3 transition-all"
//                   style={{
//                     backgroundColor: isSelected
//                       ? level.backgroundColor
//                       : "#ffffff",

//                     border: `1px solid ${
//                       isSelected ? level.borderColor : "#e5e7eb"
//                     }`,
//                   }}
//                 >
//                   <div className="flex relative">
//                     <div className="text-center w-full flex flex-col justify-between gap-y-5">
//                       <span
//                         className="text-3xl font-bold block"
//                         style={{
//                           color: level.color,
//                         }}
//                       >
//                         {level.id}
//                       </span>

//                       <span className="text-xs font-medium text-gray-700">
//                         {level.title}
//                       </span>
//                     </div>

//                     {isSelected && (
//                       <div
//                         className="w-5 h-5 absolute left-0 rounded-full flex items-center justify-center"
//                         style={{
//                           backgroundColor: level.color,
//                         }}
//                       >
//                         <span className="text-white text-xs">✓</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           <div className="w-4/12">
//             <h5 className="font-semibold mb-2 text-sm">
//               راهنمای رتبه‌بندی شرکت
//             </h5>

//             <p className="text-xs leading-5 mb-3 block">
//               رتبه شرکت براساس شاخص‌هایی مثل میزان همکاری، تعداد و نظم سرویس‌ها،
//               وضعیت پرداخت‌ها و عملکرد کلی شرکت محاسبه می‌شود.
//             </p>
//             <div className="flex gap-10 ">
//               <ul>
//                 {companyLevels.map((level) => (
//                   <li key={level.id} className="flex gap-x-5 mb-3 items-center">
//                     <div
//                       dir="ltr"
//                       className="w-14 h-6 flex items-center justify-center rounded-lg"
//                       style={{
//                         backgroundColor: level.backgroundColor,
//                         border: `1px solid ${level.borderColor}33`,
//                       }}
//                     >
//                       <span
//                         className="font-bold text-xs"
//                         style={{
//                           color: level.color,
//                         }}
//                       >
//                         {level.id}
//                       </span>
//                     </div>
//                     <p className="text-sm font-medium">{level.score}</p>
//                   </li>
//                 ))}
//               </ul>
//               <ul className="gap-x-5 mb-3 items-center">
//                 <li className="flex gap-x-5 mb-3 items-center">تعداد خودرو</li>
//                 <li className="flex gap-x-5 mb-3 items-center">نوع خودرو</li>
//                 <li className="flex gap-x-5 mb-3 items-center">
//                   مبلغ کل صورت حساب
//                 </li>
//                 <li className="flex gap-x-5 mb-3 items-center">
//                   معمول و VIP بودن خودرو
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//         <div className="flex items-center justify-center gap-4 mt-4 w-52 mx-auto">
//           <MainButton
//             onClick={() => {
//               setIsGridGuidSelect(false);
//             }}
//             theme="secondary"
//             className="flex-1"
//           >
//             انصراف
//           </MainButton>
//           <MainButton
//             onClick={() => {
//               console.log(tempSelectedLevel);
//               setValue("companyScore", tempSelectedLevel?.value);
//               setIsGridGuidSelect(false);
//             }}
//             className="flex-1"
//           >
//             ثبت
//           </MainButton>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default CompanyInfo;
