export default function ModalButton({
  id,
  onClick = () => {},
  className,
  children,
}) {
  return (
    <button
      type="button"
      className={className}
      data-te-toggle="modal"
      data-te-target={`#modal-${id}`}
      data-te-ripple-init
      data-te-ripple-color="light"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
