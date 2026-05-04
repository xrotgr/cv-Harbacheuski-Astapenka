export type GroupedByCategory<TItem> = {
  categoryId: string;
  items: TItem[];
};

export const groupItemsByCategoryId = <TItem>(
  items: TItem[],
  getCategoryId: (item: TItem) => string,
  sortItems: (a: TItem, b: TItem) => number
): GroupedByCategory<TItem>[] => {
  const map = new Map<string, TItem[]>();

  for (const item of items) {
    const categoryId = getCategoryId(item);
    const bucket = map.get(categoryId) ?? [];
    bucket.push(item);
    map.set(categoryId, bucket);
  }

  return [...map.entries()].map(([categoryId, categoryItems]) => ({
    categoryId,
    items: [...categoryItems].sort(sortItems),
  }));
};
