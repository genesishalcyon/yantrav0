import { useEffect } from "react";

export default function AccordionPanel({ children, data }) {
  useEffect(() => {
    const use = async () => {
      const { Collapse, initTE } = await import("tw-elements");
      initTE({ Collapse });
    };
    use();
  }, []);

  return (
    <div id={`accordion${data.id}`}>
      <div className="rounded-[12px] border-[1px] border-[#D1D5DB] bg-[#F3F4F6]">
        <h2 className="mb-0" id="headingOne">
          <button
            className="group relative flex w-full items-center rounded-t-[12px] px-5 py-4 text-left font-poppins text-[16px] sm:text-[20px] leading-[28px] font-[700] transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none [&:not([data-te-collapse-collapsed])]:bg-[#F3F4F6] [&:not([data-te-collapse-collapsed])]:text-[#111827] [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)]"
            type="button"
            data-te-collapse-init
            data-te-target={`#collapseOne${data.id}`}
            aria-expanded="true"
            aria-controls={`collapseOne${data.id}`}
          >
            {data.title}
            <span className="ml-auto h-5 w-5 shrink-0 rotate-[-180deg] fill-[#F05769] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#F05769"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </span>
          </button>
        </h2>
        <div
          id={`collapseOne${data.id}`}
          className="!visible"
          data-te-collapse-item
          data-te-collapse-show
          aria-labelledby="headingOne"
          data-te-parent="#accordionExample"
        >
          <div className="px-5 py-4 bg-[#FFFFFF] rounded-b-[12px]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
