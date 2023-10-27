import { useEffect } from "react";
import { useRef } from "react";
import persistentStore from "@/lib/store/persistentStore";
import { useRouter } from "next/router";
import globalState from "@/lib/store/globalState";
export default function SessionExpired({}) {
  const ref = useRef("");
  const router = useRouter();
  useEffect(() => {
    persistentStore.setState({ profile: "" });
    const use = async () => {
      ref?.current?.click();
    };
    use();
  }, []);
  return (
    <div>
      <button
        ref={ref}
        type="button"
        data-te-toggle="modal"
        data-te-target="#session-expired"
        data-te-ripple-init
      ></button>
      <div
        data-te-modal-init
        className="fixed left-0 top-20 z-[1055] h-full w-full overflow-y-auto overflow-x-hidden outline-none"
        id="session-expired"
        data-te-backdrop="static"
        data-te-keyboard="false"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div
          data-te-modal-dialog-ref
          className="pointer-events-none relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px]"
        >
          <div className="py-6 min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none">
            <div data-te-modal-body-ref className="relative p-4">
              <p className="text-center font-b text-[30px]">Session Exprired</p>
              <div className="max-w-[250px] flex flex-col m-auto gap-y-4">
                <button
                  type="button"
                  className="p-1 bg-[#cecece] rounded-lg"
                  data-te-modal-dismiss
                  data-te-ripple-init
                  onClick={() => {
                    globalState.setState({ sessionExpired: false });
                    router.replace("/login");
                    // window.location.href = "/login";
                  }}
                >
                  Go to login page
                </button>
                <button
                  type="button"
                  data-te-modal-dismiss
                  data-te-ripple-init
                  className="p-1 bg-[#cecece] rounded-lg"
                  onClick={() => {
                    globalState.setState({ sessionExpired: false });
                    location.reload();
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
