function SearchBar({ search, setSearch }) {
  return (
    <input
      type="text"
      placeholder="Search User..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}

export default SearchBar;