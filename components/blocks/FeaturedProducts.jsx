import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import initializeLazyLoading from "@/lib/services/initializeLazyLoading";
export default function Block({ block }) {
  const { title, custom_data, button_label, button_link } = block?.main;

  useEffect(() => {
    initializeLazyLoading();
  }, []);

  return (
    <div className="w-full py-16 bg-[#FAFAFA]">
      <div className="relative z-10 flex flex-col max-w-xl px-4 m-auto xl:px-0 font-poppins">
        <p className="text-[#0A0903] text-center xl:text-start text-[28px] leading-[42px] md:text-[35px] md:leading-[52px] font-[700] mb-10 tracking-[1.75px]">
          {title}
        </p>
        <div className="grid w-full grid-cols-2 md:grid-cols-4 gap-x-10 xl:gap-x-0 gap-y-6">
          {custom_data.map((product, i) => (
            <div
              key={i}
              className="flex flex-col items-center w-full xl:items-start gap-y-3"
            >
              <div className="relative w-[141px] h-[151px] lg:w-[241px] lg:h-[251px] xl:w-[271px] xl:h-[281px] lazy">
                <Image
                  alt={`featured-${product?.name}`}
                  loading="lazy"
                  data-src={
                    product?.media[0]?.original_url ||
                    "/images/placeholder.webp"
                  }
                  src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
                  fill
                  className="object-cover object-center lazy"
                />
              </div>
              <div className="flex flex-col gap-y-2 mt-4 text-center xl:text-start text-[#555] text-[14px] leading-[21px] md:text-[16px] md:leading-[24px] font-[700] tracking-[0.8px]">
                <p className="font-[700]">{product.name}</p>
                <p className="font-[600]">{product.retail_price}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <Link href={button_link}>
            <button className="w-[178px] h-[42px] mt-10 bg-[#EE3424] rounded-[21px] text-[#FFF] py-2 px-4 text-[14px] md:text-[16px] leading-[23px] font-[700] tracking-[0.48px]">
              {button_label}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
