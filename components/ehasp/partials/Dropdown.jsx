import AUTHAPI from "@/lib/api/auth/request";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef } from "react";
import { useOnClickOutside } from "@/lib/services/globalService";

export default function Dropdown({ profile }) {
  const router = useRouter();
  const ref = useRef("");
  const [active, setActive] = useState(false);
  useOnClickOutside(ref, () => {
    setActive(false);
  });
  useEffect(() => {
    setActive(false);
  }, [router]);
  return (
    <div ref={ref} className="relative" data-te-dropdown-ref>
      <button
        className="uppercase min-w-[150px] flex items-center justify-between whitespace-nowrap rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] motion-reduce:transition-none"
        type="button"
        id="dropdownMenuButton1"
        data-te-dropdown-toggle-ref
        aria-expanded="false"
        data-te-ripple-init
        data-te-ripple-color="light"
        onClick={() => setActive((value) => !value)}
      >
        {profile.first_name}
        <span className="ml-2 w-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </button>
      <ul
        className={`${
          active ? "block" : "hidden"
        } min-w-[150px] absolute z-[10] float-left mt-1 list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg [&[data-te-dropdown-show]]:block`}
        aria-labelledby="dropdownMenuButton1"
        data-te-dropdown-menu-ref
      >
        <li>
          <Link
            href="/account"
            className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100"
          >
            My Account
          </Link>
        </li>
        <li>
          <Link
            href="/account/favorites"
            className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100"
          >
            Favorites
          </Link>
        </li>
        <li>
          <Link
            href="/account/purchases"
            className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100"
          >
            Purchases
          </Link>
        </li>
        <li className="mt-1 border-t-[1px] border-[#cecece]">
          <button
            className="text-left block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100"
            onClick={() =>
              AUTHAPI.logout().then(() => {
                router.replace("/");
              })
            }
          >
            <p>Logout</p>
          </button>
        </li>
      </ul>
    </div>
  );
}
