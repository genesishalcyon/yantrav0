import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { useState } from "react";
import ImageMagnifier from "@/components/ehasp/partials/ImageMagnifier";
import ProductFlag from "@/components/ehasp/product/partials/ProductFlag";
// import productStore from "@/lib/store/productStore";
import VideoPlayIcon from "@/components/svg/VideoPlayIcon";
export default function ProductMedia({ item = {} }) {
  // const totalReviews = productStore((state) => state.totalReviews);
  const [activeMedia, setActiveMedia] = useState(item?.media[0]);
  const [isVisible, setIsVisible] = useState(true);
  const media = item?.media;
  const length = media.length;
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: length < 4 ? length : 4,
    slidesToScroll: 1,
  };

  const renderMedia = () => {
    switch (activeMedia?.type) {
      case "image":
        return (
          <ImageMagnifier
            id="product-image"
            width={500}
            height={400}
            magnifierSize={170}
          >
            <div className="relative w-full h-[364px] sm:h-[464px] md:h-[564px] lg:h-[600px] cursor-zoom-in">
              <Image
                id="product-image"
                alt="Product Media"
                src={
                  activeMedia?.original_url ||
                  media[0]?.original_url ||
                  "/images/placeholder.webp"
                }
                fill
                priority
                className="object-cover object-center rounded-[8px]"
              />
              <ProductFlag item={item} />
            </div>
          </ImageMagnifier>
        );
      case "video":
        return (
          <div className="relative w-full h-[600px] xl:h-[600px] flex items-center bg-black">
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
            className="h-[87px] relative cursor-pointer"
            onClick={() => {
              setActiveMedia(data);
            }}
          >
            <Image
              alt="Product Media"
              src={data?.original_url || "/images/placeholder.webp"}
              fill
              priority
              className={`object-cover object-center rounded-[8px] w-full ${
                activeMedia?.original_url === data?.original_url ||
                (!activeMedia && i === 0)
                  ? ""
                  : "opacity-50"
              }`}
            />
          </div>
        );
      case "video":
        return (
          <div
            className="h-[87px] relative cursor-pointer flex justify-center items-center"
            onClick={() => {
              setIsVisible(false);
              setTimeout(() => {
                setIsVisible(true);
              }, 1);
              setActiveMedia(data);
            }}
          >
            <VideoPlayIcon
              fill={
                activeMedia?.original_url === data?.original_url ||
                (!activeMedia && i === 0)
                  ? "#000"
                  : "#AAA"
              }
            />
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col gap-y-4 md:p-6">
      {isVisible ? (
        renderMedia()
      ) : (
        <span className="w-full h-[364px] sm:h-[464px] md:h-[564px] lg:h-[600px]"></span>
      )}
      <Slider className="product-media" {...settings}>
        {media.map((data, i) => (
          <div key={i} className="p-2">
            {renderThumbnail({ data, i })}
          </div>
        ))}
      </Slider>
      {/* <div className="flex gap-x-4 font-poppins text-[#555555] text-[16px] leading-[23px]">
        <p>{`${totalReviews} Review${totalReviews > 1 ? "s" : ""}`}</p> |
        <p>{item.total_sold} Sold</p>
      </div> */}
    </div>
  );
}
