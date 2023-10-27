import Layout from "@/components/ehasp/profile/Layout";
import RecommendedProducts from "@/components/ehasp/product/partials/RecommendedProducts";
import PurchaseDetails from "@/components/ehasp/profile/purchases/PurchaseDetails";
import PurchaseList from "@/components/ehasp/profile/purchases/PurchaseList";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Purchases({}) {
  const router = useRouter();
  const [displayType, setDisplayType] = useState("");
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const reference = urlParams.get("reference");
    setDisplayType(reference || "table");
  }, [router]);

  return (
    <>
      <Layout>
        <div>
          {displayType === "table" && <PurchaseList />}
          {displayType && displayType !== "table" && <PurchaseDetails />}
        </div>
      </Layout>
      {/* <RecommendedProducts /> */}
    </>
  );
}
