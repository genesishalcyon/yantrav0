import Image from "next/image";
export default function Block({ block }) {
  // const { title } = block?.main;
  const title = "ARTICLES & BLOG UPDATES";
  const articles = [
    {
      image: "/images/a1.png",
      title:
        "Sample News 1, up to three lines only, if it’s longer we’ll have to cut it with ellipsis...",
      created_at: "April 4, 2023",
      description:
        "This is fill in text. It is here temporarily, and will be replaced with the proper text shortly. It is repeated many times so we will see what the website will look like with text.",
    },
    {
      image: "/images/a2.png",
      title:
        "Sample News 2, titles have link in yellow, so no need to for “read more” button",
      created_at: "April 4, 2023",
      description:
        "This is fill in text. It is here temporarily, and will be replaced with the proper text shortly. It is repeated many times so we will see what the website will look like with text.",
    },
    {
      image: "/images/a3.png",
      title:
        "Sample News 3, hope these titles are read, it’s a quick note for these templates",
      created_at: "April 4, 2023",
      description:
        "This is fill in text. It is here temporarily, and will be replaced with the proper text shortly. It is repeated many times so we will see what the website will look like with text.",
    },
  ];
  return (
    <div className="w-full pb-16 bg-[#FFFFFF]">
      <div className="max-w-xl m-auto px-4 xl:px-0 flex flex-col items-center font-poppins">
        <p className="text-[#D81B60] text-[28px] leading-[42px] md:text-[35px] md:leading-[52px] font-[700] mb-10 uppercase text-center">
          {title}
        </p>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.map((article, i) => (
            <div key={i} className="flex flex-col">
              <div className="relative w-full h-[246px] sm:h-[320px] md:h-[246px] lg:h-[240px] xl:h-[246px]">
                <Image alt="" src={article.image} fill />
              </div>
              <div className="flex flex-col gap-y-2 my-2">
                <p className="text-[#555555] text-[14px] leading-[21px]">
                  {article.created_at}
                </p>
                <p className="text-[#D81B60] text-[18px] md:text-[20px] leading-[30px] font-[600]">
                  {article.title}
                </p>
                <p className="text-[#555555] text-[14px] md:text-[16px] leading-[23px]">
                  {article.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <button className="mt-10 bg-[#D81B60] rounded-md text-[#FFFFFF] py-2 px-4 text-[14px] md:text-[16px] leading-[23px] font-[700]">
            View More
          </button>
        </div>
      </div>
    </div>
  );
}
