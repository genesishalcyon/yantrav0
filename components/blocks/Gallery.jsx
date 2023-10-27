import React, { useState, useEffect } from "react";
import Image from "next/image";
import initializeLazyLoading from "@/lib/services/initializeLazyLoading";
export default function Block({ block }) {
  const { title, product } = block?.main;

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth > 639);
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

  return (
    <div className="relative w-full py-16 bg-[#F3F4F6] z-10">
      <div className="max-w-xl px-4 m-auto xl:px-0">
        <p className="text-[#231F20] text-center xl:text-start text-[28px] leading-[42px] md:text-[35px] md:leading-[52px] font-[600] mb-10 tracking-[2px]">
          {title}
        </p>
        <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-2">
          {product.map((product, i) => (
            <div key={i} className="flex flex-col items-center w-full">
              <div className="relative w-[211px] h-[211px] 3sm:w-[241px] 3sm:h-[241px] lg:w-[271px] lg:h-[271px] xl:w-[301px] xl:h-[301px] lazy">
                <Image
                  alt={product.name}
                  data-src={product.image}
                  src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
                  fill
                  className="object-cover object-center lazy"
                  loading={i < 3 || isMobile ? "eager" : "lazy"}
                  priority={i < 3 || isMobile ? true : false}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute top-0 flex justify-center w-[50%] -z-10 h-[35%]">
        <Image
          alt="yantra"
          src="/images/yantra_bg.webp"
          height={100}
          width={100}
          className="object-cover w-[520px]"
        />
      </div>
    </div>
  );
}
