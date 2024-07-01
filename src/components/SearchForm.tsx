interface IProps {
  query: string
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleClearSearch: () => void
}

export function SearchForm({ query, handleInputChange, handleClearSearch }: IProps) {
  return (
    <form onSubmit={(e) => e.preventDefault()} className="mb-4 flex justify-center">
      <input
        type="text"
        placeholder="Search for a movie..."
        value={query}
        onChange={handleInputChange}
        className="p-2 border rounded mb-2 w-3/4"
      />
      {query && (
        <button
          type="button"
          onClick={handleClearSearch}
          className="ml-2 p-2 text-gray-500 hover:text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </form>
  )
}