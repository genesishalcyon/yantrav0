import { useRef } from "react";
import Image from "next/image";
import MEDIAAPI from "@/lib/api/media/request";
import UploadIcon from "@/components/svg/UploadIcon";
export default function MediaUpload({
  accept = "image/*",
  multiple = false,
  media = [],
  onAdd = () => {},
  onRemove = () => {},
  className = "w-full flex justify-center items-center h-[53px] gap-x-4 border-[1px] border-[#555555] rounded-[8px] font-poppins text-[#555555] text-[16px] leading-[23px] font-[600]",
}) {
  const mediaRef = useRef("");
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-wrap gap-3">
        {media.map((url, i) => (
          <div
            key={i}
            className="relative w-[100px] h-[100px] border-[1px] border-[#555555] rounded-[8px]"
          >
            <button
              className="absolute right-0 top-0 leading-[0px] z-10 font-bold -mr-[5px] -mt-[5px] text-white bg-[#D81B60] h-5 w-5 rounded-full"
              onClick={() => onRemove(i)}
            >
              &times;
            </button>

            <Image
              alt="Product Media"
              src={url}
              fill
              priority
              className="object-cover object-center"
            />
          </div>
        ))}
      </div>
      <div>
        <input
          accept={accept}
          type="file"
          className="hidden"
          multiple={multiple}
          onChange={(e) => {
            const chosenFiles = Array.prototype.slice.call(e.target.files);
            const formData = new FormData();
            chosenFiles.forEach((e, i) => {
              formData.append(`images[${i}]`, e);
            });
            if (chosenFiles.length) {
              MEDIAAPI.upload(formData).then((res) => {
                const newMedia = res.urls || [];
                const allMedia = [...media, ...newMedia];
                onAdd(allMedia);
              });
            }
          }}
          ref={mediaRef}
        />
        <button
          className={className}
          onClick={() => {
            mediaRef.current.click();
          }}
        >
          <UploadIcon />
          Upload Media
        </button>
      </div>
    </div>
  );
}
