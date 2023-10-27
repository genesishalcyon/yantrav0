import BankTransferIcon from "@/components/svg/BankTransferIcon";
import Image from "next/image";
import CashOnDeliveryIcon from "@/components/svg/CashOnDeliveryIcon";
import ModalButton from "@/components/ehasp/partials/ModalButton";
import { useState, useEffect } from "react";
import checkoutStore from "@/lib/store/checkoutStore";
import { shallow } from "zustand/shallow";
import globalState from "@/lib/store/globalState";
export default function PaymentMethod() {
  const [modalData, setModalData] = useState();
  const closeSideBar = globalState((state) => state.closeSideBar);
  const [paymentMethods, paymentMethodHandler] = checkoutStore(
    (state) => [state.paymentMethods, state.paymentMethodHandler],
    shallow
  );

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    document.body.style.paddingRight = "17px";
    return () => {
      document.body.style.overflowY = "auto";
      document.body.style.paddingRight = "0px";
    };
  }, []);

  const RenderIcon = (gateway) => {
    switch (gateway) {
      case "bank-transfer":
        return <BankTransferIcon />;
      case "paypal":
        return (
          <Image alt="" src="/images/paypal_icon.png" width={88} height={34} />
        );
      case "stripe":
        return (
          <Image alt="" src="/images/stripe_icon.png" width={68} height={28} />
        );
      case "manual":
        return <CashOnDeliveryIcon />;
    }
  };

  return (
    <div className="flex flex-col justify-between h-full overflow-y-auto notification-scroll px-4 pb-4 pt-[41px]">
      <div className="flex flex-col gap-y-4 mb-4">
        {paymentMethods.map((method, i) => (
          <div
            key={i}
            className="flex justify-between items-center max-h-[80px] px-6 py-8 border-[1px] border-[#CBCBCB] rounded-[8px] cursor-pointer"
            onClick={() =>
              checkoutStore.setState({
                paymentMethodHandler: method.id,
              })
            }
          >
            <div className="w-full flex flex-col gap-y-4 text-[14px] leading-[23px]">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-4">
                  <div className="w-[100px] flex justify-center">
                    {RenderIcon(method.gateway)}
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <p className="font-[600]">
                      {method.gateway === "manual"
                        ? "Cash on Delivery"
                        : method.name}
                    </p>
                    {method.instruction && (
                      <ModalButton
                        id="banktransfer"
                        className="w-fit text-[#F05769]"
                        onClick={() =>
                          checkoutStore.setState({
                            bankTransferInstruction: method,
                          })
                        }
                      >
                        View Instruction
                      </ModalButton>
                    )}
                  </div>
                </div>
                <div
                  className={`w-[16px] h-[16px] rounded-full ${
                    method.id === paymentMethodHandler
                      ? "border-[5px] border-[#315589]"
                      : "border-[1px] border-[#E0E0E0]"
                  }`}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <div className="grid grid-cols-2 gap-x-2">
          <button
            className="inline-flex justify-center text-center bg-[#315589] px-[16px] py-[8px] rounded-[26px] font-poppins text-[#FFFFFF] text-[16px] leading-[24px] font-[600]"
            onClick={() => {
              checkoutStore.setState({ paymentMethod: paymentMethodHandler });
              closeSideBar();
            }}
          >
            Save
          </button>
          <button
            onClick={closeSideBar}
            className="flex justify-center items-center bg-[#EE3424] px-[16px] py-[8px] rounded-[26px] font-poppins text-[#FFFFFF] text-[14px] leading-[20px] font-[500]"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
