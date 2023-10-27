import LoadingIcon from "@/components/svg/LoadingIcon";
export default function LoadingButton({
  onClick = () => {},
  loading,
  loadingColor,
  label,
  labelLoading,
  className,
  disabled = false,
}) {
  return (
    <button
      disabled={disabled}
      className={`inline-flex justify-center items-center ${className} ${
        loading && `cursor-not-allowed ${loadingColor}`
      } ${disabled ? "cursor-not-allowed bg-[#cecece] text-[#FFFFFF]" : ""}`}
      onClick={() => {
        if (!loading && !disabled) {
          onClick();
        }
      }}
    >
      {loading && <LoadingIcon className="mr-3 h-5 w-5 text-white" />}
      {loading ? labelLoading : label}
    </button>
  );
}
