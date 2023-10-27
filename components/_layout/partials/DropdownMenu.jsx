import Link from "next/link";
import { useEffect } from "react";
import AccountIcon from "@/components/svg/AccountIcon";
import SignUpIcon from "@/components/svg/SignUpIcon";
import EmailIcon from "@/components/svg/EmailIcon";
import AUTHAPI from "@/lib/api/auth/request";
import persistentStore from "@/lib/store/persistentStore";
import globalState from "@/lib/store/globalState";
import { useRouter } from "next/router";
import globalData from "@/lib/preBuildScripts/static/globalData.json";
export default function DropdownMenu({ account }) {
  const router = useRouter();
  const profile = persistentStore((state) => state.profile);
  const [ready] = globalState((state) => [state.ready]);
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);
  const { menus } = globalData;
  const nodes = menus?.parentNodes || [];

  const closeFilter = () => {
    setTimeout(() => {
      globalState.setState({
        showMenu: false,
      });
    }, 500);
  };

  return (
    <div className="md:hidden fixed w-full max-h-screen h-screen overflow-y-scroll z-[999] bg-[#FFFFFF] pb-[250px]">
      <div className="relative p-4">
        <div className="flex flex-col gap-y-4 font-poppins text-[#555555] text-[18px] leading-[27px] font-[500]">
          {ready && profile?.id && (
            <>
              <div
                className="flex flex-nowrap items-center gap-x-2 border-b-[0.5px] border-[rgba(209, 213, 219, 1)] pb-4"
                onClick={() => {
                  router.push("/account");
                  closeFilter();
                }}
              >
                <span className="w-[20px]">
                  <AccountIcon />
                </span>
                <p className="text-[#315589] whitespace-nowrap overflow-hidden text-ellipsis">
                  {`Hi, ${account?.first_name || ""}`}
                </p>
              </div>
              <button
                className="text-left border-b-[0.5px] border-[rgba(209, 213, 219, 1)] pb-4"
                onClick={() => AUTHAPI.logout()}
              >
                Logout
              </button>
            </>
          )}
          {ready && !profile?.id && (
            <>
              <div className="border-b-[0.5px] border-[rgba(209, 213, 219, 1)] pb-4">
                <div
                  className="flex items-center flex-nowrap gap-x-2"
                  onClick={() => {
                    router.push("/login");
                    closeFilter();
                  }}
                >
                  <AccountIcon />
                  <p className="text-[#315589] font-[700]">Log in</p>
                </div>
              </div>
              <div className="border-b-[0.5px] border-[rgba(209, 213, 219, 1)] pb-4">
                <div
                  className="flex items-center flex-nowrap gap-x-2"
                  onClick={() => {
                    router.push("/register");
                    closeFilter();
                  }}
                >
                  <SignUpIcon />
                  <p className="text-[#EE3424] font-[700]">Register</p>
                </div>
              </div>
            </>
          )}
          {nodes.map((menu) => (
            <div
              key={menu.url}
              className={`border-b-[0.5px] border-[rgba(209, 213, 219, 1)] pb-4 font-[700] ${
                router.asPath === menu.url ? "text-[#D81B60]" : "text-[#555555]"
              }`}
              onClick={() => {
                router.push(menu.url);
                closeFilter();
              }}
            >
              {menu.label}
            </div>
          ))}
          {ready && !profile && (
            <div
              className={`border-b-[0.5px] border-[rgba(209, 213, 219, 1)] pb-4 font-[700] ${
                router.asPath === "/guest/track-order"
                  ? "text-[#D81B60]"
                  : "text-[#555555]"
              }`}
              onClick={() => {
                router.push("/guest/track-order");
                closeFilter();
              }}
            >
              Track Order
            </div>
          )}
        </div>
        <div className="fixed bottom-0 flex flex-col gap-y-5 text-[#555555] text-[14px] leading-[21px] pb-4 font-[700]">
          <div className="flex items-center w-full flex-nowrap">
            <EmailIcon width={13} height={10} />
            <p className="ml-2">michael@yantraseeds.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
