import { Fragment } from "react";

export default function DriverLayout({
  onClick = () => {},
  error = false,
  children = "",
  active = false,
  name = "",
  driver = "",
  amount = "",
  multipleRate = false,
  Icon,
}) {
  return (
    <div
      className={`flex justify-between items-center p-6 py-4 border-[1px] rounded-[8px] ${
        error || !driver
          ? "cursor-not-allowed border-[#cacaca] text-[#cacaca]"
          : "cursor-pointer border-[#CACACA]"
      }`}
      onClick={onClick}
    >
      <div className="w-full flex flex-col gap-y-4 font-poppins text-[14px] leading-[23px]">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-[100px]">
              <Icon />
            </div>
            <p className="font-[600]">{name}</p>
          </div>
          <div className="flex flex-col items-end gap-y-2">
            {driver ? (
              <Fragment>
                {!multipleRate && (
                  <Fragment>
                    <div
                      className={`w-[16px] h-[16px] rounded-full ${
                        active
                          ? "border-[5px] border-[#F05769]"
                          : "border-[1px] border-[#E0E0E0]"
                      }`}
                    ></div>
                    <p>{amount}</p>
                  </Fragment>
                )}
              </Fragment>
            ) : (
              <div>{error ? <p>Unavailable</p> : <p>Loading ...</p>}</div>
            )}
          </div>
        </div>

        {children}
      </div>
    </div>
  );
}
