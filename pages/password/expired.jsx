import AuthLayout from "@/components/ehasp/auth/AuthLayout";
import ClockIcon from "@/components/svg/ClockIcon";
export default function PasswordExpired() {
  return (
    <AuthLayout backgroundImage="/images/yantra1.webp">
      <div className="w-full h-full max-w-[562px] max-h-[407px] border-[1px] border-[#bababa] rounded-[8px] px-8 py-16 bg-[#FFFFFF] custom-box-shadow flex justify-center items-center">
        <div className="flex flex-col gap-y-8">
          <div className="m-auto">
            <ClockIcon />
          </div>
          <h1 className="text-center text-[#231F20] text-[40px] leading-[60px] font-[600] tracking-[0.1em]">
            Link Expired
          </h1>
        </div>
      </div>
    </AuthLayout>
  );
}
