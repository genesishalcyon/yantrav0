import Image from "next/image";
import BankTransferIcon from "@/components/svg/BankTransferIcon";
import ChevronIcon from "@/components/svg/ChevronIcon";
import SideBarButton from "@/components/ehasp/partials/SideBar/SideBarButton";
import globalState from "@/lib/store/globalState";
import checkoutStore from "@/lib/store/checkoutStore";
import SHIPPINGMETHODAPI from "@/lib/api/shippingMethod/request";
import { deserialize, convertOrdinal } from "@/lib/services/globalService";
import { Fragment, useEffect, useMemo } from "react";
import addressStore from "@/lib/store/addressStore";
import { shallow } from "zustand/shallow";
import { useRouter } from "next/router";
import persistentStore from "@/lib/store/persistentStore";
export default function ShippingMethodButton({ items }) {
  const router = useRouter();
  const [profile, guestShipping] = persistentStore(
    (state) => [state.profile, state.shipping],
    shallow
  );
  const cart_line_ids = items?.map((e) => e.id).join(",") || "";
  const [
    shippingMethods,
    shippingMethod,
    serviceMethod,
    fetchRates,
    getShippingRates,
    postShippingRates,
  ] = checkoutStore(
    (state) => [
      state.shippingMethods,
      state.shippingMethod,
      state.serviceMethod,
      state.fetchRates,
      state.getShippingRates,
      state.postShippingRates,
    ],
    shallow
  );

  const { data } = SHIPPINGMETHODAPI.getShippingMethodSwr("", {
    revalidateOnFocus: false,
    onSuccess: (res) => {
      const methods = deserialize(res.data);
      checkoutStore.setState({
        shippingMethods: methods,
      });
    },
  });

  const selectedMethod = useMemo(() => {
    return shippingMethods.find((e) => e.id === shippingMethod);
  }, [shippingMethod, shippingMethods]);

  const [defaultAddress, checkoutAddress] = addressStore((state) => [
    state.defaultAddress,
    state.checkoutAddress,
  ]);
  const shippingAddress = checkoutAddress.shipping || defaultAddress?.shipping;
  const guestShippingString = JSON.stringify(guestShipping);
  const isDisabled = !profile ? !guestShipping : false;
  useEffect(() => {
    if (data && fetchRates && cart_line_ids) {
      const methods = data?.data || [];
      methods.forEach((method) => {
        // Reset Shipping Data
        checkoutStore.setState({
          [method.attributes.driver.replace(/-/g, "")]: "",
          [`${method.attributes.driver.replace(/-/g, "")}Error`]: "",
        });
        if (profile && shippingAddress?.id) {
          getShippingRates(method, shippingAddress, cart_line_ids);
        } else if (guestShipping) {
          postShippingRates(method, cart_line_ids, guestShipping);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    data,
    shippingAddress?.id,
    guestShippingString,
    fetchRates,
    cart_line_ids,
  ]);

  useEffect(() => {
    // Reset Selections
    checkoutStore.setState({
      fetchRates: false,
      paymentMethod: "",
      shippingMethod: "",
      serviceMethod: "",
      shippingMethodHandler: "",
      serviceMethodHandler: "",
    });
  }, [router]);

  const RenderRate = () => {
    switch (selectedMethod.driver) {
      case "ups":
      case "usps":
        return (
          <Fragment>
            {serviceMethod.local
              ? `$${serviceMethod.postage}`
              : `${serviceMethod?.order}${convertOrdinal(
                  serviceMethod?.order
                )} Rate - $${serviceMethod.postage}`}
          </Fragment>
        );
      case "auspost":
        return (
          <Fragment>
            {serviceMethod?.name} - {serviceMethod?.price}
          </Fragment>
        );
      case "store-pickup":
        return "No Fee";
    }
  };

  const RenderIcon = () => {
    switch (selectedMethod?.driver) {
      case "ups":
        return (
          <Image alt="" src="/images/ups_icon.png" width={86} height={48} />
        );
      case "usps":
        return (
          <Image alt="" src="/images/usps_icon.jpg" width={52} height={43} />
        );
      case "auspost":
        return (
          <Image
            alt=""
            src="/images/australia_post_icon.png"
            width={55}
            height={48}
          />
        );
      case "store-pickup":
        return (
          <Image
            alt=""
            src="/images/store_pickup_icon.png"
            width={48}
            height={48}
          />
        );
    }
  };

  return (
    <SideBarButton
      className="px-4"
      onMouseEnter={() => {
        checkoutStore.setState({
          shippingMethodHandler: shippingMethod,
          serviceMethodHandler: serviceMethod,
          fetchRates: true,
        });
      }}
      disabled={isDisabled}
      onClick={() => {
        globalState.setState({
          sidebar: {
            open: true,
            type: "shipping",
            title: "Select Shipping Method",
          },
        });
      }}
    >
      <div
        className={`${
          isDisabled && "cursor-not-allowed opacity-50"
        } flex justify-between items-center max-h-[80px] px-4 py-10 border-[1px] border-[#D9D9D9] rounded-[8px] font-poppins text-[14px] leading-[23px]`}
      >
        {selectedMethod ? (
          <div className="flex items-center gap-x-4">
            <RenderIcon />
            <div className="flex flex-col items-start gap-y-1">
              <p className="font-[500] uppercase">{selectedMethod?.name}</p>
              <p className="text-[14px]">
                <RenderRate />
              </p>
            </div>
          </div>
        ) : (
          <p className="text-[#315589]">Select Shipping Method</p>
        )}
        <ChevronIcon />
      </div>
    </SideBarButton>
  );
}
