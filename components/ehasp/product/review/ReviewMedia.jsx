import ImageMagnifier from "@/components/ehasp/partials/ImageMagnifier";
import Image from "next/image";
import VideoPlayIcon from "@/components/svg/VideoPlayIcon";
import { useState } from "react";
export default function ReviewMedia({ media }) {
  const [activeMedia, setActiveMedia] = useState();

  const renderMedia = () => {
    switch (activeMedia?.type) {
      case "image":
        return (
          <ImageMagnifier
            id={activeMedia.id}
            width={500}
            height={400}
            magnifierSize={170}
          >
            <div className="relative w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] cursor-zoom-in">
              <Image
                id={activeMedia.id}
                alt="Product Media"
                src={activeMedia?.original_url || "/images/placeholder.webp"}
                fill
                priority
                className="object-cover object-center"
              />
            </div>
          </ImageMagnifier>
        );
      case "video":
        return (
          <div className="relative w-[400px] h-[400px] flex items-center bg-black">
            <video width="100%" height="100%" controls>
              <source src={activeMedia?.original_url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        );
    }
  };

  const renderThumbnail = ({ data, i }) => {
    switch (data?.type) {
      case "image":
        return (
          <div
            className={`relative w-[84px] h-[84px] rounded-lg cursor-pointer flex justify-center items-center border-[2px] ${
              activeMedia?.id === data?.id
                ? "border-[#EE3424]"
                : "border-transparent"
            }`}
          >
            <Image
              alt="image-review"
              src={data?.original_url || "/images/placeholder.webp"}
              fill
              priority
              className="object-cover object-center rounded-lg p-[1px]"
            />
          </div>
        );
      case "video":
        return (
          <div
            className={`relative w-[80px] h-[80px] rounded-lg cursor-pointer flex justify-center items-center border-[2px] ${
              activeMedia?.id === data?.id
                ? "border-[#EE3424]"
                : "border-[cecece]"
            }`}
          >
            <VideoPlayIcon fill="#000" />
          </div>
        );
    }
  };
  return (
    <>
      <div className="flex gap-x-3">
        {media?.map((data, i) => (
          <div
            key={i}
            onClick={() => {
              setActiveMedia((prev) => (prev?.id !== data?.id ? data : null));
            }}
          >
            {renderThumbnail({ data })}
          </div>
        ))}
      </div>
      {activeMedia && <div className="flex">{renderMedia()}</div>}
    </>
  );
}
