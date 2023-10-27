import Image from "next/image";
export default function AuthLayout({ children, backgroundImage }) {
  return (
    <div className="relative w-auto bg-no-repeat bg-cover bg-center 2xl:bg-cover h-[500px] 2sm:h-[650px] sm:h-[900px] xl:h-[870px] py-3">
      <div className="flex absolute w-full h-full items-center justify-center">
        <Image
          alt="banner"
          src={backgroundImage}
          width={839}
          height={839}
          priority
          className="object-cover object-center"
        />
      </div>
      <div className="z-10 relative max-w-xl mx-auto h-full flex items-center justify-center p-4 xl:p-0">
        {children}
      </div>
    </div>
  );
}
