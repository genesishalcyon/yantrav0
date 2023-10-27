// import ConfirmModal from "@/components/ehasp/partials/confirm/ConfirmModal";
// import AuthModal from "@/components/ehasp/partials/AuthModal";
// import { ToastContainer } from "react-toastify";
import Menu from "@/layout/partials/Menu";
import dynamic from "next/dynamic";
import globalState from "@/lib/store/globalState";
import { useEffect } from "react";
// import RightSideBarCustom from "@/components/ehasp/partials/SideBar/RightSideBarCustom";
// import DropdownMenu from "@/components/_layout/partials/DropdownMenu";
import { shallow } from "zustand/shallow";

const ConfirmModal = dynamic(() =>
  import("../../components/ehasp/partials/confirm/ConfirmModal").then(
    (module) => module.default
  )
);

const AuthModal = dynamic(() =>
  import("../../components/ehasp/partials/AuthModal").then(
    (module) => module.default
  )
);

const ToastContainer = dynamic(() =>
  import("react-toastify").then((module) => module.ToastContainer)
);

const RightSideBarCustom = dynamic(() =>
  import("../../components/ehasp/partials/SideBar/RightSideBarCustom").then(
    (module) => module.default
  )
);

const DropdownMenu = dynamic(() =>
  import("../../components/_layout/partials/DropdownMenu").then(
    (module) => module.default
  )
);

// const Footer = () => {
//   const Component = dynamic(() => import("@/layout/partials/Footer"));
//   return <Component />;
// };

const Footer = dynamic(() =>
  import("../_layout/partials/Footer").then((module) => module.default)
);

export default function DefaultLayout(props) {
  const [showLazy, showMenu] = globalState(
    (state) => [state.showLazy, state.showMenu],
    shallow
  );

  useEffect(() => {
    const use = async () => {
      const { Modal, Ripple, initTE } = await import("tw-elements");
      initTE({ Modal, Ripple });
      globalState.setState({ modalInit: Modal });
    };
    use();
  }, []);

  return (
    <div className="text-dim-black">
      <Menu account={props?.account} />
      {/* {showMenu && <DropdownMenu account={props?.account} />}
      {props.children}
      {showLazy && <Footer />}
      <ConfirmModal />
      <ToastContainer />
      <AuthModal />
      <RightSideBarCustom /> */}
      {showMenu && <DropdownMenu account={props?.account} />}
      {props.children}
      {showLazy && <Footer />}
      {showLazy && <ConfirmModal />}
      {showLazy && <ToastContainer />}
      {<AuthModal />}
      {showLazy && <RightSideBarCustom />}
    </div>
  );
}
