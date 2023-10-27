import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Layout from "@/components/ehasp/profile/Layout";
import RecommendedProducts from "@/components/ehasp/product/partials/RecommendedProducts";
import RemoveFavoritesIcon from "@/components/svg/RemoveFavoritesIcon";
import EmptyFavoritesIcon from "@/components/svg/EmptyFavoritesIcon";
import PageLoading from "@/components/page/PageLoading";
import FAVORITEAPI from "@/lib/api/favorites/request";
import { toast } from "react-toastify";
import { deserialize } from "@/lib/services/globalService";
import { currency } from "@/lib/services/currencyService";
import favoriteStore from "@/lib/store/favoriteStore";
export default function Favorites({}) {
  const [favoriteProduct, setFavoriteProduct] = useState(null);
  const productIds = favoriteStore((state) => state.productIds);

  const {
    data,
    isValidating: isLoading,
    mutate: reFetch,
  } = FAVORITEAPI.getFavoritesSwr(`?sort=-updated_at&include=product.media`, {
    revalidateOnFocus: false,
  });
  const favorites = data ? deserialize(data) : [];

  const removeFavorite = (favorite) => {
    const { product } = favorite;
    FAVORITEAPI.remove(product.id).then(() => {
      favoriteStore.setState({
        productIds: productIds.filter((n) => n != product.id),
      });
      reFetch();
      toast.success("Favorite Removed!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    });
  };

  return (
    <>
      <Layout>
        <div className="px-0 sm:px-10 sm:py-16 sm:rounded-[8px] sm:bg-[#FFFFFF] sm:border border-[#CBCBCB]">
          {data && (
            <>
              {favorites?.length === 0 ? (
                <div className="flex flex-col justify-center items-center gap-y-4 w-fit m-auto text-center min-h-[300px] font-poppins text-[#AAAAAA]">
                  <EmptyFavoritesIcon />
                  <p className="text-[40px] leading-[60px] font-[500]">{`Your Favorites List is empty!`}</p>
                  <p className="text-[16px] leading-[23px]">
                    Browse our catalogue and choose your favorites among our
                    collection.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-4 md:gap-y-14">
                  {favorites.map((favorite, i) => (
                    <div
                      key={i}
                      className="flex flex-col flex-wrap md:flex-row md:flex-nowrap gap-x-4"
                      onMouseEnter={() => setFavoriteProduct(favorite.id)}
                      onMouseLeave={() => setFavoriteProduct(null)}
                    >
                      <div className="relative shadow-md rounded-[8px]">
                        <Link href={`/products/${favorite?.product?.slug}`}>
                          <div className="relative w-full h-[190px] md:w-[150px] md:h-[150px] lg:w-[120px] lg:h-[120px]">
                            <Image
                              alt="Favorite"
                              src={
                                favorite?.product?.media?.[0]?.original_url ||
                                "/images/placeholder.webp"
                              }
                              fill
                              priority
                              className="object-cover object-center rounded-[8px]"
                            />
                          </div>
                          {favoriteProduct === favorite.id && (
                            <div className="absolute top-0 left-0 z-10 w-full h-full bg-[#0000004d] rounded-[8px]"></div>
                          )}
                        </Link>
                        <button
                          className="absolute z-20 top-[10px] left-[10px] bg-[#315589] rounded-full"
                          onClick={() => removeFavorite(favorite)}
                        >
                          <RemoveFavoritesIcon />
                        </button>
                      </div>
                      <div className="overflow-hidden text-ellipsis w-full mt-[2px] sm:my-2 flex flex-col sm:gap-y-2 font-poppins text-[#555555] text-[14px] leading-[21px]">
                        <Link
                          href={`/products/${favorite?.product?.slug}`}
                          className="font-[700] line-clamp-2"
                        >
                          {favorite.product.name}
                        </Link>
                        <p>{`${currency} ${favorite.product.selling_price}`}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </Layout>
      {favorites?.length === 0 && <RecommendedProducts />}
      {isLoading && <PageLoading />}
    </>
  );
}
