export interface SearchBarProps {
  onSearch?: (filters: SearchFilters) => void;
}

export interface SearchFilters {
  query: string;
  description: string;
  actor: string;
  year: string;
  minRating: string;
}