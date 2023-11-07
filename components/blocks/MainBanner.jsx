import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function Block({ block }) {
  const { title, description, button_label, button_link, image, mobile_image } =
    block?.main;

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, []);

  return (
    <section className="relative bg-white ">
      <div className="page-banner relative flex flex-col-reverse items-center w-full h-auto md:min-h-[418px]  md:flex-row z-[99]">
        <div className="flex relative -z-10 w-full md:min-h-[418px] bg-[#315589] md:trapezoid-right items-center">
          <div className=" flex justify-center items-center  w-full min-h-[380px] md:h-full md:w-[50%] p-5 lg:p-0">
            <div className="h-full flex flex-col justify-center items-center sm:items-start text-center sm:text-left relative gap-y-2 sm:gap-y-2 md:gap-y-4  sm:px-0  text-[#FFF] sm:w-[490px]">
              <p className="leading-[41px] text-[32px] lg:text-[45px] lg:leading-[50px] font-[700] lg:tracking-[2.25px]">
                {title}
              </p>
              <div className="flex flex-col gap-y-6 sm:gap-y-10">
                <div
                  className="text-[12px] leading-[20px] lg:text-[16px] font-[400] lg:leading-[23px] tracking-[0.48px]"
                  dangerouslySetInnerHTML={{ __html: description }}
                />
                <div>
                  <Link href={button_link}>
                    <button className="w-[178px] rounded-[21px] border-[1px] border-solid border-[#FFF] bg-[#315589] py-2 px-4 text-[14px] md:text-[16px] leading-[23px] font-[700] tracking-[0.48px]">
                      {button_label}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden xl:block absolute left-0 md:w-[53.5%] h-full -z-10">
            {isLoading ? (
              ""
            ) : (
              <Image
                alt="banner"
                src="/images/Mask_group.webp"
                width={100}
                height={100}
                priority
                className="object-cover w-full h-full"
              />
            )}
          </div>
        </div>

        <div className="relative flex justify-end w-full  md:h-full md:absolute -z-50">
          <picture className="w-full md:w-[50%] min-h-[250px] md:h-full">
            {/* <source media="(max-width:767px)" srcSet={mobile_image} /> */}
            <source media="(min-width:1351px)" srcSet={image} />
            <source
              media="(min-width:768px)"
              srcSet="/images/TyBviBlMbKbmekTGwuRdZkuWCY4sZy-metaMm9JNGh0RDNLZUcwMEQ3Z2dONm1pR2JRdDM3eUprLW1ldGFkR1Z6ZEM1M1pXSnctICgyKS53ZWJw.webp"
            />
            <source
              media="(min-width:413px)"
              srcSet="/images/announcement1.webp"
            />
            <source
              media="(max-width:412px)"
              srcSet="/images/announcement2.webp"
            />
            <Image
              src={mobile_image}
              alt="Flowers"
              width={500}
              height={260}
              loading="eager"
              placeholder="blur"
              priority
              className="object-cover w-full h-full"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAIAAAACUFjqAAABhWlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9bS4u0ONhBxCFDdbIgKiJOWoUiVAi1QqsOJpd+QZOGJMXFUXAtOPixWHVwcdbVwVUQBD9AXF2cFF2kxP8lhRYxHhz34929x907wN+sMtXsGQNUzTIyqaSQy68KoVeEMYAgopiRmKnPiWIanuPrHj6+3iV4lve5P0dUKZgM8AnEs0w3LOIN4qlNS+e8TxxjZUkhPiceNeiCxI9cl11+41xy2M8zY0Y2M08cIxZKXSx3MSsbKvEkcVxRNcr351xWOG9xVqt11r4nf2GkoK0sc53mEFJYxBJECJBRRwVVWEjQqpFiIkP7SQ//oOMXySWTqwJGjgXUoEJy/OB/8Ltbszgx7iZFkkDwxbY/hoHQLtBq2Pb3sW23ToDAM3Cldfy1JjD9SXqjo8WPgL5t4OK6o8l7wOUOMPCkS4bkSAGa/mIReD+jb8oD/bdA75rbW3sfpw9AlrpK3wAHh8BIibLXPd4d7u7t3zPt/n4Af25yrLJ4XoEAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAHdElNRQfnCBgFETuGUb30AAAAFUlEQVQY02P8//8/A27AxIAXjFRpAKXjAxH/0Dm5AAAAAElFTkSuQmCC"
            />
          </picture>
        </div>
      </div>
    </section>
  );
}
