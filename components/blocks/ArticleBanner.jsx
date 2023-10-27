import Image from "next/image";
export default function Block({ block }) {
  const article = {
    image: "/images/featured_article_1.png",
    published_at: "April 4, 2023",
    title:
      "Sample Featured Article Headline number 1, sample article for Trucker Hats Sale",
  };

  return (
    <div className="w-full bg-[#FFFFFF]">
      <div className="w-full flex flex-wrap font-poppins">
        <div className="relative w-full h-[286px] sm:h-[301px] md:h-[341px] lg:h-[380px] xl:h-[422px]">
          <Image
            alt="article-image"
            src={article.image}
            fill
            className="object-cover object-center"
          />
        </div>
        <div className="w-full bg-[#EDF0F1]">
          <div className="flex flex-col justify-center items-center gap-y-4 max-w-xl m-auto px-4 xl:px-0 py-8">
            <p className="text-[#D81B60] text-[14px] md:text-[16px] leading-[30px] font-[700]">
              FEATURED ARTICLE
            </p>
            <p className="text-[#D81B60] text-[18px] leading-[30px] md:text-[35px] md:leading-[50px] font-[600] text-center">
              {article.title}
            </p>
            <p className="text-[#555555] text-[14px] md:text-[16px] leading-[21px]">
              {article.published_at}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
