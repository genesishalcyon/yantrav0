import AddressModalCheckout from "@/components/ehasp/checkout/address/AddressModalCheckout";
import ModalButton from "@/components/ehasp/partials/ModalButton";
import addressStore from "@/lib/store/addressStore";
import ADDRESSAPI from "@/lib/api/address/request";
import { deserialize } from "@/lib/services/globalService";
import { Fragment } from "react";
import { shallow } from "zustand/shallow";
import AddressModal from "@/components/ehasp/partials/address/AddressModal";
import persistentStore from "@/lib/store/persistentStore";
export default function AddressCheckout() {
  const [profile, shipping, billing] = persistentStore((state) => [
    state.profile,
    state.shipping,
    state.billing,
  ]);
  const { data: addresessHandler, mutate: reFetchAddress } =
    ADDRESSAPI.getAddressesSwr("?include=state.country", {
      render: profile,
      revalidateOnFocus: false,
      onSuccess: (res) => {
        const addresses = deserialize(res.data);
        const shipping = addresses.find((e) => e.is_default_shipping);
        const billing = addresses.find((e) => e.is_default_billing);
        addressStore.setState({
          defaultAddress: {
            shipping,
            billing,
          },
        });
      },
    });
  const addresses = addresessHandler ? deserialize(addresessHandler) : [];
  const [addressLabel, checkoutAddress, defaultAddress, addressForm] =
    addressStore(
      (state) => [
        state.addressLabel,
        state.checkoutAddress,
        state.defaultAddress,
        state.addressForm,
      ],
      shallow
    );

  const addressComp = [
    {
      id: "shipping",
      title: "Shipping Address",
      address: checkoutAddress.shipping || defaultAddress?.shipping || shipping,
    },
    {
      id: "billing",
      title: "Billing Address",
      address: checkoutAddress.billing || defaultAddress?.billing || billing,
    },
  ];

  return (
    <Fragment>
      <div className="flex flex-col gap-y-4">
        {addressComp.map((e, i) => (
          <div
            key={i}
            className="px-4 py-5 rounded-[8px] bg-[#FFFFFF] flex flex-col gap-y-5 border border-[#CBCBCB]"
          >
            <div className="flex justify-between">
              <p className="text-[#231F20] text-[16px] leading-[27px] font-[600]">
                {e.title}
              </p>
              <ModalButton
                id={profile ? "address-checkout" : "address"}
                className="text-[#F05769] text-[14px] leading-[23px]"
                onClick={() => {
                  if (profile) {
                    addressStore.setState({
                      modalType: "addressTable",
                      activeAddress: e.address,
                      dataHandler: e,
                    });
                  } else {
                    // Guest
                    addressStore.setState({
                      addressType: e.id,
                      addressForm:
                        e.id === "shipping"
                          ? shipping || addressForm
                          : billing || addressForm,
                    });
                  }
                }}
              >
                Edit
              </ModalButton>
            </div>
            <div>
              <p className="text-[16px] leading-[23px] text-[#555555]">
                {e?.address
                  ? addressLabel(e.address)
                  : `Add your ${e.id} address to continue checking out`}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Authenticated */}
      <AddressModalCheckout
        id="address-checkout"
        reFetchAddress={reFetchAddress}
        addresses={addresses}
      />
      {/* Guest */}
      <AddressModal id="address" />
    </Fragment>
  );
}
