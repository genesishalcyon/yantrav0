import BellIcon from "@/components/svg/BellIcon";
import CartIcon from "@/components/svg/CartIcon";
import AccountIcon from "@/components/svg/AccountIcon";
import SignUpIcon from "@/components/svg/SignUpIcon";
import BurgerIcon from "@/components/svg/BurgerIcon";
import CloseIcon from "@/components/svg/CloseIcon";
import EmailIcon from "@/components/svg/EmailIcon";
import ChevronIcon from "@/components/svg/ChevronIcon";
// import Image from "next/image";
import globalData from "@/lib/preBuildScripts/static/globalData.json";
import Link from "next/link";
import persistentStore from "@/lib/store/persistentStore";
import globalState from "@/lib/store/globalState";
import { Fragment, useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
// import cartStore from "@/lib/store/cartStore";
// import CARTAPI from "@/lib/api/cart/request";
// import notificationStore from "@/lib/store/notificationStore";
// import NOTIFICATIONAPI from "@/lib/api/notification/request";
// import authStore from "@/lib/store/authStore";
import AUTHAPI from "@/lib/api/auth/request";
import { shallow } from "zustand/shallow";
import SideBarButton from "@/components/ehasp/partials/SideBar/SideBarButton";
// import MainLogo from "@/components/svg/MainLogo";
import dynamic from "next/dynamic";
// import NotificationBadge from "./NotificationBadge";
// import CartMenu from "./CartMenu";
import Image from "next/image";
const GUEST_FEATURE = process.env.NEXT_PUBLIC_GUEST_FEATURE;

const NotificationBadge = dynamic(() =>
  import("./NotificationBadge").then((module) => module.default)
);

const CartBadge = dynamic(() =>
  import("./CartBadge").then((module) => module.default)
);

const AccountNotVerified = dynamic(() =>
  import("./AccountNotVerified").then((module) => module.default)
);

export default function Menu({ account }) {
  const router = useRouter();
  const myAccountRef = useRef(null);
  const profile = persistentStore((state) => state.profile);
  const [ready, showAuthModal, showMenu] = globalState((state) => [
    state.ready,
    state.showAuthModal,
    state.showMenu,
  ]);
  const { tenantDetails, menus } = globalData;
  const nodes = menus?.parentNodes || [];

  const [showLazy] = globalState((state) => [state.showLazy], shallow);

  // const { data: cartCount, mutate: reCount } = CARTAPI.countCartItemsSwr({
  //   render: profile || GUEST_FEATURE === "true",
  //   revalidateOnFocus: false,
  //   onSuccess: () => {
  //     cartStore.setState({ reCount });
  //   },
  // });

  // const { data: notificationCount, mutate: reCountNotification } =
  //   NOTIFICATIONAPI.countNotificationsSwr({
  //     render: profile,
  //     revalidateOnFocus: false,
  //     onSuccess: () => {
  //       notificationStore.setState({ reCountNotification });
  //     },
  //   });

  // const logo = tenantDetails?.data?.main?.logo;

  const [showMyAccount, setShowMyAccount] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        myAccountRef.current &&
        !myAccountRef.current.contains(event.target)
      ) {
        setShowMyAccount(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [myAccountRef]);

  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    const delayTimer = setTimeout(() => {
      setLoading(false);
    }, 4000);

    const showLoadingComponent = () => {
      setLoading(false);
      clearTimeout(delayTimer);
    };

    document.addEventListener("scroll", showLoadingComponent, {
      passive: true,
    });
    document.addEventListener("mousemove", showLoadingComponent, {
      passive: true,
    });
    document.addEventListener("touchstart", showLoadingComponent, {
      passive: true,
    });

    return () => {
      clearTimeout(delayTimer);
      document.removeEventListener("scroll", showLoadingComponent, {
        passive: true,
      });
      document.removeEventListener("mousemove", showLoadingComponent, {
        passive: true,
      });
      document.removeEventListener("touchstart", showLoadingComponent, {
        passive: true,
      });
    };
  }, []);

  return (
    <>
      <nav className="w-full flex flex-col sticky top-0 z-[899] h-auto lg:h-[151px]">
        <div className="py-3 bg-[#FFFFFF] md:border-[#E0E0E0] md:border-b-[2px] shadow-md md:shadow-none flex flex-col md:gap-y-3">
          <div className="flex flex-wrap justify-center w-full max-w-xl px-4 mx-auto xl:px-0">
            <div className="flex flex-wrap items-center justify-between w-full gap-x-4">
              <Link
                prefetch={false}
                href="/"
                className="relative w-full max-w-[145px] 3sm:max-w-[170px] md:max-w-[180px] h-[50px] md:h-[60px]"
              >
                <Image
                  alt="logo"
                  src={tenantDetails?.data?.main.logo}
                  width={170}
                  height={60}
                />
                <span className="sr-only" hidden>
                  Logo
                </span>
              </Link>
              <div className="flex flex-col w-auto gap-y-0 md:gap-y-4">
                <div className="flex flex-wrap justify-center w-full max-w-xl px-4 mx-auto xl:px-0">
                  <div className="hidden w-full md:flex flex-wrap md:justify-end md:items-center md:gap-x-4 gap-y-2 py-[4px] bg-transparent">
                    <div className="flex items-center justify-center w-full md:w-auto flex-nowrap gap-x-3">
                      <EmailIcon width={13} height={10} />
                      <p className="font-poppins text-[#555555] text-[14px] font-[700] leading-[21px] tracking-[0.7px]">
                        michael@yantraseeds.com
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center self-end px-4 gap-x-2 md:gap-x-8 xl:px-0">
                  {ready && profile?.id && (
                    <Fragment>
                      <div className="relative">
                        <SideBarButton
                          className="flex items-end"
                          onClick={() => {
                            globalState.setState({
                              sidebar: {
                                open: true,
                                type: "notification",
                                title: "System Notifications",
                              },
                            });
                          }}
                        >
                          <div className="text-[#DF3020]">
                            <BellIcon />
                          </div>
                        </SideBarButton>
                        {/* {!!notificationCount?.count && (
                          <div className="absolute top-0 right-0 rounded-full bg-[#18ACBA] border-[1px] border-[#FFFFFF] border-full w-[7px] h-[7px]"></div>
                        )} */}
                        <NotificationBadge profile={profile} />
                      </div>
                      <div className="relative">
                        <Link
                          prefetch={false}
                          href="/cart"
                          className="flex items-center flex-nowrap gap-x-3"
                          aria-label="Read more about cart"
                        >
                          <div className="text-[#DF3020]">
                            <CartIcon width={17} height={18} />
                          </div>
                          <CartBadge profile={profile} />
                          <p className="hidden md:inline font-poppins text-[#DF3020] text-[16px] lg:text-[16px] leading-[23px] lg:leading-[27px] font-[700] tracking-[0.8px]">
                            Cart
                          </p>
                        </Link>
                      </div>
                      <div
                        ref={myAccountRef}
                        className="relative hidden md:inline"
                        onClick={() => {
                          setShowMyAccount((prev) => !prev);
                          globalState.setState({
                            showMenu: false,
                          });
                        }}
                      >
                        <div className="flex items-center cursor-pointer flex-nowrap gap-x-3">
                          <AccountIcon />
                          <p className="hidden md:inline max-w-[150px] whitespace-nowrap overflow-hidden text-ellipsis font-poppins text-[#315589] text-[16px] lg:text-[16px] leading-[23px] lg:leading-[27px] font-[700] mr-3 tracking-[0.8px]">
                            {`Hi, ${account?.first_name || ""}`}
                          </p>
                          <ChevronIcon className="hidden md:inline rotate-[90deg]" />
                        </div>
                        {showMyAccount && (
                          <div className="absolute min-w-[140px] top-[35px] right-[0px] md:left-[0px] z-[90] bg-[#FFFFFF] border-[1px] border-[#E0E0E0] flex flex-col gap-y-4 px-6 py-4 font-poppins text-[#555555] text-[14px] leading-[21px] font-[700]">
                            <Link
                              prefetch={false}
                              href="/account"
                              className="hover:text-[#D81B60]"
                            >
                              My Account
                            </Link>
                            <Link
                              prefetch={false}
                              href="/account/favorites"
                              className="hover:text-[#D81B60]"
                            >
                              My Favorites
                            </Link>
                            <Link
                              prefetch={false}
                              href="/account/purchases"
                              className="hover:text-[#D81B60]"
                            >
                              Purchases
                            </Link>
                            <div className="h-[1px] bg-[#E5E7EB] w-full"></div>
                            <button
                              className="text-left hover:text-[#D81B60]"
                              onClick={() => AUTHAPI.logout()}
                            >
                              Logout
                            </button>
                          </div>
                        )}
                      </div>
                    </Fragment>
                  )}
                  {ready && !profile?.id && (
                    <>
                      {GUEST_FEATURE === "true" && (
                        <div className="relative">
                          <Link
                            prefetch={false}
                            href="/guest/cart"
                            className="flex items-center flex-nowrap gap-x-3"
                            aria-label="Read more about cart"
                          >
                            <div className="text-[#DF3020]">
                              <CartIcon width={17} height={18} />
                            </div>
                            {/* {!!cartCount?.cartCount && (
                              <span className="absolute -mt-5 ml-3 rounded-[0.37rem] bg-danger px-[0.45em] py-[0.2em] text-[0.6rem] leading-none text-white">
                                {cartCount.cartCount}
                              </span>
                            )} */}
                            {!isLoading && <CartBadge profile={profile} />}
                            <p className="hidden md:inline font-poppins text-[#DF3020] text-[16px] lg:text-[16px] leading-[23px] lg:leading-[27px] font-[700] tracking-[0.8px]">
                              Cart
                            </p>
                          </Link>
                        </div>
                      )}

                      {/* <CartMenu
                        profile={profile}
                        showNotification={!isLoading}
                      /> */}

                      <div>
                        <Link
                          prefetch={false}
                          href="/register"
                          className="items-center hidden md:flex flex-nowrap gap-x-3"
                        >
                          <SignUpIcon />
                          <p className="font-poppins text-[#DF3020] text-[16px] lg:text-[16px] leading-[23px] lg:leading-[27px] font-[700] tracking-[0.8px]">
                            Register
                          </p>
                        </Link>
                      </div>
                      <div>
                        <Link
                          prefetch={false}
                          href="/login"
                          className="items-center hidden md:flex flex-nowrap gap-x-3"
                        >
                          <AccountIcon />
                          <p className="font-poppins text-[#315589] text-[16px] lg:text-[16px] leading-[23px] lg:leading-[27px] font-[700] tracking-[0.8px]">
                            Log in
                          </p>
                        </Link>
                      </div>
                    </>
                  )}
                  <div className="relative flex md:hidden">
                    <div
                      className="flex items-center cursor-pointer md:hidden flex-nowrap gap-x-2"
                      onClick={() => {
                        globalState.setState({
                          showMenu: !showMenu,
                        });
                        setShowMyAccount(false);
                      }}
                    >
                      {showMenu ? <CloseIcon /> : <BurgerIcon />}
                    </div>
                    {/* {showMenu && <DropdownMenu />} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="md:border-t-[2px]"></div>
          <div className="flex flex-col items-center w-auto">
            <div className="items-center hidden md:flex gap-x-[100px]">
              {nodes.map((menu) => (
                <Link
                  prefetch={false}
                  key={menu.url}
                  href={menu.url}
                  className={`font-poppins ${
                    router.asPath === menu.url
                      ? "text-[#D81B60]"
                      : "text-[#555555]"
                  } text-[12px] lg:text-[16px] leading-[27px] font-[700] tracking-[0.8px]`}
                >
                  {menu.label}
                </Link>
              ))}
              {ready && !profile && (
                <Link
                  prefetch={false}
                  href="/guest/track-order"
                  className={`font-poppins ${
                    router.asPath === "/guest/track-order"
                      ? "text-[#D81B60]"
                      : "text-[#555555]"
                  } text-[12px] lg:text-[16px] leading-[27px] font-[700] tracking-[0.8px]`}
                >
                  Track Order
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
      {account?.is_verified === false && (
        <>
          {(showLazy || !isLoading) && <AccountNotVerified profile={profile} />}
        </>
        // <div className="py-2 w-full bg-[#D81B60] sticky top-[83px] md:top-[138px] xl:top-[140px] z-[899]">
        //   <div className="flex flex-wrap items-center justify-center w-full h-full max-w-xl px-4 mx-auto sm:justify-between gap-x-2 gap-y-2 xl:px-0">
        //     <p className="font-poppins text-[#FFFFFF] text-[16px] leading-[24px]">
        //       Your account is not yet verified
        //     </p>
        //     <div className="flex items-center flex-nowrap">
        //       <EmailIcon width={21} height={17} fill="#fff" />
        //       <button
        //         className="font-poppins text-[#FFFFFF] text-[14px] leading-[21px] font-[700] ml-2"
        //         onClick={() => {
        //           onVerify()
        //             .then(() => {
        //               showAuthModal("verification-sent");
        //             })
        //             .catch(() => {});
        //         }}
        //         disabled={submissionLoading}
        //       >
        //         {submissionLoading
        //           ? "Sending..."
        //           : "Resend Verification Link Now"}
        //       </button>
        //     </div>
        //   </div>
        // </div>
      )}
    </>
  );
}
