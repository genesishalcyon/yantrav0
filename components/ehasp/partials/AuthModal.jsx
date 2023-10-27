import { useEffect, useRef } from "react";
import LoginForm from "@/components/ehasp/auth/modals/LoginForm";
import VerificationSent from "@/components/ehasp/auth/modals/VerificationSent";
import VerifiedAccount from "@/components/ehasp/auth/modals/VerifiedAccount";
import NotVerifiedAccount from "@/components/ehasp/auth/modals/NotVerifiedAccount";
import globalState from "@/lib/store/globalState";
export default function AuthModal() {
  const ref = useRef("");
  const closeRef = useRef("");
  const authModal = globalState((state) => state.authModal);
  useEffect(() => {
    globalState.setState({
      authModalTrigger: ref,
      closeAuthModalTrigger: closeRef,
    });
  }, []);
  const RenderComponent = () => {
    switch (authModal.type) {
      case "login":
        return <LoginForm />;
      case "verification-sent":
        return <VerificationSent />;
      case "verified":
        return <VerifiedAccount />;
      case "not-verified":
        return <NotVerifiedAccount />;
    }
  };
  return (
    <div>
      <button
        ref={ref}
        data-te-toggle="modal"
        data-te-target="#auth-modal"
        data-te-ripple-init
        className="hidden"
      />

      <div
        data-te-modal-init
        className="fixed hidden left-0 top-20 z-[1055] h-full w-full overflow-y-auto overflow-x-hidden outline-none"
        id="auth-modal"
        // data-te-keyboard="false"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div
          data-te-modal-dialog-ref
          className="pointer-events-none relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto w-fit"
        >
          <div className="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none">
            <div data-te-modal-body-ref className="relative">
              <button className="hidden" ref={closeRef} data-te-modal-dismiss />
              <RenderComponent />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
