import { useState } from "react";
import Image from "next/image";
import QuotationMarkStartIcon from "@/components/svg/QuotationMarkStartIcon";
import QuotationMarkEndIcon from "@/components/svg/QuotationMarkEndIcon";
export default function CarouselFade({ items }) {
  const [activeItem, setActiveItem] = useState(0);

  const onSlide = async (n) => {
    let newActiveItem;
    if (n === "next") {
      newActiveItem = activeItem + 1;
    } else if (n === "previous") {
      newActiveItem = activeItem - 1;
    }

    let slider = document.getElementById("custom-slider");

    const sliderContainerWidth = slider.offsetWidth;
    const sliderChildrenWidth = slider.children[0].offsetWidth;
    const sliderChildrenMargin =
      (sliderContainerWidth - slider.children[0].offsetWidth * items.length) /
      items.length;

    const baseTranslateX = 0;
    const adjustTranslateX =
      ((sliderChildrenWidth + sliderChildrenMargin) / sliderContainerWidth) *
      100;
    const translateX = baseTranslateX - adjustTranslateX * newActiveItem;

    setActiveItem(newActiveItem);
    slider.style.transform = `translateX(${translateX}%)`;
  };

  return (
    <>
      <div className="relative w-full h-[380px] my-4 overflow-x-hidden whitespace-nowrap">
        <div
          id="custom-slider"
          className="w-fit transition-transform duration-700 ease-out "
        >
          {items.map((item, i) => (
            <div
              key={i}
              className={`relative inline-block w-[309px] lg:w-[950px] h-[361px] mx-[10px] my-2 shadow-[0_0_10px_0px_rgba(0,0,0,0.25)] rounded-lg`}
            >
              <div className="h-full flex flex-col justify-center items-center px-8 md:px-20 font-poppins text-[#555555] text-[14px] md:text-[16px] leading-[23px]">
                <div className="relative w-[126px] h-[126px]">
                  <Image
                    alt=""
                    src={item.avatar}
                    fill
                    className="object-cover object-center rounded-lg"
                  />
                </div>
                <div className="relative my-8">
                  <div className="absolute top-[-40px] left-[-20px]">
                    <QuotationMarkStartIcon />
                  </div>
                  <p className="text-center whitespace-normal line-clamp-3">
                    {item.message}
                  </p>
                  <div className="absolute bottom-[-40px] right-[-20px]">
                    <QuotationMarkEndIcon />
                  </div>
                </div>
                <p className="font-[700] mb-2">{item.name}</p>
                <p className="font-[300] italic">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="max-w-xl m-auto mt-4 flex justify-end gap-x-12 px-4 xl:px-0">
        <button onClick={() => onSlide("previous")} disabled={activeItem === 0}>
          <svg
            width="14"
            height="25"
            viewBox="0 0 14 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.438661 13.56C-0.14622 12.9744 -0.14622 12.0257 0.438661 11.44L11.4246 0.440022C12.01 -0.146141 12.9597 -0.146749 13.5459 0.438664C14.1321 1.02407 14.1327 1.97382 13.5473 2.55998L3.61996 12.5L13.5473 22.44C14.1327 23.0262 14.1321 23.9759 13.5459 24.5613C12.9597 25.1468 12.01 25.1461 11.4246 24.56L0.438661 13.56Z"
              fill="#D81B60"
            />
          </svg>
        </button>
        <button
          onClick={() => onSlide("next")}
          disabled={activeItem === items.length - 1}
        >
          <svg
            width="14"
            height="25"
            viewBox="0 0 14 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M13.5472 11.44C14.1321 12.0256 14.1321 12.9743 13.5472 13.56L2.56126 24.56C1.97585 25.1461 1.0261 25.1467 0.439942 24.5613C-0.146219 23.9759 -0.146828 23.0262 0.438584 22.44L10.3659 12.5L0.438585 2.55998C-0.146827 1.97382 -0.146218 1.02407 0.439943 0.43866C1.0261 -0.146751 1.97585 -0.146143 2.56126 0.440019L13.5472 11.44Z"
              fill="#D81B60"
            />
          </svg>
        </button>
      </div>
    </>
  );
}
