import ChevronIcon from "@/components/svg/ChevronIcon";
import { useState } from "react";
export default function Block({ block }) {
  // const { title } = block?.main;
  const title = "ARTICLE CATEGORIES";
  const categories = [
    {
      name: "Updates",
    },
    {
      name: "Announcements",
    },
    {
      name: "Blog",
    },
    {
      name: "Discounts & Promotions",
    },
  ];
  const sortBy = [
    {
      label: "Lastest Upload",
      value: "uploaded_at",
    },
    {
      label: "Alphabetical",
      value: "asc",
    },
    {
      label: "Date Updated",
      value: "updated_at",
    },
    {
      label: "Oldest First",
      value: "created_at",
    },
  ];
  const [selectedCategory, setSelectedCategory] = useState("Updates");
  const [sort, setSort] = useState("uploaded_at");
  return (
    <div className="w-full bg-[#EDF0F1]">
      <div className="max-w-xl m-auto px-4 xl:px-0 flex flex-col items-center font-poppins text-[#555555]">
        <div className="w-full flex justify-between gap-4 py-10">
          <div className="w-[50%] md:w-[65%]">
            <p className="text-[16px] leading-[24px] font-[600] mb-4">
              {title}
            </p>
            <div className="hidden md:flex flex-wrap lg:flex-nowrap justify-between items-center gap-y-2">
              {categories.map((category, i) => (
                <button
                  key={i}
                  className={`${
                    selectedCategory === category.name &&
                    "text-[#D81B60] font-[600] border-b-[2px] border-[#D81B60]"
                  } text-[16px] leading-[24px] uppercase py-2`}
                  onClick={() => setSelectedCategory(category.name)}
                >
                  {category.name}
                </button>
              ))}
            </div>
            <div className="md:hidden relative">
              <select
                value={selectedCategory}
                className="outline-none appearance-none py-3 px-5 w-full font-poppins text-[#6B7280] text-[14px] leading-[23px]"
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((d, i) => (
                  <option key={i} value={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>
              <span className="absolute right-[10px] top-[50%] translate-y-[-50%]">
                <ChevronIcon fill="#555555" className="rotate-[90deg]" />
              </span>
            </div>
          </div>
          <div className="w-[50%] md:w-[25%]">
            <p className="text-[16px] leading-[24px] font-[600] mb-4">
              SORT BY
            </p>
            <div className="relative">
              <select
                value={sort}
                className="outline-none appearance-none py-3 px-5 w-full font-poppins text-[#6B7280] text-[14px] leading-[23px]"
                onChange={(e) => setSort(e.target.value)}
              >
                {sortBy.map((d, i) => (
                  <option key={i} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </select>
              <span className="absolute right-[10px] top-[50%] translate-y-[-50%]">
                <ChevronIcon fill="#555555" className="rotate-[90deg]" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
