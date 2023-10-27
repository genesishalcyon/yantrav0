import Image from "next/image";
export default function Block({ block }) {
  const article = {
    image: "/images/featured_article_1.png",
    published_at: "April 4, 2023",
    title:
      "Sample Featured Article Headline number 1, up to three lines only, if it’s longer we’ll have to cut it with ellipsis...",
    description:
      "This is fill in text. It is here temporarily, and will be replaced with the proper text shortly. It is repeated many times so we will see what the website will look like with text.",
  };

  return (
    <div className="w-full bg-[#FFFFFF]">
      <div className="w-full flex flex-wrap lg:flex-nowrap font-poppins">
        <div className="relative w-full lg:w-[50%] h-[286px] sm:h-[301px] md:h-[381px] lg:h-[431px] xl:h-[481px]">
          <Image alt="article-image" src={article.image} fill />
        </div>
        <div className="w-full lg:w-[50%] lg:max-w-[560px] flex flex-col justify-center px-4 py-8 md:p-10 lg:pl-0 lg:pr-4 xl:pr-0 lg:ml-10 lg:mr-auto">
          <p className="text-[#D81B60] text-[14px] md:text-[16px] leading-[30px] font-[700] mb-6">
            FEATURED ARTICLE
          </p>
          <p className="text-[#555555] text-[14px] leading-[21px]">
            {article.published_at}
          </p>
          <p className="text-[#D81B60] text-[18px] md:text-[20px] leading-[30px] font-[600] mb-2">
            {article.title}
          </p>
          <p className="text-[#555555] text-[14px] md:text-[16px] leading-[23px]">
            {article.description}
          </p>
        </div>
      </div>
    </div>
  );
}
