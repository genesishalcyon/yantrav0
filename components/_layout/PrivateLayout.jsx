import globalState from "@/lib/store/globalState";
import PageLoading from "@/components/page/PageLoading";
import { Fragment, useEffect } from "react";
import { useRouter } from "next/router";
export default function PrivateLayout({ children, auth, authenticating }) {
  const ready = globalState((state) => state.ready);
  const router = useRouter();
  useEffect(() => {
    if (!authenticating) {
      if (!auth) router.replace("/");
    }
  }, [auth, router, authenticating]);
  return <Fragment>{ready ? !auth ? <PageLoading /> : children : ""}</Fragment>;
}
