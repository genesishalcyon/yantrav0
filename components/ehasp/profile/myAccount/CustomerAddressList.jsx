import { Fragment } from "react";
import addressStore from "@/lib/store/addressStore";
import AddAddressIcon from "@/components/svg/AddAddressIcon";
import AddressModal from "@/components/ehasp/partials/address/AddressModal";
import ModalButton from "@/components/ehasp/partials/ModalButton";
import HomeAddressIcon from "@/components/svg/HomeAddressIcon";
import OfficeAddressIcon from "@/components/svg/OfficeAddressIcon";
import ConfirmButton from "@/components/ehasp/partials/confirm/ConfirmButton";
import ADDRESSAPI from "@/lib/api/address/request";
import EditAddressIcon from "@/components/svg/EditAddressIcon";
import DeleteAddressIcon from "@/components/svg/DeleteAddressIcon";
import Radio from "@/components/svg/Radio";
const { toast } = await import("react-toastify");
import { deserialize } from "@/lib/services/globalService";
export default function CustomerAddressList({}) {
  const { data, mutate: refetch } = ADDRESSAPI.getAddressesSwr(
    "?include=state.country&sort=-id",
    {
      revalidateOnFocus: false,
    }
  );
  const addresses = data ? deserialize(data) : [];

  return (
    <Fragment>
      <div className="flex flex-col gap-y-8 px-4 py-5 md:px-8 md:py-7 rounded-[8px] bg-[#FFFFFF] border border-[#CBCBCB]">
        <div className="flex justify-between items-center">
          <p className="text-[#0A0903] text-[16px] leading-[27px] md:text-[18px] md:leading-[30px] font-[600]">
            My Address
          </p>
          <ModalButton
            id="address"
            className="flex flex-nowrap items-center gap-x-2 text-[#F05769] leading-[21px] text-[14px] md:leading-[24px]"
            onClick={() => {
              addressStore.setState({
                activeAddress: "",
                addressForm: {
                  address_line_1: "",
                  country_id: "",
                  state_id: "",
                  city: "",
                  zip_code: "",
                  is_default_billing: false,
                  is_default_shipping: false,
                  label_as: "home",
                },
                formErrors: "",
              });
            }}
          >
            <AddAddressIcon />
            <span className="hidden 2sm:block">Add New Address</span>
          </ModalButton>
        </div>
        <div className="flex flex-col gap-y-4">
          {addresses.map((address) => (
            <div
              key={address?.id}
              className="p-4 border-[1px] border-[#E5E7EB] rounded-[8px] text-[14px] leading-[20px] md:text-[16px] md:leading-[23px]"
            >
              <div className="flex flex-col gap-y-6">
                <div className="flex justify-between items-center gap-x-4">
                  <div className="flex items-center gap-x-2">
                    {address.label_as === "home" ? (
                      <HomeAddressIcon fill="#0F172A" />
                    ) : (
                      <OfficeAddressIcon />
                    )}
                    <p className="capitalize">{address.label_as}</p>
                  </div>
                  <div className="flex items-center gap-x-4">
                    <ModalButton
                      id="address"
                      className="flex flex-nowrap items-center gap-x-2 text-[#F05769] text-[14px] leading-[20px] font-[500]"
                      onClick={() => {
                        addressStore.setState({
                          activeAddress: address,
                          addressForm: {
                            address_line_1: address.address_line_1,
                            country_id: address?.state?.country?.id,
                            state_id: address?.state?.id,
                            city: address?.city,
                            zip_code: address?.zip_code,
                            label_as: address?.label_as,
                          },
                          formErrors: "",
                        });
                      }}
                    >
                      <EditAddressIcon />
                      Edit
                    </ModalButton>
                    <ConfirmButton
                      className="flex flex-nowrap items-center gap-x-2 text-[#F05769] text-[14px] leading-[20px] font-[500]"
                      title="Are you sure?"
                      onContinue={() => {
                        ADDRESSAPI.deleteAddress(address.id).then(() => {
                          refetch();
                          toast.success("Address successfully deleted!", {
                            position: toast.POSITION.TOP_RIGHT,
                          });
                        });
                      }}
                    >
                      <DeleteAddressIcon fill="#F05769" />
                      Delete
                    </ConfirmButton>
                  </div>
                </div>
                <div className="flex flex-col gap-y-1">
                  <p className="text-[14px] text-[#B1B1B1] leading-[20px] font-[500]">{`House/Unit/Flr #, Bldg Name, Blk or Lot #`}</p>
                  <p className="text-[14px] md:text-[16px] leading-[24px] font-[400]">
                    {`${address?.address_line_1}, ${address?.city}, ${address?.state?.name}, ${address?.zip_code}, ${address?.state?.country?.code}`}
                  </p>
                </div>
                <div className="flex flex-col 2sm:flex-row justify-start gap-x-6">
                  <div className="flex items-center gap-x-2">
                    <div className="leading-3">
                      {address.is_default_billing ? (
                        <div className="w-[16px] h-[16px] rounded-full border-[5px] border-[#315589]"></div>
                      ) : (
                        <ConfirmButton
                          title="Are you sure?"
                          onContinue={() => {
                            ADDRESSAPI.addressUpdateDefault(
                              address.id,
                              "set-billing"
                            ).then(() => {
                              refetch();
                              toast.success("Billing address updated!", {
                                position: toast.POSITION.TOP_RIGHT,
                              });
                            });
                          }}
                        >
                          <Radio />
                        </ConfirmButton>
                      )}
                    </div>
                    <p>Billing Address</p>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <div className="leading-3">
                      {address.is_default_shipping ? (
                        <div className="w-[16px] h-[16px] rounded-full border-[5px] border-[#315589]"></div>
                      ) : (
                        <ConfirmButton
                          title="Are you sure?"
                          onContinue={() => {
                            ADDRESSAPI.addressUpdateDefault(
                              address.id,
                              "set-shipping"
                            ).then(() => {
                              refetch();
                              toast.success("Shipping address updated!", {
                                position: toast.POSITION.TOP_RIGHT,
                              });
                            });
                          }}
                        >
                          <Radio />
                        </ConfirmButton>
                      )}
                    </div>
                    <p>Shipping Address</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <AddressModal id="address" refetch={refetch} />
    </Fragment>
  );
}
