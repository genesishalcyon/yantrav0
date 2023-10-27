import Image from "next/image";
export default function Block({ block }) {
  // const { title } = block?.main;
  const title = "MEET OUR TEAM";
  const founders = [
    {
      avatar: "/images/founder_1.png",
      name: "BETO HERRERA",
      position: "Founder & CEO",
    },
    {
      avatar: "/images/founder_2.png",
      name: "HANNA HERRERA",
      position: "Co-Founder & Operations Manager",
    },
  ];

  const teams = [
    {
      avatar: "/images/teams_1.png",
      name: "WENDELLE MAHINAY",
      nameColor: "#D81B60",
      position: "Graphic Designer",
    },
    {
      avatar: "/images/teams_2.png",
      name: "MARVIN TADLE",
      nameColor: "#18ACBA",
      position: "Multimedia Specialist",
    },
    {
      avatar: "/images/teams_3.png",
      name: "ALBERT MINGO",
      nameColor: "#8BC319",
      position: "Web Developer",
    },
    {
      avatar: "/images/teams_4.png",
      name: "PETO VACALARES",
      nameColor: "#8BC319",
      position: "Copywriter",
    },
    {
      avatar: "/images/teams_5.png",
      name: "KEVIN CANUNAYON",
      nameColor: "#18ACBA",
      position: "Marketing Specialist",
    },
    {
      avatar: "/images/teams_6.png",
      name: "JESHER SAMAYLA",
      nameColor: "#D81B60",
      position: "Admin Assistant",
    },
  ];

  return (
    <div className="w-full pt-8 pb-16 bg-[#FFFFFF]">
      <div className="relative h-[177px] bg-[#18ACBA] pt-8">
        <p className="text-[#FFFFFF] text-[28px] leading-[42px] md:text-[35px] md:leading-[52px] font-[700] uppercase text-center">
          {title}
        </p>
        <div className="absolute w-full max-w-xl top-[100px] left-[50%] translate-x-[-50%] px-4 xl:px-0">
          <div className="flex gap-y-4">
            {founders.map((founder, i) => (
              <div
                key={i}
                className="w-full lg:w-[50%] flex flex-col items-center font-poppins"
              >
                <div className="relative w-full h-[160px] sm:h-[257px] md:h-[357px] xl:h-[407px]">
                  <Image
                    alt={founder.name}
                    src={founder.avatar}
                    fill
                    className={`object-cover object-center ${
                      i === 0 ? "rounded-l-lg" : "rounded-r-lg"
                    }`}
                  />
                </div>
                <p className="text-[#18ACBA] text-[18px] leading-[27px] md:text-[24px] md:leading-[36px] font-[600] mt-4">
                  {founder.name}
                </p>
                <p className="text-[#555555] text-[14px] md:text-[16px] leading-[23px] text-center">
                  {founder.position}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="m-auto max-w-xl px-4 xl:px-0 mt-[250px] sm:mt-[350px] md:mt-[450px] xl:mt-[480px]">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {teams.map((team, i) => (
            <div key={i} className="flex flex-nowrap">
              <div
                className={`relative w-[50%] h-[140px] sm:h-[180px] md:h-[200px] ${
                  i % 2 == 0 ? "order-1" : "order-2"
                } ${[2, 3].includes(i) ? "md:order-2" : "md:order-1"}`}
              >
                <Image
                  alt={team.name}
                  src={team.avatar}
                  fill
                  className={`object-cover object-center ${
                    i === 0 && "rounded-tl-lg"
                  } ${i === 4 && "rounded-none md:rounded-bl-lg"} ${
                    i === 5 && "rounded-br-lg md:rounded-none"
                  }`}
                />
              </div>
              <div
                className={`w-[50%] flex flex-col justify-center px-4 bg-[#F3F4F6] font-poppins ${
                  i % 2 == 0 ? "order-2" : "order-1"
                } ${[2, 3].includes(i) ? "md:order-1" : "md:order-2"} ${
                  i === 0 && "rounded-tr-lg md:rounded-none"
                } ${i === 1 && "rounded-none md:rounded-tr-lg"} ${
                  i === 5 && "rounded-bl-lg md:rounded-br-lg"
                } ${i % 2 == 0 ? "items-start" : "items-end"} ${
                  [2, 3].includes(i) ? "md:items-end" : "md:items-start"
                }`}
              >
                <p
                  className={`text-[${team.nameColor}] text-[16px] md:text-[20px] lg:text-[24px] leading-[30px] font-[600] uppercase`}
                >
                  {team.name}
                </p>
                <p className="text-[#555555] text-[14px] md:text-[16px] leading-[23px]">
                  {team.position}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
