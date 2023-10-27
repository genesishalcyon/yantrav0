import Image from "next/image";
import ChevronIcon from "@/components/svg/ChevronIcon";
import ReactPaginate from "react-paginate";
import { useState } from "react";
import { useRouter } from "next/router";
export default function Block({ block }) {
  // const { title } = block?.main;
  const router = useRouter();
  const articles = [
    {
      id: 1,
      image: "/images/a2.png",
      title:
        "Sample News 1, up to three lines only, if it’s longer we’ll have to cut it with ellipsis...",
      created_at: "April 4, 2023",
      description:
        "This is fill in text. It is here temporarily, and will be replaced with the proper text shortly. It is repeated many times so we will see what the website will look like with text.",
    },
    {
      id: 2,
      image: "/images/a3.png",
      title:
        "Sample News 2, titles have link in yellow, so no need to for “read more” button",
      created_at: "April 4, 2023",
      description:
        "This is fill in text. It is here temporarily, and will be replaced with the proper text shortly. It is repeated many times so we will see what the website will look like with text.",
    },
    {
      id: 3,
      image: "/images/a1.png",
      title:
        "Sample News 3, hope these titles are read, it’s a quick note for these templates",
      created_at: "April 4, 2023",
      description:
        "This is fill in text. It is here temporarily, and will be replaced with the proper text shortly. It is repeated many times so we will see what the website will look like with text.",
    },
    // test
    {
      id: 4,
      image: "/images/a1.png",
      title:
        "Sample News 4, hope these titles are read, it’s a quick note for these templates",
      created_at: "April 4, 2023",
      description:
        "This is fill in text. It is here temporarily, and will be replaced with the proper text shortly. It is repeated many times so we will see what the website will look like with text.",
    },
    {
      id: 5,
      image: "/images/a2.png",
      title:
        "Sample News 5, up to three lines only, if it’s longer we’ll have to cut it with ellipsis...",
      created_at: "April 4, 2023",
      description:
        "This is fill in text. It is here temporarily, and will be replaced with the proper text shortly. It is repeated many times so we will see what the website will look like with text.",
    },
    {
      id: 6,
      image: "/images/a3.png",
      title:
        "Sample News 6, titles have link in yellow, so no need to for “read more” button",
      created_at: "April 4, 2023",
      description:
        "This is fill in text. It is here temporarily, and will be replaced with the proper text shortly. It is repeated many times so we will see what the website will look like with text.",
    },
  ];
  const [hoveredProduct, setHoveredProduct] = useState(null);
  return (
    <div className="w-full pt-8 pb-16 bg-[#FFFFFF]">
      <div className="max-w-xl m-auto px-4 xl:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8 py-10">
          {articles.map((article, i) => (
            <div
              key={i}
              className="flex flex-col"
              onMouseEnter={() => setHoveredProduct(article.id)}
              onMouseLeave={() => setHoveredProduct(null)}
              onClick={() => router.push("/blog-slug")}
            >
              <div className="relative w-full h-[246px] sm:h-[300px] md:h-[246px] lg:h-[240px] xl:h-[246px]">
                <Image alt="" src={article.image} fill />
                {hoveredProduct === article.id && (
                  <div className="hidden md:inline-block absolute top-0 left-0 w-full h-full bg-[#00000080]">
                    <div className="cursor-pointer absolute-center z-10 w-full max-w-[184px] shadow-lg h-[52px] border-[2px] border-[#FFFFFF] rounded-[8px] flex justify-center items-center font-poppins text-[#FFFFFF] text-[16px] leading-[24px] font-[700]">
                      <span style={{ textShadow: "1px 1px 4px rgb(10 10 10)" }}>
                        Read more
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-y-2 my-2">
                <p className="text-[#555555] text-[14px] leading-[21px]">
                  {article.created_at}
                </p>
                <p className="text-[#D81B60] text-[20px] leading-[30px] font-[600]">
                  {article.title}
                </p>
                <p className="text-[#555555] text-[16px] leading-[23px]">
                  {article.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <ReactPaginate
          className="flex flex-nowrap justify-center items-center my-6"
          breakLabel="..."
          nextLabel={<ChevronIcon />}
          nextClassName="mx-[5px]"
          onPageChange={() => {}}
          forcePage={0}
          pageRangeDisplayed={9}
          pageCount={5}
          previousLabel={<ChevronIcon className="rotate-[-180deg]" />}
          previousClassName="mx-[5px]"
          renderOnZeroPageCount={null}
          disabledClassName="hidden"
          breakClassName="text-[#9E9E9E] text-[14px] leading-[20px] font-[500] flex justify-center items-center"
          pageClassName="text-[#9E9E9E] text-[14px] leading-[20px] font-[500] w-[32px] h-[32px] flex justify-center items-center"
          activeClassName="text-[#D81B60] border-[2px] rounded-[8px] border-[#D81B60] bg-[#FFF3F7]"
        />
      </div>
    </div>
  );
}
