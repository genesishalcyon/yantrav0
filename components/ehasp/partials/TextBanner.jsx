import Image from "next/image";
export default function TextBanner({
  className = "relative w-full h-[160px]",
  title,
  bgImage,
}) {
  return (
    <div className={className}>
      {bgImage && (
        <div className="relative w-full h-[160px]">
          <Image
            alt="banner"
            src={bgImage}
            fill
            priority
            className="object-cover object-bottom"
          />
        </div>
      )}
      <div className="relative md:absolute p-[15px] md:p-0">
        <p className="font-poppins text-[#231F20] text-[25px] leading-[30px] lg:text-[40px] lg:leading-[60px] font-[600] whitespace-nowrap tracking-[2px]">
          {title}
        </p>
      </div>
    </div>
  );
}
