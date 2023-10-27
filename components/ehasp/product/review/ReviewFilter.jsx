import ChevronIcon from "@/components/svg/ChevronIcon";
export default function ReviewFilter({ sort, setSort }) {
  const sortBy = [
    {
      label: "Highest Ranking",
      value: "desc",
    },
    {
      label: "Lowest Ranking",
      value: "asc",
    },
  ];
  return (
    <div className="w-full md:w-auto flex items-center gap-x-4 text-[14px] md:text-[16px] leading-[23px]">
      <p className="font-[600]">Sort by</p>
      <div className="flex flex-nowrap  items-center border-[1px] border-[#555555] rounded-[8px] px-4 py-2">
        <select
          value={sort}
          className="appearance-none outline-none bg-[#f8f8f9]"
          onChange={(e) => {
            if (e?.target?.value) {
              setSort(e?.target?.value);
            }
          }}
        >
          {sortBy.map((d, i) => (
            <option key={i} value={d.value}>
              {d.label}
            </option>
          ))}
        </select>
        <ChevronIcon
          fill="#555555"
          className="transition ml-2 transform rotate-90"
        />
      </div>
    </div>
  );
}
