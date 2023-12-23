interface FindQuery {
  where: object;
  sort?: string | { [key: string]: SortOrder } | [string, SortOrder][];
  page?: number;
  pageSize?: number;
}
