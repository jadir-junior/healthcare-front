interface IMeta {
  totalItems: number
  itemCount: number
  itemsPerPage: number
  totalPages: number
  currentPage: number
}

export interface IPagination<T> {
  items: T[]
  meta: IMeta
}
