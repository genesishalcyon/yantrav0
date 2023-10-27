import globalState from "@/lib/store/globalState";
import PageLoading from "@/components/page/PageLoading";
import { Fragment, useEffect } from "react";
import { useRouter } from "next/router";
export default function GuestLayout({ children, auth, authenticating }) {
  const router = useRouter();
  const ready = globalState((state) => state.ready);
  useEffect(() => {
    if (auth) router.replace("/");
  }, [auth, router]);
  return (
    <Fragment>
      {ready ? auth || authenticating ? <PageLoading /> : children : ""}
    </Fragment>
  );
}
