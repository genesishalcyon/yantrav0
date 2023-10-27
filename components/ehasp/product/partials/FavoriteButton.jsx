import FavoriteIcon from "@/components/svg/FavoriteIcon";
import FavoriteFilledIcon from "@/components/svg/FavoriteFilledIcon";
import LoadingIcon from "@/components/svg/LoadingIcon";
import FAVORITEAPI from "@/lib/api/favorites/request";
import globalState from "@/lib/store/globalState";
import persistentStore from "@/lib/store/persistentStore";
import favoriteStore from "@/lib/store/favoriteStore";
import { Fragment, useState } from "react";
export default function FavoriteButton({
  product,
  className,
  favoriteColor = "#FFFFFF",
  unfavoriteColor = "#FFFFFF",
  callbackAction = () => {},
}) {
  const productIds = favoriteStore((state) => state.productIds);
  const [status, setStatus] = useState(
    productIds.some((n) => n === product.id)
  );
  const [loading, setLoading] = useState(false);
  const profile = persistentStore((state) => state.profile);
  const showAuthModal = globalState((state) => state.showAuthModal);
  const triggerFavorite = async () => {
    if (profile) {
      setLoading(true);
      if (status) {
        await FAVORITEAPI.remove(product.id)
          .then(() => {
            favoriteStore.setState({
              productIds: productIds.filter((n) => n != product.id),
            });
            setStatus(false);
            callbackAction();
          })
          .catch(() => {
            favoriteStore.setState({
              productIds: productIds.filter((n) => n != product.id),
            });
            setStatus(false);
            callbackAction();
          });
      } else {
        await FAVORITEAPI.add({
          product_id: product.id,
        })
          .then(() => {
            favoriteStore.setState({
              productIds: [...productIds, product.id],
            });
            setStatus(true);
            callbackAction();
          })
          .catch(() => {
            favoriteStore.setState({
              productIds: [...productIds, product.id],
            });
            setStatus(true);
            callbackAction();
          });
      }
      setLoading(false);
    } else {
      showAuthModal("login");
    }
  };

  return (
    <button onClick={triggerFavorite} className={className}>
      {loading ? (
        <LoadingIcon className="h-5 w-5" />
      ) : (
        <Fragment>
          {status && profile ? (
            <FavoriteFilledIcon fill={favoriteColor} />
          ) : (
            <FavoriteIcon fill={unfavoriteColor} />
          )}
        </Fragment>
      )}
    </button>
  );
}
