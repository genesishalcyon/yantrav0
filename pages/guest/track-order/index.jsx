import guestStore from "@/lib/store/guestStore";
import { shallow } from "zustand/shallow";
import FormField from "@/components/ehasp/partials/forms/FormField";
import LoadingButton from "@/components/ehasp/partials/LoadingButton";
import AuthLayout from "@/components/ehasp/auth/AuthLayout";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
export default function TrackOrder() {
  const router = useRouter();
  const [
    trackOrderForm,
    trackOrderFormError,
    submissionLoading,
    onTrack,
    onChangeReference,
  ] = guestStore(
    (state) => [
      state.trackOrderForm,
      state.trackOrderFormError,
      state.submissionLoading,
      state.onTrack,
      state.onChangeReference,
    ],
    shallow
  );

  const onTrackTrigger = () => {
    onTrack()
      .then(() => {
        router.replace(`/guest/order?reference=${trackOrderForm.reference}`);
      })
      .catch(() => {
        toast.error("Invalid Order Reference.", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  return (
    <AuthLayout backgroundImage="/images/yantra1.webp">
      <div className="w-full h-auto max-w-[562px] border-[1px] rounded-[8px] py-16 bg-[#FFFFFF] custom-box-shadow flex justify-center items-center">
        <div className="flex flex-col gap-y-8 px-8">
          <h1 className="text-center font-poppins text-[#555555] text-[40px] leading-[60px] font-[600] tracking-[0.1em]">
            Track my Order
          </h1>
          <div className="max-w-[368px] w-full mx-auto">
            <FormField
              type="text"
              name="reference"
              placeholder="Order Number"
              className="p-2 border-[1px] border-[#bababa] rounded-lg w-full"
              value={trackOrderForm.reference}
              onChange={(e) =>
                onChangeReference({ reference: e?.target?.value })
              }
              onKeyDown={(e) => (e?.key === "Enter" ? onTrackTrigger() : null)}
              errors={trackOrderFormError}
              errortype="bordertext"
            />
          </div>
          <LoadingButton
            disabled={submissionLoading || !trackOrderForm.reference}
            onClick={onTrackTrigger}
            loading={submissionLoading}
            loadingColor="bg-[#315589]"
            label="Continue"
            labelLoading="Processing..."
            className={`max-w-[368px] w-full mx-auto inline-flex justify-center text-center bg-[#315589] font-poppins text-[#FFFFFF] text-[16px] leading-[24px] font-[600] p-2 rounded-[26px]`}
          />
        </div>
      </div>
    </AuthLayout>
  );
}
