import orderStore from "@/lib/store/orderStore";
import BaseModal from "@/components/ehasp/partials/BaseModal";
import StarRating from "@/components/ehasp/partials/StarRating";
import { shallow } from "zustand/shallow";
import MediaUploadCustom from "@/components/ehasp/partials/MediaUploadCustom";
import { useRef, useState } from "react";
const { toast } = await import("react-toastify");
import LoadingButton from "@/components/ehasp/partials/LoadingButton";
import REVIEWAPI from "@/lib/api/review/request";
import formStore from "@/lib/store/formStore";
export default function ReviewFormModal({ id, item, callback = () => {} }) {
  const ref = useRef();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const uploading = formStore((state) => state.uploading);
  const [reviewForm, reviewOnChange] = orderStore(
    (state) => [state.reviewForm, state.reviewOnChange],
    shallow
  );
  const triggerOnReview = () => {
    setErrors([]);
    const { media } = reviewForm;
    delete reviewForm.media;
    const payload = {
      ...reviewForm,
      order_line_id: item.id,
      media: media?.map((n) => n.src),
    };
    setLoading(true);
    REVIEWAPI.addReview(payload)
      .then(() => {
        toast.success("Review added!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        ref.current.click();
        orderStore.setState({
          reviewForm: {
            rating: 5,
            comment: "",
            media: [],
            product_id: "",
            order_id: "",
            order_line_id: "",
            is_anonymous: true,
            data: [],
          },
        });
        setLoading(false);
        callback();
      })
      .catch((err) => {
        setErrors([err.data.message]);
        setLoading(false);
      });
  };

  return (
    <BaseModal id={id} data={{ title: "Create Product Review" }}>
      <div className="relative overflow-auto p-4">
        <div className="flex flex-col gap-y-4">
          {errors?.length > 0 && (
            <div className="bg-[#FFF1F2] rounded-full px-6 py-4">
              {errors?.map((err, i) => (
                <p
                  key={i}
                  className="text-[#B4173A] text-[16px] leading-[23px]"
                >
                  {err}
                </p>
              ))}
            </div>
          )}
          <StarRating
            length={5}
            rating={reviewForm.rating}
            color="#D81B60"
            onClick={(value) => reviewOnChange({ rating: value })}
          />
          <textarea
            placeholder="What do you think of this product?"
            value={reviewForm?.comment || ""}
            onChange={(e) => reviewOnChange({ comment: e?.target?.value })}
            className="p-4 w-full h-[200px] border-[1px] border-[#D1D5DB] rounded-[8px] outline-none"
          ></textarea>
          <MediaUploadCustom
            accept="image/*,video/*"
            multiple={true}
            media={reviewForm?.media || []}
            className="w-full flex justify-center items-center h-[53px] gap-x-4 border-[1px] border-[#D1D5DB] rounded-[8px] text-[16px] leading-[23px] font-[600]"
            onAdd={(allMedia) => {
              reviewOnChange({ media: allMedia });
            }}
            onRemove={(index) => {
              const allMedia = remarksForm.media;
              const currentMedia = allMedia.filter((_, i) => index !== i);
              reviewOnChange({ media: currentMedia });
            }}
          />
        </div>
      </div>
      <div className="px-4 py-5 mt-auto flex justify-center md:justify-start gap-x-4 text-[#FFFFFF] text-[14px] leading-[20px] font-[500]">
        <LoadingButton
          onClick={triggerOnReview}
          loading={loading}
          loadingColor="bg-[#315589]"
          label="Save"
          labelLoading="Processing..."
          disabled={uploading}
          className="flex justify-center items-center bg-[#315589] py-[14px] md:py-[8px] px-[16px] rounded-[26px] w-full max-w-[190px] md:w-auto md:max-w-auto"
        />

        <button
          ref={ref}
          className="flex justify-center items-center bg-[#EE3424] py-[14px] md:py-[8px] px-[16px] rounded-[26px] w-full max-w-[190px] md:w-auto md:max-w-auto"
          data-te-modal-dismiss
          aria-label="Close"
        >
          Close
        </button>
      </div>
    </BaseModal>
  );
}
