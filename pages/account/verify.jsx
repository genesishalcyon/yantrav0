import Link from "next/link";
import AccountVerifiedIcon from "@/components/svg/AccountVerifiedIcon";
import persistentStore from "@/lib/store/persistentStore";
import globalState from "@/lib/store/globalState";
export default function AccountVerify() {
  const profile = persistentStore((state) => state.profile);
  const ready = globalState((state) => state.ready);
  return (
    <div className="p-12">
      <div className="w-full max-w-xl h-full max-h-[458px] mx-auto py-24 bg-[#FFFFFF] rounded-[8px] border-[1px] border-solid border-[#CBCBCB]">
        <div className="flex flex-col items-center justify-center">
          <AccountVerifiedIcon />
          <h1 className="font-poppins text-[#231F20] text-[40px] leading-[60px] font-[600] my-4 tracking-[2px]">
            {`Your account is now verified!`}
          </h1>
          <p className="text-[#555] text-[16px] font-[400] leading-[23px] tracking-[0.48px]">
            This is fill in text. It is here temporarily, and will be replaced
            with the proper text shortly.
          </p>
          {ready && (
            <Link
              href={profile ? "/" : "/login"}
              className="mt-12 mb-8 w-[285px] h-[51px] flex justify-center items-center rounded-[50px] bg-[#315589] font-poppins text-[#FFFFFF] text-[16px] leading-[24px] font-[700] tracking-[0.8px]"
            >
              {profile ? "Back to Home" : "Login"}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
