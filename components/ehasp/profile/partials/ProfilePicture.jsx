import CameraIcon from "@/components/svg/CameraIcon";
import { useRef } from "react";
import CUSTOMERAPI from "@/lib/api/customer/request";
import { deserialize } from "@/lib/services/globalService";
import persistentStore from "@/lib/store/persistentStore";
import Image from "next/image";
export default function ProfilePicture({}) {
  const profile = persistentStore((state) => state.profile);
  const { data: auth, mutate: refetchProfile } = CUSTOMERAPI.getProfileSwr(
    "?include=media",
    {
      render: profile,
    }
  );
  const account = auth ? deserialize(auth) : {};
  const mediaRef = useRef("");
  return (
    <div className="relative w-full h-full">
      <Image
        alt="sample-avatar"
        src={account?.media?.[0]?.original_url || "/images/profile.jpeg"}
        fill
        className="object-cover object-center rounded-full"
      />
      <input
        accept="image/*"
        type="file"
        className="hidden"
        ref={mediaRef}
        onChange={(e) => {
          const chosenFiles = Array.prototype.slice.call(e.target.files);
          if (chosenFiles.length) {
            const formData = new FormData();
            formData.append(`profile_image`, chosenFiles[0]);
            CUSTOMERAPI.updateProfilePic(formData).then(() => {
              refetchProfile();
            });
          }
        }}
      />
      <div
        className="absolute bottom-[5px] right-[5px] w-[40px] h-[40px] bg-[#EBEBEB] rounded-full flex justify-center items-center cursor-pointer border border-[#CBCBCB]"
        onClick={() => {
          mediaRef.current.click();
        }}
      >
        <CameraIcon />
      </div>
    </div>
  );
}
