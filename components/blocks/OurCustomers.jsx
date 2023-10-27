import CarouselCustom from "@/components/partials/CarouselCustom";
export default function Block({ block }) {
  // const { title } = block?.main;
  const title = "WHAT OUR CUSTOMERS HAVE TO SAY";
  const description =
    "This is fill in text. It is here temporarily, and will be replaced with the proper text shortly. It is repeated many times so we will see what the website will look like with text.";
  const customers = [
    {
      avatar: "/images/customer_1.png",
      name: "R. Bascht",
      title: "Landers’ Union",
      message:
        "This is fill in text. It is here temporarily, and will be replaced with the proper text shortly. It is repeated many times so we will see what the website will look like with text. This is fill in text. It is here temporarily.",
    },
    {
      avatar: "/images/customer_2.png",
      name: "R. Bascht",
      title: "Landers’ Union",
      message:
        "This is fill in text. It is here temporarily, and will be replaced with the proper text shortly. It is repeated many times so we will see what the website will look like with text. This is fill in text. It is here temporarily.",
    },
    {
      avatar: "/images/customer_1.png",
      name: "R. Bascht",
      title: "Landers’ Union",
      message:
        "This is fill in text. It is here temporarily, and will be replaced with the proper text shortly. It is repeated many times so we will see what the website will look like with text. This is fill in text. It is here temporarily.",
    },
  ];

  return (
    <div className="w-full pb-16 bg-[#FFFFFF]">
      <div className="max-w-xl m-auto px-4 xl:px-0">
        <div className="w-full flex flex-col gap-y-4 font-poppins">
          <p className="text-[#D81B60] text-[28px] md:text-[32px] lg:text-[35px] leading-[45px] font-[700] uppercase">
            {title}
          </p>
          <p className="text-[#555555] text-[14px] md:text-[16px] leading-[23px]">
            {description}
          </p>
        </div>
      </div>
      <CarouselCustom items={customers} />
    </div>
  );
}
