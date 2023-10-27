import React, { useEffect } from "react";
import Image from "next/image";
import initializeLazyLoading from "@/lib/services/initializeLazyLoading";
export default function Block({ block }) {
  const { name, taxonomyTerms } = block?.main.categories_preload.taxonomy;

  useEffect(() => {
    initializeLazyLoading();
  }, []);

  return (
    <div className="w-full py-16 bg-[#FAFAFA]">
      <div className="flex flex-col max-w-xl px-4 m-auto xl:px-0 font-poppins">
        <p className="text-[#0A0903] text-center xl:text-start text-[28px] leading-[42px] md:text-[35px] md:leading-[52px] font-[700] mb-10 tracking-[1.75px]">
          {name}
        </p>
        <div className="grid w-full grid-cols-2 md:grid-cols-4 gap-x-10 gap-y-6">
          {taxonomyTerms.map((product, i) => (
            <div key={i} className="flex flex-col items-center w-full">
              <div className="relative w-[141px] h-[151px] lg:w-[241px] lg:h-[251px] xl:w-[271px] xl:h-[281px] lazy">
                <Image
                  loading="lazy"
                  data-src={
                    product.data.main.image ? product.data.main.image : ""
                  }
                  src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
                  alt={product.name}
                  fill
                  className="object-cover object-center lazy"
                />
                <p className="absolute bottom-[15px] w-full text-center text-[#FFFFFF] text-[16px] leading-[24px] md:text-[20px] md:leading-[30px] font-[700] tracking-[1px]">
                  {product.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
