import AccountVerifiedIcon from "@/components/svg/AccountVerifiedIcon";

export default function VerifiedAccount() {
  return (
    <div className="relative w-full h-full max-w-[715px] max-h-[458px] bg-[#FFFFFF] rounded-[8px] z-[150] mx-auto py-16 px-14">
      <div className="flex flex-col items-center justify-center gap-y-6">
        <AccountVerifiedIcon />
        <h1 className="text-[#555555] text-[40px] leading-[60px] font-[600] text-center">
          {`Your account is now verified!`}
        </h1>
        <div className="flex w-full">
          <button className="max-w-[368px] w-full mx-auto inline-flex justify-center text-center bg-[#315589] font-poppins text-[#FFFFFF] text-[16px] leading-[24px] font-[700] p-3 rounded-[1.5rem]">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
