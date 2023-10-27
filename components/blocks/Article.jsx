import Image from "next/image";
export default function Block({ block }) {
  const description =
    "<p><strong>This is fill in text. It is here temporarily.</strong></p><br /><p style='text-indent: 20px'>This is fill in text. It is here temporarily, and will be replaced with the proper text shortly. It is repeated many times so we will see what the website will look like with text.This is fill in text. It is here temporarily, and will be replaced with the proper text shortly. It is repeated many times so we will see what the website will look like with text.This is fill in text. It is here temporarily, and will be replaced with the proper text shortly. It is repeated many times so we will see what the website will look like with text.</p><br /><p style='text-indent: 20px'>This is fill in text. It is here temporarily, and will be replaced with the proper text shortly. It is repeated many times so we will see what the website will look like with text.This is fill in text. It is here temporarily, and will be replaced with the proper text shortly.</p><p style='text-indent: 20px'>This is fill in text. It is here temporarily, and will be replaced with the proper text shortly.</p><br /><p style='text-indent: 20px'>It is repeated many times so we will see what the website will look like with text.This is fill in text. It is here temporarily, and will be replaced with the proper text shortly.</p>";

  return (
    <div className="w-full pt-8 pb-16 bg-[#FFFFFF]">
      <div
        className="max-w-xl m-auto px-4 xl:px-0 font-poppins text-[#555555]"
        dangerouslySetInnerHTML={{ __html: description }}
      ></div>
    </div>
  );
}
