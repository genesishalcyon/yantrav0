export default function Block({ block }) {
  // const { title } = block?.main;
  const title = "BUILDING SUCCESS — THE RESULTS OF OUR HARD WORK";
  const description =
    "This is fill in text. It is here temporarily, and will be replaced with the proper text shortly. It is repeated many times so we will see what the website will look like with text.";
  const items = [
    {
      title: "Total Sales",
      total: "$480k+",
    },
    {
      title: "Manufactured Products",
      total: "6,000+",
    },
    {
      title: "Satisfied Clients",
      total: "2,600+",
    },
    {
      title: "Years in Business",
      total: "4+",
    },
  ];
  return (
    <div className="w-full pb-16 bg-[#FFFFFF]">
      <div className="max-w-xl m-auto px-4 xl:px-0">
        <div className="flex flex-wrap lg:flex-nowrap justify-center lg:justify-between lg:items-center gap-4">
          <p className="text-[#D81B60] text-[28px] md:text-[35px] leading-[42px] font-[700]">
            {title}
          </p>
          <p className="text-[#555555] text-[14px] md:text-[16px] leading-[23px]">
            {description}
          </p>
        </div>
        <div className="w-full grid grid-cols-2 xl:grid-cols-4 gap-6 mt-14">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex flex-col justify-center text-center px-4 shadow-[0_0_5px_0px_rgba(0,0,0,0.25)] rounded-lg h-[141px] sm:h-[150px] md:h-[200px]"
            >
              <div className="flex flex-col gap-y-4 my-5 text-[#555555] text-[16px] leading-[24px] font-[700]">
                <p
                  className={`${
                    i % 2 === 0 ? "text-[#18ACBA]" : "text-[#83BA12]"
                  } text-[28px] sm:text-[34px] lg:text-[42px] xl:text-[50px] leading-[42px] font-[600]`}
                >
                  {item.total}
                </p>
                <p className="text-[#555555] text-[14px] md:text-[16px] leading-[23px] font-[600]">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
