import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { redirect, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Logout = () =>{
    localStorage.removeItem("userId")
    localStorage.removeItem("likes")
    dispatch(Logout())
    navigate("/login")
  }
  const userData = localStorage.getItem("userId")
  return (
    <header className={`flex w-full items-center justify-center mx-auto bg-gray-600 dark:bg-dark`}>
      <div className="container flex justify-center">
        <div className="relative -mx-4 flex items-center justify-between">
          <div className="w-60 max-w-full px-4">
            <div  className="block w-full py-8">
            </div>
          </div>
          <div className="flex w-full items-center justify-between px-4 ml-20">
            <div>
              <button
                onClick={() => setOpen(!open)}
                id="navbarToggler"
                className={` ${
                  open && "navbarTogglerActive"
                } absolute right-4 top-1/2 block ml-20 -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden`}
              >
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color dark:bg-white"></span>
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color dark:bg-white"></span>
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color dark:bg-white"></span>
              </button>
              <nav
                // :className="!navbarOpen && 'hidden' "
                id="navbarCollapse"
                className={`absolute right-4 z-10 top-full w-full max-w-[250px] rounded-lg bg-gray-600 px-6 py-5 shadow dark:bg-dark-2 lg:static lg:block lg:w-full lg:max-w-full lg:shadow-none lg:dark:bg-transparent ${
                  !open && "hidden"
                } `}
              >
                <ul className="  lg:flex">
                  <ListItem NavLink="/">Home</ListItem>
                  <ListItem NavLink="/seller">Sell</ListItem>
                  <ListItem NavLink="/buyer">Buy</ListItem>
                  <button onClick={Logout}>
                  <ListItem   NavLink="/login">{
                   userData ? "Logout" : "Login"
                  }</ListItem>
                  </button>
                </ul>
              </nav>
            </div>
            <div className="hidden justify-end pr-16 sm:flex lg:pr-0">
 

              {/* <button
                onClick={Logout}
                className="rounded-md bg-primary px-7 py-3 text-base font-medium text-white hover:bg-primary/90"
              >
                {
                  userData ? "Logout" : "Login"
                }
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

const ListItem = ({ children, NavLink  }) => {
  return (
    <>
      <li>
        <a
          href={NavLink}
          className={`flex py-2 text-base font-medium text-white hover:text-dark dark:text-dark-6 dark:hover:text-white lg:ml-12 lg:inline-flex`}
        >
          {children}
        </a>
      </li>
    </>
  );
};
