import globalState from "@/lib/store/globalState";
export default function ConfirmButton({
  children,
  icon = "",
  title = "",
  message = "",
  continueLabel = "Continue",
  cancelLabel = "Cancel",
  onContinue = () => {},
  onCancel = () => {},
  wrapperClassName = "",
  className = "",
  info = "",
  initialize = () => {},
  disabled = false,
}) {
  const confirm = globalState((state) => state.confirm);
  return (
    <div className={wrapperClassName}>
      <button
        type="button"
        className={className}
        data-te-toggle="modal"
        data-te-target="#confirm-modal"
        data-te-ripple-init
        onClick={() => {
          initialize();
          globalState.setState({
            confirm: {
              ...confirm,
              icon,
              title,
              message,
              continueLabel,
              cancelLabel,
              onContinue,
              onCancel,
              info,
            },
          });
        }}
        disabled={disabled}
      >
        {children}
      </button>
    </div>
  );
}
