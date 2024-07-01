// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

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
          {user ? (
                        <h1 className="text-white hover:text-gray-200">{user.name}</h1>

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
