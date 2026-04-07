export interface PaginatedResponse<T> {
  from: number;
  to: number;
  per_page: number;
  current_page: number;
  total_pages: number;
  total_items: number;
  has_more_pages: boolean;
  next_page: number | null;
  prev_page: number | null;
  results: T[];
}