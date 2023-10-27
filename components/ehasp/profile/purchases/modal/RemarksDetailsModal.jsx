import BaseModal from "@/components/ehasp/partials/BaseModal";
import Image from "next/image";
import VideoPlayIcon from "@/components/svg/VideoPlayIcon";
import { useState } from "react";
export default function RemarksDetailsModal({ id, item = {} }) {
  const remarks = item.remarks;
  const media = remarks?.media || [];

  const MediaDisplay = ({ file }) => {
    const { type, original_url } = file;
    if (type.includes("image")) {
      return (
        <div className="relative w-[174px] h-[174px]">
          <Image
            alt="Product Media"
            src={original_url || "/images/placeholder.webp"}
            fill
            className="object-cover object-center rounded-lg"
          />
        </div>
      );
    } else if (type.includes("video")) {
      return (
        <div className="m-auto w-[174px] h-[174px] flex justify-center items-center border-[1px] border-[#555555] rounded-lg">
          <VideoPlayIcon fill="#000" />
        </div>
      );
    }
    return "Unable to display";
  };

  const [activeMedia, setActiveMedia] = useState(null);

  const renderMedia = (activeMedia) => {
    if (activeMedia?.attributes?.type?.includes("image")) {
      return (
        <div className="relative w-[75%] max-w-[968px] h-[264px] sm:h-[364px] md:h-[464px] lg:h-[600px]">
          <Image
            id={activeMedia?.id}
            alt={activeMedia?.attributes?.file_name}
            src={
              activeMedia?.attributes?.original_url ||
              "/images/placeholder.webp"
            }
            fill
            priority
            className="object-cover object-center rounded-[8px]"
          />
        </div>
      );
    } else if (activeMedia?.attributes?.type?.includes("video")) {
      return (
        <div className="relative w-[75%] max-w-[968px] h-[264px] sm:h-[364px] md:h-[464px] lg:h-[600px] flex items-center">
          <video width="100%" height="100%" controls>
            <source
              src={activeMedia?.attributes?.original_url}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      );
    }
  };

  return (
    <BaseModal id={id} data={{ title: "View Remarks" }}>
      <div className="relative overflow-auto p-4 flex flex-col gap-y-6 text-[16px] leading-[23px]">
        <div className="flex flex-col gap-y-2">
          <p>Remarks</p>
          <p className="border-[1px] border-[#555555] rounded-[8px] p-4">
            {remarks?.data?.notes || "N/A"}
          </p>
        </div>

        <div className="flex flex-col gap-y-2">
          <p>Media</p>
          {media?.length === 0 ? (
            <p>No media attached.</p>
          ) : (
            <div className="flex flex-wrap gap-3">
              {media?.map((file, i) => (
                <div key={i} onClick={() => setActiveMedia(i)}>
                  <MediaDisplay file={file?.attributes} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div
        className={`${
          activeMedia !== null ? "visible" : "hidden"
        } transition-all duration-300 ease-in-out fixed top-0 left-0 w-full h-full bg-[#1f1f1ff5] flex justify-center items-center cursor-pointer`}
        onClick={() => setActiveMedia(null)}
      >
        {renderMedia(media[activeMedia])}
      </div>
    </BaseModal>
  );
}
