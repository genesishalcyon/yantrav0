import BellIcon from "@/components/svg/BellIcon";
import globalState from "@/lib/store/globalState";
import PaymentMethod from "@/components/ehasp/checkout/payment/PaymentMethod";
import ShippingMethod from "@/components/ehasp/checkout/shipping/ShippingMethod";
import NotificationList from "@/components/ehasp/partials/notification/NotificationList";
import { useEffect, useRef } from "react";
import BankTransferModal from "@/components/ehasp/checkout/payment/BankTransferModal";
import checkoutStore from "@/lib/store/checkoutStore";
import { useRouter } from "next/router";
export default function RightSideBarCustom({}) {
  const sidebar = globalState((state) => state.sidebar);
  const closeRef = useRef("");
  const router = useRouter();

  const bankTransferInstruction = checkoutStore(
    (state) => state.bankTransferInstruction
  );

  useEffect(() => {
    globalState.setState({
      closeSideBarTrigger: closeRef,
      sidebar: {
        type: "",
        title: "",
      },
    });
  }, [router]);

  const closeSidebar = () => {
    globalState.setState({
      sidebar: { ...sidebar, open: false },
    });
    setTimeout(() => {
      globalState.setState({
        sidebar: {
          open: false,
          type: "",
          title: "",
        },
      });
    }, 500);
  };

  const RenderComponent = () => {
    switch (sidebar.type) {
      case "payment":
        return <PaymentMethod />;
      case "shipping":
        return <ShippingMethod />;
      case "notification":
        return <NotificationList />;
    }
  };
  return (
    <div>
      <div
        className={`${
          sidebar.open === true ? "visible" : "hidden"
        } transition-all duration-300 ease-in-out fixed top-0 left-0 z-[900] bg-black w-full h-full opacity-50`}
        onClick={() => closeSidebar()}
      ></div>

      <nav
        className={`${sidebar.open === true ? "open-sidebar" : ""}
          ${
            sidebar.open === false && "close-sidebar"
          }  hidden w-full md:w-[400px] fixed right-0 top-0 z-[1035] h-screen overflow-hidden bg-white`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between bg-[#315589] text-white items-center px-4 py-[27px]">
            <div className="flex items-center gap-x-2">
              {sidebar?.type === "notification" && <BellIcon fill="#FFFFFF" />}
              <span className="font-poppins text-[14px] leading-[23px] font-[600]">
                {sidebar?.title}
              </span>
            </div>
            <button
              ref={closeRef}
              className="font-bold text-[25px] leading-none"
              onClick={() => {
                closeSidebar();
              }}
            >
              &times;
            </button>
          </div>
          <div className="h-full overflow-hidden">
            <RenderComponent />
          </div>
        </div>
      </nav>

      {sidebar.type === "payment" && (
        <BankTransferModal id="banktransfer" data={bankTransferInstruction} />
      )}
    </div>
  );
}
