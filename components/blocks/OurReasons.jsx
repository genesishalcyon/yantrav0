import Image from "next/image";
import WhyChooseUsIcon1 from "@/components/svg/WhyChooseUsIcon1";
import WhyChooseUsIcon2 from "@/components/svg/WhyChooseUsIcon2";
import WhyChooseUsIcon3 from "@/components/svg/WhyChooseUsIcon3";
export default function Block({ block }) {
  // const { title } = block?.main;
  const title = "Discover the Reasons to Shop with Us";
  const description =
    "This is fill in text. It is here temporarily, and will be replaced with the proper text shortly. It is repeated many times so we will see what the website will look like with text.";
  const reasons = [
    {
      text: "This is fill in text. It is here temporarily, and will be replaced with the proper text shortly.",
      icon: <WhyChooseUsIcon1 />,
    },
    {
      text: "This is fill in text. It is here temporarily, and will be replaced with the proper text shortly.",
      icon: <WhyChooseUsIcon2 />,
    },
    {
      text: "This is fill in text. It is here temporarily, and will be replaced with the proper text shortly.",
      icon: <WhyChooseUsIcon3 />,
    },
  ];
  return (
    <div className="w-full pb-16 bg-[#FFFFFF]">
      <div className="max-w-xl m-auto px-4 xl:px-0">
        <div className="flex flex-wrap lg:flex-nowrap justify-center lg:justify-between gap-4 border-[1px] border-[#E0E0E0] rounded-[8px] p-6">
          <div className="relative w-[340px] h-[387px] md:w-[502px] md:h-[573px]">
            <Image alt="why_choose_us" src="/images/why_choose_us.png" fill />
          </div>
          <div className="flex flex-col gap-y-6 md:gap-y-4 w-full lg:w-[50%] h-auto my-auto font-poppins">
            <p className="text-[#D81B60] text-[28px] md:text-[35px] leading-[42px] font-[700]">
              {title}
            </p>
            <p className="text-[#555555] text-[14px] md:text-[16px] leading-[23px]">
              {description}
            </p>
            {reasons.map((reason, i) => (
              <div key={i} className="flex flex-nowrap items-between gap-x-4">
                <div>{reason.icon}</div>
                <p className="text-[#555555] text-[14px] md:text-[16px] leading-[23px]">
                  {reason.text}
                </p>
              </div>
            ))}
            <div className="text-center md:text-left">
              <button className="mt-10 bg-[#D81B60] rounded-md text-[#FFFFFF] py-2 px-4 text-[14px] md:text-[16px] leading-[23px] font-[700]">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
