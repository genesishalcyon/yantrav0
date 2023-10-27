import { useRef, useState } from "react";
import Image from "next/image";
import UploadIcon from "@/components/svg/UploadIcon";
import FORMAPI from "@/lib/api/forms/request";
import LoadingIcon from "@/components/svg/LoadingIcon";
import formStore from "@/lib/store/formStore";
import VideoPlayIcon from "@/components/svg/VideoPlayIcon";
export default function MediaUploadCustom({
  accept = "image/*",
  multiple = false,
  media = [],
  onAdd = () => {},
  onRemove = () => {},
  className = "w-full flex justify-center items-center h-[53px] gap-x-4 border-[1px] border-[#555555] rounded-[8px] font-poppins text-[#555555] text-[16px] leading-[23px] font-[600]",
}) {
  const mediaRef = useRef("");
  const [chosenFiles, setChosenFiles] = useState([]);
  const MediaDisplay = ({ file }) => {
    const { src, type, temp = false, tempSrc = "" } = file;
    if (type.includes("image")) {
      return (
        <Image
          alt="Product Media"
          src={temp ? tempSrc : src}
          fill
          className="object-cover object-center"
        />
      );
    } else if (type.includes("video")) {
      return (
        <div className="m-auto">
          <VideoPlayIcon fill="#000" />
        </div>
      );
      // <video width="200" height="200" controls>
      //   <source src={temp ? tempSrc : src} type="video/mp4" />
      //   Your browser does not support the video tag.
      // </video>
    }
    return "Unable to display";
  };

  const FindThumbnail = ({ file }) => {
    // const { type } = file;
    // if (type.includes("video")) {
    //   return <LoadingIcon className="m-auto h-5 w-5" />;
    // }
    return <LoadingIcon className="m-auto h-5 w-5" />;
  };

  const onChange = async (e) => {
    e.preventDefault();
    const handler = Array.prototype.slice.call(e.target.files) || [];
    if (handler.length) {
      setChosenFiles(handler);
      formStore.setState({ uploading: true });
      const tempHandler = await Promise.all(
        handler.map(async (file) => {
          const src = URL.createObjectURL(file);
          const { type, name } = file;
          const ext = name.split(".").pop();
          if (ext) {
            const res = await FORMAPI.gererateFileURL({
              ext,
              acl: "public-read",
            });
            const { presigned_url, object_key } = res?.data;
            await FORMAPI.uploadFileURL(presigned_url, file, type);
            return { src: object_key, type, temp: true, tempSrc: src };
          }
        })
      );
      setChosenFiles([]);
      formStore.setState({ uploading: false });
      onAdd([...media, ...tempHandler]);
    }
  };

  return (
    <div className="flex flex-col gap-y-4">
      <input
        accept={accept}
        type="file"
        className="hidden"
        multiple={multiple}
        onChange={onChange}
        ref={mediaRef}
      />

      <button className={className} onClick={() => mediaRef.current.click()}>
        <UploadIcon fill="#EE3424" />
        Upload Media
      </button>

      <div className="flex gap-x-2">
        {media.map((file, i) => (
          <div
            key={i}
            className="flex relative w-[100px] h-[100px] border-[1px] border-[#555555] rounded-[8px]"
          >
            <button
              className="absolute right-0 top-0 leading-[0px] z-10 font-bold -mr-[5px] -mt-[5px] text-white bg-[#D81B60] h-5 w-5 rounded-full"
              onClick={() => onRemove(i)}
            >
              &times;
            </button>
            <MediaDisplay file={file} />
          </div>
        ))}
        {chosenFiles.map((file, i) => (
          <div
            key={i}
            className="flex relative w-[100px] h-[100px] border-[1px] border-[#555555] rounded-[8px]"
          >
            <FindThumbnail file={file} />
          </div>
        ))}
      </div>
    </div>
  );
}
