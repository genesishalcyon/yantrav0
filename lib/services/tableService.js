export function onPaginate(page) {
  setPagination({
    ...page,
  });
}
export function onSort(data) {
  setSort(data);
}

export const accountParams = {
  "page[size]": pagination?.per_page,
  "page[number]": pagination?.current_page,
  sort: sort,
};
