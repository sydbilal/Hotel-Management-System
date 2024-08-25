// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Navbar() {
  // const user = JSON.parse(localStorage.getItem("currentUser"));
  const user = JSON.parse(localStorage.getItem("Bearertoken"));

  function logout() {
    // JSON.parse(localStorage.removeItem("currentUser"));
    JSON.parse(localStorage.removeItem("Bearertoken"));
    window.location.href = "/";
  }

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-bold">
          BOOKHOTEL
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link to="/aboutus" className="text-white hover:text-gray-200">
              About
            </Link>
          </li>
          <li>
            <Link to="/contactus" className="text-white hover:text-gray-200">
              Contact
            </Link>
          </li>
          <li>
            <Link to="/adminlogin" className="text-white hover:text-gray-200">
              AdminLogin
            </Link>
          </li>
          {user ? (
            <>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:text-black ">
                    {user.name}
                    <ChevronDownIcon
                      className="-mr-1 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="py-1">
                    <MenuItem>
                      {({ focus }) => (
                        <a
                          href="#"
                          className={classNames(
                            focus
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          My Bookings
                        </a>
                      )}
                    </MenuItem>
                    <form method="POST" action="/">
                      <MenuItem>
                        {({ focus }) => (
                          <a
                            onClick={logout}
                            type="submit"
                            href="/login"
                            className={classNames(
                              focus
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block w-full px-4 py-2 text-left text-sm"
                            )}
                          >
                            Sign out
                          </a>
                        )}
                      </MenuItem>
                    </form>
                    <form method="POST" action="/">
                      <MenuItem>
                        {({ focus }) => (
                          <a
                            type="submit"
                            href="/adminlogin"
                            className={classNames(
                              focus
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block w-full px-4 py-2 text-left text-sm"
                            )}
                          >
                            Admin Login
                          </a>
                        )}
                      </MenuItem>
                    </form>
                  </div>
                </MenuItems>
              </Menu>
            </>
          ) : (
            <>
              <li>
                <Link to="/register" className="text-white hover:text-gray-200">
                  Register
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-white hover:text-gray-200">
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
