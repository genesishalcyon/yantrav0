import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import initializeLazyLoading from "@/lib/services/initializeLazyLoading";
export default function Block({ block }) {
  const { title, description, button_label, button_link, image } = block?.main;
  useEffect(() => {
    initializeLazyLoading();
  }, []);
  return (
    <div className="w-full py-16 bg-[#FAFAFA]">
      <div className="max-w-xl px-4 m-auto xl:px-0">
        <div className="relative z-10 flex flex-wrap md:flex-nowrap lg:gap-x-10 gap-y-6">
          <div className="w-full md:w-[50%] h-auto sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[430px]">
            <div className="flex flex-col items-center justify-center h-full md:items-start gap-y-4 md:gap-0 font-poppins">
              <div className="flex flex-col gap-y-10 w-[95%] lg:w-[85%] items-center sm:items-start">
                <p className="text-[#0A0903] text-center sm:text-start text-[28px] md:text-[32px] lg:text-[35px] leading-[34px] md:leading-[45px] font-[700] tracking-[1.75px]">
                  {title}
                </p>
                <div
                  className="text-[#555] text-[14px] md:text-[16px] leading-[23px] line-clamp-6 tracking-[0.48px] text-center sm:text-start"
                  dangerouslySetInnerHTML={{ __html: description }}
                ></div>
                <Link href={button_link}>
                  <button className="w-[274px] h-[42px] rounded-[21px] bg-[#EE3424] text-[#FFFFFF] py-2 px-4 text-[14px] md:text-[16px] leading-[23px] font-[700]">
                    {button_label}
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="relative w-full md:w-[50%] h-[250px] 2sm:h-[350px] sm:h-[474px] md:h-[374px] lg:h-[400px] xl:h-[474px] rounded-[8px] lazy">
            <Image
              alt=""
              loading="lazy"
              data-src={image}
              src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
              fill
              className="object-fill object-center lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
