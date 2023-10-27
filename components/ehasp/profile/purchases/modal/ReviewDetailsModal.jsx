import BaseModal from "@/components/ehasp/partials/BaseModal";
import StarRating from "@/components/ehasp/partials/StarRating";
import Image from "next/image";
import VideoPlayIcon from "@/components/svg/VideoPlayIcon";
import { useState } from "react";

export default function ReviewDetailsModal({ id, item }) {
  const { comment = "", rating = 0, media = [] } = item?.reviews || {};

  const renderThumbnail = ({ data }) => {
    if (data.mime_type.includes("image")) {
      return (
        <Image
          alt="Product Media"
          src={data.original_url || "/images/placeholder.webp"}
          fill
          priority
          className="object-cover object-center rounded-lg"
        />
      );
    } else if (data.mime_type.includes("video")) {
      return <VideoPlayIcon fill="#000" />;
    }
  };

  const [activeMedia, setActiveMedia] = useState(null);

  const renderMedia = (activeMedia) => {
    if (activeMedia?.mime_type?.includes("image")) {
      return (
        <div className="relative w-[75%] max-w-[968px] h-[264px] sm:h-[364px] md:h-[464px] lg:h-[600px]">
          <Image
            id={activeMedia?.id}
            alt={activeMedia?.name}
            src={activeMedia?.original_url || "/images/placeholder.webp"}
            fill
            priority
            className="object-cover object-center rounded-[8px]"
          />
        </div>
      );
    } else if (activeMedia?.mime_type?.includes("video")) {
      return (
        <div className="relative w-[75%] max-w-[968px] h-[264px] sm:h-[364px] md:h-[464px] lg:h-[600px] flex items-center">
          <video width="100%" height="100%" controls>
            <source src={activeMedia?.original_url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      );
    }
  };

  return (
    <BaseModal id={id} data={{ title: "Review Details" }}>
      <div className="relative overflow-auto p-4">
        <div className="flex flex-col gap-y-4">
          <StarRating
            length={5}
            rating={rating}
            disabled={true}
            color="#D81B60"
          />
          <div className="p-4 w-full h-[200px] border-[1px] border-[#D1D5DB] rounded-[8px] outline-none">
            <p className="text-[16px] leading-[23px]">{comment}</p>
          </div>
          <div className="flex flex-col gap-y-4">
            <div className="flex flex-wrap gap-3">
              {media.map((data, i) => (
                <div
                  key={i}
                  className="relative w-[100px] h-[100px] border-[1px] border-[cecece] rounded-lg cursor-pointer flex justify-center items-center"
                  onClick={() => setActiveMedia(i)}
                >
                  {renderThumbnail({ data })}
                </div>
              ))}
            </div>
          </div>
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
