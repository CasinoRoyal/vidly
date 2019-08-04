export const paginate = (items, pageNumber, pageSize) => {
  const lastItemIndex = pageNumber * pageSize;
  const firstItemIndex =  lastItemIndex - pageSize;
  const currentItems = items.slice(firstItemIndex, lastItemIndex);

  return currentItems;
}