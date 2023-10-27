import LoadingIcon from "@/components/svg/LoadingIcon";
export default function PageLoading({ className }) {
  return (
    <div className={`h-screen w-full fixed top-0 bg-[#00000021] ${className}`}>
      <div className="w-fit absolute-center -mt-10">
        <div className="flex items-center gap-x-2">
          <LoadingIcon className="h-8 w-8"></LoadingIcon>
          <p>Loading...</p>
        </div>
      </div>
    </div>
  );
}
