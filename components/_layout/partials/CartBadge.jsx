import CartIcon from "@/components/svg/CartIcon";
import cartStore from "@/lib/store/cartStore";
import CARTAPI from "@/lib/api/cart/request";
// import notificationStore from "@/lib/store/notificationStore";
// import NOTIFICATIONAPI from "@/lib/api/notification/request";
import Link from "next/link";

const GUEST_FEATURE = process.env.NEXT_PUBLIC_GUEST_FEATURE;

const CartBadge = ({ profile }) => {
  const { data: cartCount, mutate: reCount } = CARTAPI.countCartItemsSwr({
    render: profile || GUEST_FEATURE === "true",
    revalidateOnFocus: false,
    onSuccess: () => {
      cartStore.setState({ reCount });
    },
  });

  // const { data: notificationCount, mutate: reCountNotification } =
  //   NOTIFICATIONAPI.countNotificationsSwr({
  //     render: profile,
  //     revalidateOnFocus: false,
  //     onSuccess: () => {
  //       notificationStore.setState({ reCountNotification });
  //     },
  //   });

  return (
    <>
      {GUEST_FEATURE === "true" ? (
        <>
          {!!cartCount?.cartCount && (
            <span className="absolute -mt-5 ml-3 rounded-[0.37rem] bg-danger px-[0.45em] py-[0.2em] text-[0.6rem] leading-none text-white">
              {cartCount.cartCount}
            </span>
          )}
        </>
      ) : (
        <>
          {!!cartCount?.cartCount && (
            <span className="absolute -mt-5 ml-3 rounded-[0.37rem] bg-danger px-[0.45em] py-[0.2em] text-[0.6rem] leading-none text-white">
              {cartCount.cartCount}
            </span>
          )}
        </>
      )}
    </>
  );
};

export default CartBadge;
