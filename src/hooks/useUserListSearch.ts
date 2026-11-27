import { useCallback, useState } from "react";
import useDebounce from "./useDebounce";

/**
 * Shared search state for admin user/agent list tables.
 * The admin users page only needs the general name/email search;
 * the user-id field is kept as an optional compatibility path for other admin screens.
 */
export function useUserListSearch() {
  const [search, setSearch] = useState("");
  const [searchId, setSearchId] = useState("");
  const debouncedSearch = useDebounce(search);
  const debouncedSearchId = useDebounce(searchId);
  const effectiveSearch = debouncedSearchId.trim() || debouncedSearch;

  const handleChangeSearch = useCallback((val: string) => {
    setSearch(val);
  }, []);

  const handleChangeSearchId = useCallback((val: string) => {
    setSearchId(val);
  }, []);

  const handleDeleteSearch = useCallback(() => {
    setSearch("");
  }, []);

  const handleDeleteSearchId = useCallback(() => {
    setSearchId("");
  }, []);

  const handleClearFilters = useCallback(() => {
    setSearch("");
    setSearchId("");
  }, []);

  return {
    search,
    searchId,
    effectiveSearch,
    debouncedSearchId,
    debouncedSearch,
    handleChangeSearch,
    handleChangeSearchId,
    handleDeleteSearch,
    handleDeleteSearchId,
    handleClearFilters,
  };
}

export default useUserListSearch;
