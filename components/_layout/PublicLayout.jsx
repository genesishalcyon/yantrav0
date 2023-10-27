import globalState from "@/lib/store/globalState";
import PageLoading from "@/components/page/PageLoading";
import { Fragment } from "react";
export default function PublicLayout({ children }) {
  const ready = globalState((state) => state.ready);
  return <Fragment>{ready ? children : <PageLoading />}</Fragment>;
}
