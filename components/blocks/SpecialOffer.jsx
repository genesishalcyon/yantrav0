import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import initializeLazyLoading from "@/lib/services/initializeLazyLoading";

export default function Block({ block }) {
  const { title, button_label, button_link, custom_data } = block?.main;

  const router = useRouter();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth > 767);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    initializeLazyLoading();
  }, []);

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, []);

  return (
    <div
      className="relative w-full pb-10 pt-10 md:py-16 bg-[#FFFFFF] z-10 "
      id="special-offer"
    >
      <div className="flex flex-col max-w-xl px-4 m-auto xl:px-0 font-poppins">
        <p className="text-[#0A0903] text-center xl:text-start text-[28px] leading-[42px] md:text-[35px] md:leading-[52px] font-[700] mb-10 tracking-[1.75px]">
          {title}
        </p>
        {isLoading ? (
          <>
            <div className="grid w-full grid-cols-2 md:grid-cols-3 gap-x-10 xl:gap-x-5 gap-y-6">
              {custom_data.map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center w-full gap-y-3 rounded-[10px] bg-[#f8f8f8]"
                >
                  <div className="w-[143px] h-[143px] 2sm:w-[193px] 2sm:h-[193px] sm:w-[233px] sm:h-[233px] lg:w-[263px] lg:h-[263px] xl:w-[363px] xl:h-[363px] lazy"></div>
                  {/* <p className="mt-4 text-[#f8f8f8] gap-x-10 w-full text-center text-[14px] leading-[21px] md:text-[16px] md:leading-[24px] font-[400] tracking-[0.8px]">
                    prodoct name
                  </p> */}
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="grid w-full grid-cols-2 md:grid-cols-3 gap-x-10 xl:gap-x-0 gap-y-6">
              {custom_data.map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center w-full gap-y-3"
                >
                  <div className="w-[143px] h-[143px] 2sm:w-[193px] 2sm:h-[193px] sm:w-[233px] sm:h-[233px] lg:w-[263px] lg:h-[263px] xl:w-[363px] xl:h-[363px]">
                    <Image
                      alt={`product-${item?.name}`}
                      src={item?.media[0]?.original_url}
                      height={363}
                      width={363}
                      className={`object-cover object-center rounded-[15px] mx-auto md:m-0 ${
                        isMobile ? "eager" : "lazy"
                      }`}
                      loading={isMobile ? "eager" : "lazy"}
                      priority={isMobile ? true : false}
                    />
                  </div>
                  <p className="mt-4 text-[#555] text-center text-[14px] leading-[21px] md:text-[16px] md:leading-[24px] font-[400] tracking-[0.8px]">
                    {item.name}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
        <div className="flex justify-center">
          <button
            onClick={() => router.push(button_link)}
            className="w-[178px] h-[42px] rounded-[21px] mt-10 bg-[#DF3020] text-[#FFF] text-center py-2 px-4 text-[14px] md:text-[16px] leading-[23px] font-[700] tracking-[0.48px]"
          >
            {button_label}
          </button>
        </div>
      </div>
      <div className="absolute top-[70px] flex justify-center -z-10 h-[200%]">
        {isLoading ? (
          ""
        ) : (
          <Image
            // test
            alt="yantra"
            src="/images/yantra_bg.webp"
            height={100}
            width={100}
            className="object-cover w-[620px]"
          />
        )}
      </div>
    </div>
  );
}
