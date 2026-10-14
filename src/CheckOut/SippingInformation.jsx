const ShippingInf = () => {
  return (
    <div className="w-full h-150  shadow-[0_0px_10px_rgba(0,0,0,0.20)] rounded-2xl flex-col">
      <div className="flex  px-6 gap-2.5 flex-col">
        <div className="flex items-center text-center justify-center px-6 gap-2.5">
          <span className=" items-center mx-auto  font-bold text-[16px] w-6.5 h-6.5 p-2.5 rounded-full bg-[#005ed9] text-[#f8f8f8] flex text-center justify-center m-5">
            1
          </span>
          <h1 className="text-start items-start mx-auto  font-bold text-[20px] container m-5">
            Shipping Information
          </h1>
        </div>
        <div className="">
          <form>
            <div className="w-full grid grid-cols-2  px-6 gap-2.5">
              <div className="flex flex-col  ">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className=" border rounded-[10px] mt-2.5  p-2.5"
                ></input>
              </div>
              <div className="flex flex-col  ">
                <label>Email Address</label>
                <input
                  type="text"
                  placeholder="Enter your email"
                  className=" border rounded-[10px] mt-2.5 p-2.5"
                ></input>
              </div>
              <div className="flex flex-col  py-2.5">
                <label>National ID Number</label>
                <input
                  type="text"
                  placeholder="Enter National ID Number"
                  className=" border rounded-[10px] mt-2.5 p-2.5"
                ></input>
              </div>
              <div className="flex flex-col  py-2.5">
                <label>Phone Number</label>
                <input
                  type="text"
                  placeholder="Enter Phone Number"
                  className=" border rounded-[10px] mt-2.5 p-2.5"
                ></input>
              </div>
            </div>
            <div className="flex flex-col py-2.5  px-6 ">
              <label>Address</label>
              <input
                type="text"
                placeholder="Enter Your Address"
                className=" border rounded-[10px] mt-2.5 p-2.5"
              ></input>
            </div>
            <br></br>

            <div className=" px-6">
              <div className="flex flex-col gap-2.5 py-2.5 ">
                <label>additional Notes</label>
                <textarea
                  type="text"
                  placeholder="add  any notes about your order..."
                  className=" border rounded-[10px] mt-2.5 p-2.5"
                ></textarea>
                <button className="w-full p-2.5 text-white rounded-[10px] bg-[#054eed]">
                  Place order
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShippingInf;
