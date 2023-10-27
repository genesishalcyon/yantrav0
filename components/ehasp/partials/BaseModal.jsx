import { useEffect } from "react";
export default function BaseModal({ children, id, data }) {
  return (
    <div
      data-te-modal-init
      className="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
      id={`modal-${id}`}
      tabIndex="-1"
      aria-labelledby={`modalLabel${id}`}
      aria-modal="true"
      role="dialog"
    >
      <div
        data-te-modal-dialog-ref
        className="pointer-events-none relative translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto mt-0 min-[768px]:mt-7 w-full min-[768px]:max-w-[600px] min-[992px]:max-w-[868px] min-[0px]:h-full"
      >
        <div className="pointer-events-auto relative flex flex-col w-full h-full md:h-auto md:rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none">
          {data?.title && (
            <div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4">
              <h5
                className="font-poppins text-[#0A0903] text-[18px] leading-[30px] font-[600]"
                id={`modalLabel${id}`}
              >
                {data.title}
              </h5>
              {/* <button
                type="button"
                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                data-te-modal-dismiss
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#D81B60"
                  className="h-6 w-6"
                >
                  <path
                    fill="#D81B60"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button> */}
            </div>
          )}

          {/* <div className="relative p-4">
            <div>{children}</div>
          </div> */}

          {children}
        </div>
      </div>
    </div>
  );
}
