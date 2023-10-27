export default function SideBarButton({
  children,
  className,
  onClick = () => {},
  onMouseEnter = () => {},
  disabled = false,
}) {
  return (
    <div className={className}>
      <button
        className="w-full"
        // data-te-sidenav-toggle-ref
        // data-te-target="#rightSideBar"
        // aria-controls="#rightSideBar"
        // aria-haspopup="true"
        onClick={() => {
          if (!disabled) {
            onClick();
          }
        }}
        onMouseEnter={onMouseEnter}
      >
        {children}
      </button>
    </div>
  );
}
