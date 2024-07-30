import { useCallback, useState } from "react";
import { methodGet } from "./services/api_call";
import { ProfileIcon } from "./home";
import { Link } from "react-router-dom";
import { debounce } from "./services/debounce";
import { LoadingIcon } from "./common-component/loading";

export const SearchInput = () => {
  const [search, setSearch] = useState("");

  const [isFocused, setIsFocused] = useState(false);
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const debouncedSearch = useCallback(
    debounce(async (searchValue) => {
      try {
        await getSearchResults(searchValue);
      } catch (err) {
        console.error(err);
      }
    }, 1000),
    []
  );

  function handleSearch(e) {
    const value = e.target.value;

    setSearch(value);

    setLoading(true);
    // debouncing handle here for search user
    debouncedSearch(value);
  }

  async function getSearchResults(query) {
    if (query.trim() === "") {
      // Clear results if search is empty
      setResult("");
      setLoading(false);
      return;
    }

    try {
      const { res, data } = await methodGet(`/search?user=${query}`);

      if (res.ok) {
        setResult(() => data);
      }else{
        setResult("");
      }
    } catch (err) {
      console.error(err);
      setResult("");
    }

    setLoading(false);
  }

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search"
        className="px-3 w-[200px] py-1 bg-[#fafafa] rounded-sm focus:w-[300px] transition-all duration-700 ease-in-out"
        onChange={handleSearch}
        value={search}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
      />

      <div
        className={`absolute border-2 w-[100%] bg-[#fff]  transition-all duration-200 ease-in-out p-3 ${
          isFocused && search ? "max-h-[40vh] opacity-100 overflow-auto" : "h-[0] opacity-0 "
        }`}
      >
        {loading ? (
          <LoadingIcon />
        ) : !result.length ? (
          <div>No result found</div>
        ) : (
          <div className="flex flex-col gap-3 py-2">
            {result.map(({ id, username, profilePhoto, fullname }) => {
              return (
                <div key={id}>
                  <Link to={`/${username}`}>
                    <ProfileIcon
                      photo={profilePhoto}
                      username={username}
                      fullName={fullname}
                      text="follow"
                      width={40}
                      height={40}
                    />
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
