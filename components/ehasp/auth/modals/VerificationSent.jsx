import RegistrationSuccessIcon from "@/components/svg/RegistrationSuccessIcon";

export default function VerificationLink() {
  return (
    <div className="relative w-full h-full max-w-[715px] max-h-[458px] bg-[#FFFFFF] rounded-[8px] z-[150] mx-auto py-16 px-14">
      <div className="flex flex-col justify-center items-center gap-y-6">
        <RegistrationSuccessIcon />
        <h1 className="text-[#555555] text-[40px] leading-[60px] font-[600] text-center">
          {`Verification Link has been sent!`}
        </h1>
        <p className="text-[#555555] text-[16px] leading-[23px] text-center">
          Kindly check your email inbox for the verification link.
        </p>
      </div>
    </div>
  );
}
