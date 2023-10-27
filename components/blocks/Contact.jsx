import BusinessHoursIcon from "@/components/svg/BusinessHoursIcon";
import OurLocationIcon from "@/components/svg/OurLocationIcon";
import ContactUsIcon from "@/components/svg/ContactUsIcon";
import ContactForm from "@/components/partials/forms/ContactForm";
import Image from "next/image";
export default function MainBanner({ block }) {
  const { form } = block?.main;

  const description =
    "<p><strong>This is fill in text.</strong><br /> <p>It is here temporarily, and will be replaced with the proper text shortly.</p><br /><p>It is repeated many times so we will see.</p>";
  const title = "Interested in our products? Request a Quote now!";
  return (
    <div className="relative z-50 w-full py-6 my-6">
      <div className="max-w-xl px-4 m-auto xl:px-0">
        <div className="flex flex-wrap justify-center gap-4 py-10 lg:flex-nowrap">
          <div className="w-full bg-[#FFFFFF] lg:w-[65%] flex flex-col gap-y-10 py-8 px-4 sm:p-14 shadow-[0px_4px_0px_0px_rgba(0,0,0,0.05)] border-[1px] border-solid border-[#CBCBCB] rounded-lg font-poppins">
            <p className="text-[#231F20] text-[24px] md:text-[40px] leading-[24px] md:leading-[60px] font-[600] text-center tracking-[2px]">
              {title}
            </p>
            <ContactForm form={form} />
          </div>
        </div>
      </div>
      <div className="absolute top-0 flex justify-center w-full h-full -z-10">
        <Image
          alt="yantra"
          src="/images/yantra_bg_contact.png"
          height={100}
          width={100}
          className="object-cover w-auto"
        />
      </div>
    </div>
  );
}
