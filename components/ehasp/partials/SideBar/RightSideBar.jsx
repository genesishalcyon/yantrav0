import BellIcon from "@/components/svg/BellIcon";
import globalState from "@/lib/store/globalState";
import PaymentMethod from "@/components/ehasp/checkout/payment/PaymentMethod";
import ShippingMethod from "@/components/ehasp/checkout/shipping/ShippingMethod";
import Notification from "@/components/ehasp/partials/notification/NotificationList";
import { useEffect, useRef } from "react";
import BankTransferModal from "@/components/ehasp/checkout/payment/BankTransferModal";
import checkoutStore from "@/lib/store/checkoutStore";
export default function RightSideBar({}) {
  const sidebar = globalState((state) => state.sidebar);
  const closeRef = useRef("");

  const bankTransferInstruction = checkoutStore(
    (state) => state.bankTransferInstruction
  );

  useEffect(() => {
    globalState.setState({
      closeSideBarTrigger: closeRef,
    });

    const sidenav = document.getElementById("rightSideBar");
    sidenav.addEventListener("hidden.te.sidenav", (event) => {
      globalState.setState({
        sidebar: {
          type: "",
          title: "",
        },
      });
    });
  }, []);
  const RenderComponent = () => {
    switch (sidebar.type) {
      case "payment":
        return <PaymentMethod />;
      case "shipping":
        return <ShippingMethod />;
      case "notification":
        return <Notification />;
    }
  };
  return (
    <div>
      <nav
        id="rightSideBar"
        className="fixed right-0 top-0 z-[1035] h-screen translate-x-full overflow-hidden bg-white"
        data-te-sidenav-init
        data-te-sidenav-hidden="true"
        data-te-sidenav-right="true"
        data-te-sidenav-width={400}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between bg-[#D81B60] text-white items-center px-4 py-2">
            <div className="flex items-center gap-x-2">
              {sidebar?.type === "notification" && <BellIcon fill="#FFFFFF" />}
              <span className="font-poppins text-[16px] leading-[23px] font-[600]">
                {sidebar?.title}
              </span>
            </div>
            <button
              ref={closeRef}
              data-te-sidenav-toggle-ref
              data-te-target="#rightSideBar"
              aria-controls="#rightSideBar"
              aria-haspopup="true"
              className="font-bold text-[25px] leading-none"
            >
              &times;
            </button>
          </div>
          <div className="h-full overflow-hidden">
            <RenderComponent />
          </div>
        </div>
      </nav>

      <BankTransferModal id="banktransfer" data={bankTransferInstruction} />
    </div>
  );
}
