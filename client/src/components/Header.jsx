import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/realtor-logo.png";
import { useEffect, useState } from "react";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");

    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);
  return (
    <header className="bg-sky-700/40 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-2">
        <Link className="flex items-center gap-2 sm:gap-3" to="/">
          <img src={Logo} alt="logo" className="w-6 sm:w-8" />
          <h1 className="font-bold text-xs sm:text-lg flex">
            <span className="text-slate-500">move</span>
            <span className="text-slate-900">-in</span>
          </h1>
        </Link>
        <form
          onSubmit={handleSearchSubmit}
          className="bg-slate-100 p-1 sm:p-2 rounded-md sm:rounded-lg flex items-center"
        >
          <input
            type="text"
            name="headerSearch"
            id="headerSearch"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-40 sm:w-80"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className="text-slate-600" />
          </button>
        </form>
        <ul className="flex gap-4 ">
          <Link to="/">
            <li className="cursor-pointer hidden sm:inline text-slate-700 hover:font-medium">
              Home
            </li>
          </Link>
          {currentUser ? (
            <Link to="/profile">
              <img
                className="rounded-md h-6 w-6 sm:h-7 sm:w-7 object-cover"
                src={currentUser.profileImg}
                alt="user img"
              ></img>
            </Link>
          ) : (
            <Link to="/sign-in">
              <li className="cursor-pointer text-xs font-semibold sm:text-lg text-slate-700 hover:font-medium">
                Sing In
              </li>
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
}
