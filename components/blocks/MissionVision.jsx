import Image from "next/image";
import MissionVisionIcon1 from "@/components/svg/MissionVisionIcon1";
import MissionVisionIcon2 from "@/components/svg/MissionVisionIcon2";
import MissionVisionIcon3 from "@/components/svg/MissionVisionIcon3";
import MissionVisionIcon4 from "@/components/svg/MissionVisionIcon4";
import MissionVisionIcon5 from "@/components/svg/MissionVisionIcon5";
import MissionVisionIcon6 from "@/components/svg/MissionVisionIcon6";
export default function Block({ block }) {
  // const { title } = block?.main;
  const title = "our mission & values";
  const items = [
    {
      icon: <MissionVisionIcon1 />,
      title: "QUALITY",
      description:
        "This is fill in text. It is here temporarily, and will be replaced with the proper text shortly. It is repeated many times so we will see what the website will look like with text.",
    },
    {
      icon: <MissionVisionIcon2 />,
      title: "CUSTOMER SATISFACTION",
      description:
        "This is fill in text. It is here temporarily, and will be replaced with the proper text shortly. It is repeated many times so we will see what the website will look like with text.",
    },
    {
      icon: <MissionVisionIcon3 />,
      title: "CREATIVITY",
      description:
        "This is fill in text. It is here temporarily, and will be replaced with the proper text shortly. It is repeated many times so we will see what the website will look like with text.",
    },
    {
      icon: <MissionVisionIcon4 />,
      title: "SUSTAINABILITY",
      description:
        "This is fill in text. It is here temporarily, and will be replaced with the proper text shortly. It is repeated many times so we will see what the website will look like with text.",
    },
    {
      icon: <MissionVisionIcon5 />,
      title: "ETHICAL PRACTICE",
      description:
        "This is fill in text. It is here temporarily, and will be replaced with the proper text shortly. It is repeated many times so we will see what the website will look like with text.",
    },
    {
      icon: <MissionVisionIcon6 />,
      title: "COMMUNITY INVOLVEMENT",
      description:
        "This is fill in text. It is here temporarily, and will be replaced with the proper text shortly. It is repeated many times so we will see what the website will look like with text.",
    },
  ];

  return (
    <div className="w-full py-16 bg-[#FFFFFF]">
      <div className="max-w-xl m-auto px-4 xl:px-0">
        <p className="text-[#D81B60] text-[28px] leading-[42px] md:text-[35px] md:leading-[52px] font-[700] mb-10 uppercase text-center">
          {title}
        </p>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-8 ">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-start gap-y-4 font-poppins"
            >
              <div>{item.icon}</div>
              <p className="text-[#18ACBA] text-[20px] leading-[30px] font-[600]">
                {item.title}
              </p>
              <p className="text-[#555555] text-[14px] md:text-[16px] leading-[23px]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
