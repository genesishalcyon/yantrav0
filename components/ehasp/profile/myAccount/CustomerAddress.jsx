import { Fragment } from "react";
import addressStore from "@/lib/store/addressStore";
import AddAddressIcon from "@/components/svg/AddAddressIcon";
import EditAddressIcon from "@/components/svg/EditAddressIcon";
import DeleteAddressIcon from "@/components/svg/DeleteAddressIcon";
import AddressModal from "@/components/ehasp/partials/address/AddressModal";
import Table from "@/components/ehasp/partials/table/Table";
import ConfirmButton from "@/components/ehasp/partials/confirm/ConfirmButton";
import ADDRESSAPI from "@/lib/api/address/request";
import { toast } from "react-toastify";
import ModalButton from "@/components/ehasp/partials/ModalButton";
import { deserialize } from "@/lib/services/globalService";
export default function CustomerAddress({}) {
  const { data, mutate: refetch } = ADDRESSAPI.getAddressesSwr(
    "?include=state.country",
    {
      revalidateOnFocus: false,
    }
  );
  const addresses = data ? deserialize(data) : [];
  const columns = [
    {
      name: "House/Unit/Flr #, Bldg Name, Blk or Lot #",
      dataIndex: "",
      slot: (data) => {
        return `${data?.address_line_1}`;
      },
    },
    {
      name: "City",
      dataIndex: "",
      slot: (data) => {
        return `${data?.city}`;
      },
      sortable: true,
    },
    {
      name: "State/Region",
      dataIndex: "",
      slot: (data) => {
        return `${data?.state?.name}`;
      },
      sortable: true,
    },
    {
      name: "Zip Code",
      dataIndex: "",
      slot: (data) => {
        return `${data?.zip_code}`;
      },
      sortable: true,
    },
    {
      name: "Country",
      dataIndex: "",
      slot: (data) => {
        return `${data?.state?.country?.code}`;
      },
      sortable: true,
    },
    {
      name: "Billing Address",
      dataIndex: "",
      slot: (data) => {
        return (
          <div className="radio-container">
            <input
              type="radio"
              name="billing"
              defaultChecked={data.is_default_billing}
              className="cursor-pointer"
              onChange={(e) => {
                if (e.target.checked) {
                  ADDRESSAPI.addressUpdateDefault(data.id, "set-billing").then(
                    () => {
                      refetch();
                      toast.success("Billing address updated!", {
                        position: toast.POSITION.TOP_RIGHT,
                      });
                    }
                  );
                }
              }}
            />
            <span className="checkmark"></span>
          </div>
        );
      },
    },
    {
      name: "Shipping Address",
      dataIndex: "",
      slot: (data) => {
        return (
          <div className="radio-container">
            <input
              type="radio"
              name="shipping"
              defaultChecked={data.is_default_shipping}
              className="cursor-pointer"
              onChange={(e) => {
                if (e.target.checked) {
                  ADDRESSAPI.addressUpdateDefault(data.id, "set-shipping").then(
                    () => {
                      refetch();
                      toast.success("Shipping address updated!", {
                        position: toast.POSITION.TOP_RIGHT,
                      });
                    }
                  );
                }
              }}
            />
            <span className="checkmark"></span>
          </div>
        );
      },
    },
    {
      name: "",
      dataIndex: "",
      slot: (data) => {
        return (
          <div className="flex gap-x-4 justify-end">
            <ModalButton
              id="address"
              className="flex flex-nowrap items-center gap-x-2 text-[#F05769] text-[14px] leading-[20px] font-[500]"
              onClick={() => {
                addressStore.setState({
                  activeAddress: data,
                  addressForm: {
                    address_line_1: data.address_line_1,
                    country_id: data?.state?.country?.id,
                    state_id: data?.state?.id,
                    city: data?.city,
                    zip_code: data?.zip_code,
                    label_as: data?.label_as,
                  },
                  formErrors: "",
                });
              }}
            >
              <EditAddressIcon />
              Edit
            </ModalButton>
            {data.is_default_shipping || data.is_default_billing ? (
              <div className="w-[70px]"></div>
            ) : (
              <ConfirmButton
                className="flex flex-nowrap items-center gap-x-2 text-[#F05769] text-[14px] leading-[20px] font-[500]"
                title="Are you sure?"
                onContinue={() => {
                  ADDRESSAPI.deleteAddress(data.id).then(() => {
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
            )}
          </div>
        );
      },
    },
  ];

  return (
    <Fragment>
      <div className="flex flex-col gap-y-8 px-4 py-5 md:px-8 md:py-7 rounded-[8px] bg-[#FFFFFF] border border-[#CBCBCB]">
        <div className="flex justify-between items-center">
          <p className="text-[#0A0903] text-[16px] leading-[27px] md:text-[18px] md:leading-[30px] font-[600]">
            My Addresses
          </p>
          <ModalButton
            id="address"
            className="flex flex-nowrap items-center gap-x-2 text-[#F05769] text-[12px] leading-[21px] md:text-[14px] md:leading-[24px]"
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
            Add New Address
          </ModalButton>
        </div>
        <div className="">
          <Table
            columns={columns}
            data={addresses}
            search={false}
            headerClassName=" text-[14px] leading-[20px] font-[500]"
          />
        </div>
      </div>
      <AddressModal id="address" refetch={refetch} />
    </Fragment>
  );
}
