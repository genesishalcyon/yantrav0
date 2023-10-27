export const maxQuantity = 50;

export function formatProduct(item) {
  return item.purchasable?.product || item.purchasable;
}

export function formatImage(item) {
  const attributes = item.media[0]?.attributes;
  return attributes;
}

export function findCombination(combination) {
  return combination
    ?.map(
      (e) => e.option_value?.charAt(0)?.toUpperCase() + e.option_value?.slice(1)
    )
    .join(", ");
}
