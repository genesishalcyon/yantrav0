import RegistrationSuccessIcon from "@/components/svg/RegistrationSuccessIcon";
export default function RegistrationSuccess() {
  return (
    <div className="p-12">
      <div className="w-full max-w-xl h-full max-h-[458px] mx-auto py-24 bg-[#FFF] rounded-[8px] border-[1px] border-solid border-[#CBCBCB]">
        <div className="flex flex-col justify-center items-center font-poppins text-[#555555] text-[14px] md:text-[16px] leading-[23px]">
          <RegistrationSuccessIcon />
          <h1 className="text-[#231F20] text-[28px] leading-[40px] md:text-[40px] md:leading-[60px] font-[500] text-center my-4">
            Account Created!
          </h1>
          <p className="text-center">
            You have successfully registered your new account.
          </p>
          <p className="text-center">
            Kindly check your inbox for the verification link we sent to your
            email address.
          </p>
        </div>
      </div>
    </div>
  );
}
