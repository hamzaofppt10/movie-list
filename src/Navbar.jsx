import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom";
import { BookmarkIcon, MenuIcon, Moon, Sun } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "./redux/moviesReducer";
const Navbar = () => {
    const [total , setTotal] = useState()
    const watchlist = useSelector(state => state.movies.watchList)
    useEffect(() =>{
        setTotal(watchlist.length)
    } , [watchlist])
    const mode = useSelector(state => state.movies.mode)
    const dispatch = useDispatch()
  return (
    <div className={mode ? " " : "dark"}>

      <nav className="bg-background border-b ">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0">
                <span className="text-2xl font-bold text-primary">Logo</span>
              </Link>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link
                    to="/"
                    className="text-foreground hover:bg-accent hover:text-accent-foreground px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Home
                  </Link>
                  <Link
                    to="/about"
                    className="text-foreground hover:bg-accent hover:text-accent-foreground px-3 py-2 rounded-md text-sm font-medium"
                  >
                    About
                  </Link>
                  <Link
                    to="/contact"
                    className="text-foreground hover:bg-accent hover:text-accent-foreground px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Contact
                  </Link>
                </div>
              </div>
            </div>

            <div className="relative flex gap-3">
                   
              <Button variant="outline" size="icon" onClick={() => dispatch(toggleDarkMode())}>
                {mode ? <Moon className="text-foreground"/> : <Sun className="text-foreground"/>}
              </Button>

              <Button variant="outline" size="icon">
                <Link to={'/watchlist'}>
                <span className="w-5 h-5 bg-red-500 absolute top-0 right-0 text-white rounded-full text-xs flex items-center justify-center">{total}</span>
                <BookmarkIcon className="h-6 w-6 text-foreground" />
                <span className="sr-only">Open menu</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
