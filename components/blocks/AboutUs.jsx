import Image from "next/image";
export default function Block({ block }) {
  const { title, description, image } = block?.main;

  return (
    <div className="relative w-full py-16 bg-[#F3F4F6] z-10">
      <div className="max-w-xl px-4 m-auto xl:px-0">
        <div className="flex flex-wrap justify-center w-full lg:flex-nowrap lg:gap-x-[120px] gap-y-8">
          <div className="flex flex-col gap-y-12 sm:gap-y-10 w-full lg:w-[42%] h-auto my-auto font-poppins">
            <p className="text-[#0A0903] text-[28px] leading-[42px] md:text-[35px] md:leading-[45px] font-[700] tracking-[1.75px]">
              {title}
            </p>
            <div
              className="text-[#555555] text-[14px] md:text-[16px] font-[400] leading-[23px] tracking-[0.48px]"
              dangerouslySetInnerHTML={{ __html: description }}
            ></div>
          </div>
          <div className="relative w-[274px] h-[206px] 3sm:w-[374px] 3sm:h-[306px] md:w-[474px] md:h-[406px]">
            <Image alt="about-us" src={image} fill />
          </div>
        </div>
      </div>
      <div className="absolute top-0 flex justify-center w-[60%] -z-10 h-full">
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
