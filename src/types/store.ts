import { User } from './user';

export type AuthState = {
  user: User | null;
};

export type SearchState = {
  query: string;
};

export type CategoryState = {
  selectedCategory: string | null;
  selectedTag: string | null;
};

export type SortType = 'asc' | 'desc' | null;

export type SortState = {
  sort: SortType;
};

export type CartState = {
  count: number;
  items: Record<number, boolean>;
};

export type LikesState = {
  count: number;
  items: Record<number, boolean>;
};
