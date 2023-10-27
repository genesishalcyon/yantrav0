import Link from "next/link";
import RegistrationFailedIcon from "@/components/svg/RegistrationFailedIcon";
export default function RegistrationSuccess() {
  return (
    <div className="p-12">
      <div className="w-full max-w-xl h-full max-h-[458px] mx-auto py-24 bg-[#FFFFFF] rounded-[8px]">
        <div className="flex flex-col justify-center items-center">
          <RegistrationFailedIcon className="text-center" />
          <h1 className="font-poppins text-[#555555] text-[40px] leading-[60px] font-[600] my-4">
            Registration Failed
          </h1>
          <p className="font-poppins text-[#555555] text-[16px] leading-[23px]">
            There was an error in creating your account. Please try again.
          </p>
          <Link
            href="/register"
            className="mt-12 mb-8 w-[177px] h-[51px] flex justify-center items-center rounded-[8px] bg-[#D81B60] font-poppins text-[#FFFFFF] text-[16px] leading-[24px] font-[600]"
          >
            Try again
          </Link>
        </div>
      </div>
    </div>
  );
}
