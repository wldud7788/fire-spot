export interface SearchState {
  searchValue: string;
  validatedValue: string;
  validationError: string | null;
  selectedRegion?: string;
}
