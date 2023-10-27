import globalData from "@/lib/preBuildScripts/static/globalData.json";
import EmailIcon from "@/components/svg/EmailIcon";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const { tenantDetails, seedmenus, aboutmenus } = globalData;

  const menus2 = seedmenus?.parentNodes || [];

  const menus3 = aboutmenus?.parentNodes || [];

  const logo = tenantDetails?.data?.main?.logo;

  const description = tenantDetails?.data?.main?.description;

  const payments = tenantDetails?.data?.main?.payments;

  const background = tenantDetails?.data?.main?.background_image;

  return (
    <div className="flex flex-col w-full">
      <div
        style={{
          backgroundImage: `url(${background})`,
        }}
        className="bg-center bg-no-repeat bg-cover"
      >
        <section className="w-full max-w-xl px-4 py-8 mx-auto gap-x-4 gap-y-10 md:gap-y-12 md:py-12 xl:px-0">
          <div className="flex flex-col items-center w-full xl:justify-between xl:flex-row gap-y-[80px]">
            <div className="flex flex-col items-center xl:items-start text-center flex-nowrap xl:text-left sm:w-[60%] md:w-[90%] lg:w-[80%] xl:w-[27%]">
              <Link
                prefetch={false}
                href="/"
                className="relative w-full max-w-[170px] md:max-w-[180px] h-[50px] md:h-[60px]"
              >
                <Image alt="logo" src={logo} fill />
              </Link>
              <div
                className="mt-4 font-poppins text-[#555555] text-[12px] font-[400] leading-[23px] tracking-[0.36px]"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </div>
            <div className="flex gap-x-[100px] flex-col md:flex-row text-center md:text-start gap-y-12">
              <div className="flex flex-col flex-nowrap gap-y-6">
                <p className="font-poppins text-[#555555] text-[16px] leading-[23px] font-[700] tracking-[0.48px]">
                  Seed Bank
                </p>
                {menus2.map((menu, i) => (
                  <Link key={i} href={menu.url} prefetch={false}>
                    <p className="font-poppins text-[#555555] text-[14px] leading-[23px] font-[400] tracking-[0.42px]">
                      {menu.label}
                    </p>
                  </Link>
                ))}
              </div>
              <div className="flex flex-col flex-nowrap gap-y-6">
                <p className="font-poppins text-[#555555] text-[16px] leading-[23px] font-[700] tracking-[0.48px]">
                  About us
                </p>
                {menus3.map((menu, i) => (
                  <Link key={i} href={""} prefetch={false}>
                    <p className="font-poppins text-[#555555] text-[14px] leading-[23px] font-[400] tracking-[0.42px]">
                      {menu.label}
                    </p>
                  </Link>
                ))}
              </div>
              <div className="flex flex-col col-span-2 flex-nowrap gap-y-6 xl:col-span-1">
                <p className="font-poppins text-[#555555] text-[16px] leading-[23px] font-[700] tracking-[0.48px]">
                  Contact Us:
                </p>
                <div className="flex items-center flex-nowrap">
                  <EmailIcon width={13} height={10} />
                  <p className="ml-2 font-poppins text-[#555555] text-[14px] leading-[21px] font-[400] tracking-[0.7px]">
                    michael@yantraseeds.com
                  </p>
                </div>
                <div className="flex items-center justify-center md:justify-start flex-nowrap mt-[10px]">
                  {payments.map((payment, i) => (
                    <Image
                      className="inline"
                      key={i}
                      alt={payment.title}
                      src={payment.logo}
                      width={82}
                      height={34}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="bg-[#D7DEE3] pt-[16px] pb-[18px] font-poppins text-[#555555] text-[12px] leading-[23px] px-4 xl:px-0">
        <div className="flex flex-col sm:flex-row text-center md:text-start items-center justify-between h-full max-w-xl px-4 mx-auto md:px-0">
          <p>
            All rights reserved. Copyright 2023 Yantra Pty Ltd | ABN 15167270082
          </p>
          <p>Website powered by eHASP</p>
        </div>
      </div>
    </div>
  );
}
