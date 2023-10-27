import Link from "next/link";
import AUTHAPI from "@/lib/api/auth/request";
import { useRouter } from "next/router";
import ProfilePicture from "@/components/ehasp/profile/partials/ProfilePicture";
import ChevronIcon from "@/components/svg/ChevronIcon";
import FavoriteIcon from "@/components/svg/FavoriteIcon";
import CartIcon from "@/components/svg/CartIcon";
import LogoutIcon from "@/components/svg/LogoutIcon";
import MyAccountIcon from "@/components/svg/MyAccountIcon";
import CartIconAccount from "@/components/svg/CartIconAccount";
export default function Layout({ children }) {
  const router = useRouter();
  const isOrderDetailsPage = window?.location?.search?.includes("reference");
  const activeLink = window?.location?.pathname?.split("/").pop() || "account";
  const bgColor = () => {
    if (activeLink === "account") {
      return "bg-[#f8f8f9]";
    }
    if (activeLink === "favorites") {
      return "bg-[#f8f8f9]";
    }
    if (activeLink === "purchases") {
      return "bg-[#f8f8f9]";
    }
  };
  const accountMenu = [
    {
      label: "My Account",
      value: "account",
      url: "/account",
      icon: <MyAccountIcon width={24} height={28} />,
    },
    {
      label: "Favorites",
      value: "favorites",
      url: "/account/favorites",
      icon: <FavoriteIcon />,
    },
    {
      label: "Purchases",
      value: "purchases",
      url: "/account/purchases",
      icon: <CartIconAccount width={24} height={28} />,
    },
  ];

  return (
    <div className="mb-20">
      {!isOrderDetailsPage && (
        <div className={`${bgColor()} w-full`}>
          <div className="relative max-w-xl px-4 m-auto xl:px-0">
            <div className="flex gap-x-4">
              {/* <div className="w-[15%] hidden md:flex"></div> */}
              <div className="h-[160px] md:h-[140px] flex justify-center md:justify-start items-start md:items-end flex-grow py-6">
                <p className="font-poppins text-[#231F20] text-[35px] leading-[60px] font-[600] capitalize">
                  {`My ${activeLink}`}
                </p>
              </div>
            </div>
            <div
              className={`${
                !isOrderDetailsPage
                  ? "absolute bottom-[-80px] left-[50%] translate-x-[-50%]"
                  : ""
              } w-[152px] h-[152px] rounded-full bg-[#FFFFFF] shadow-lg md:hidden`}
            >
              <ProfilePicture />
            </div>
          </div>
        </div>
      )}
      <div className="relative max-w-xl px-4 m-auto xl:px-0 ">
        <div className="flex flex-col md:flex-row gap-x-4">
          <div
            className={`${
              isOrderDetailsPage ? "mt-16" : "mt-7"
            } w-[23%] lg:w-[15%] hidden lg:flex flex-col gap-y-6`}
          >
            <div
              className={`${
                !isOrderDetailsPage ? "top-[-26px]" : ""
              } w-[122px] lg:w-[152px] h-[122px] lg:h-[152px] rounded-full bg-[#FFFFFF] shadow-lg`}
            >
              <ProfilePicture />
            </div>
            <div className="flex flex-col gap-y-6 font-poppins text-[16px] leading-[24px]">
              {accountMenu.map((d, i) => (
                <Link
                  key={i}
                  href={d.url}
                  className={`flex gap-x-5 items-center ${
                    activeLink === d.value
                      ? "text-[#315589] font-[700]"
                      : "text-[#55555] font-[500]"
                  }`}
                >
                  {d.icon} {d.label}
                </Link>
              ))}
              <button
                className="flex gap-x-5 text-left font-[500]"
                onClick={() =>
                  AUTHAPI.logout().then(() => {
                    router.replace("/");
                  })
                }
              >
                <LogoutIcon /> Logout
              </button>
            </div>
          </div>
          <div
            className={`md:hidden ${
              isOrderDetailsPage ? "hidden" : "inline mt-28 md:mt-0"
            }`}
          >
            <div className="relative">
              <select
                value={activeLink}
                className="outline-none appearance-none py-3 px-5  w-full border-[1px] border-[#555555] rounded-[8px] font-poppins text-[#315589] text-[14px] leading-[23px]"
                onChange={(e) => {
                  router.push(
                    `/${
                      e.target.value === "account"
                        ? "account"
                        : `account/${e.target.value}`
                    }`
                  );
                }}
              >
                {accountMenu.map((d, i) => (
                  <option key={i} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </select>
              <span className="absolute right-[10px] top-[50%] translate-y-[-50%]">
                <ChevronIcon fill="#555555" className="rotate-[90deg]" />
              </span>
            </div>
          </div>
          <div className="w-full lg:w-[85%] mt-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
