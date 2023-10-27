import Link from "next/link";
import TAXONOMYAPI from "@/lib/api/taxonomy/request";
import { deserialize } from "@/lib/services/globalService";
export default function Brands() {
  const { data, isValidating: brandLoading } = TAXONOMYAPI.findTaxonomySwr(
    "brands",
    "&",
    {
      revalidateOnFocus: false,
    }
  );
  const brands = data ? deserialize(data) : [];
  return (
    <div className="py-12">
      <div className="m-auto max-w-xl px-4 xl:px-0">
        <p className="text-[30px] font-bold mb-6">Select Brand</p>

        {brandLoading ? (
          <div className="py-12">
            <div className="w-fit m-auto text-sm">Loading...</div>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-6">
            {brands?.parentTerms?.map((brand, i) => (
              <Link key={i} href={`/products?brand=${brand.id}`}>
                <div className="flex flex-col p-4 text-center border-[1px] border-[#b3b3b3] rounded-lg">
                  <div className="w-full h-[100px] border-[1px] border-[#b3b3b3] rounded-md"></div>
                  <p>{brand.name}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
