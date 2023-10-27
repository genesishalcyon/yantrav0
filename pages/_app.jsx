// import "tw-elements/dist/css/tw-elements.min.css";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/globals.css";
import "@/styles/customs.css";
import DefaultLayout from "@/components/_layout/DefaultLayout";
import GuestLayout from "@/layout/GuestLayout";
// import PublicLayout from "@/layout/PublicLayout";
import PrivateLayout from "@/layout/PrivateLayout";
import globalState from "@/lib/store/globalState";
import CUSTOMERAPI from "@/lib/api/customer/request";
import persistentStore from "@/lib/store/persistentStore";
import accountStore from "@/lib/store/accountStore";
import { privateRoutes, guestRoutes } from "@/lib/constant/urls";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { deserialize, auth as hasToken } from "@/lib/services/globalService";
import AUTHAPI from "@/lib/api/auth/request";
export default function App({ Component, pageProps }) {
  const router = useRouter();
  const profile = persistentStore((state) => state.profile);
  const {
    data: auth,
    isValidating: authenticating,
    mutate: refetchAuth,
  } = CUSTOMERAPI.getProfileSwr("", {
    render: profile || (hasToken && !profile),
    onSuccess: (res) => {
      const profile = deserialize(res.data);
      persistentStore.setState({ profile });
    },
    onError: (err) => {
      if (err?.status === 401) {
        AUTHAPI.logout().then(() => {
          router.replace("/");
        });
        // globalState.setState({ sessionExpired: true });
      }
    },
  });
  const account = auth ? deserialize(auth) : {};
  accountStore.setState({ refetchAuth, account });

  useEffect(() => {
    globalState.setState({ ready: true });
    const handleInteraction = () => {
      globalState.setState({
        showLazy: true,
      });
    };
    document.addEventListener("scroll", handleInteraction, { passive: true });
    document.addEventListener("mousemove", handleInteraction, {
      passive: true,
    });
    document.addEventListener("touchstart", handleInteraction, {
      passive: true,
    });
  }, []);

  // Authenticated Pages
  if (privateRoutes.some((e) => e === router.pathname)) {
    return (
      <PrivateLayout auth={auth} authenticating={authenticating}>
        <DefaultLayout account={account}>
          <Component {...pageProps} />
        </DefaultLayout>
      </PrivateLayout>
    );
  }
  // Guest Pages
  if (guestRoutes.some((e) => e === router.pathname)) {
    return (
      <GuestLayout auth={auth} authenticating={authenticating}>
        <DefaultLayout account={account}>
          <Component {...pageProps} />
        </DefaultLayout>
      </GuestLayout>
    );
  }
  // Public Pages
  return (
    //<PublicLayout>
    <DefaultLayout account={account}>
      <Component {...pageProps} />
    </DefaultLayout>
    //</PublicLayout>
  );
}
