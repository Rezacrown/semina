/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Link from "next/link";
import NavLink from "../NavLink";
import { useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie";
import Image from 'next/image'

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname()
  const [token, setToken] = useState("");
  const [username, setUsername] = useState({
    firstName: '',
    lastName: '',
  });


  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('user'))
  
    setUsername({
      firstName: data?.firstName,
      lastName: data?.lastName
    })

    return setToken(Cookies.get("token"));
  }, []);
  
  const handleLogout = () => {
    // console.log("click");
    Cookies.remove("token");
    localStorage.removeItem('user');
    pathname !== '/'  ? router.push('/') : router.refresh()
  };

  return (
    <nav className="container navbar navbar-expand-lg navbar-dark">
      <div className="container-fluid">
        <Link href={"/"} className="navbar-brand">
          <Image src="/images/logo.svg" alt="semina" width='100' height='80' />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div
            className={`navbar-nav ${
              pathname !== "/signin" ? "ms-auto" : "ms-5"
            } my-3 my-lg-0`}
          >
            <NavLink href={"/"}>Home</NavLink>
            <NavLink href={"#"}>Coming Soon Featured</NavLink>
            {/* <NavLink href={"/browse"}>Browse</NavLink>
            <NavLink href={"/stories"}>Stories</NavLink>
            <NavLink href={"/about"}>About</NavLink> */}
          </div>

          {pathname !== "/signin" && (
            <>
              {token ? (
                <div className="navbar-nav ms-auto">
                  <div className="nav-item dropdown d-flex flex-column flex-lg-row align-items-lg-center authenticated gap-3">
                    <span className="text-light d-none d-lg-block">
                      Hello, {`${username.firstName} ${username.lastName}`}
                    </span>

                    <a
                      className="nav-link dropdown-toggle mx-0 d-none d-lg-block"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <Image src="/images/avatar.png" alt="semina" width="60" height='60' />
                    </a>

                    <a
                      className="d-block d-lg-none dropdown-toggle text-light text-decoration-none"
                      data-bs-toggle="collapse"
                      href="#collapseExample"
                      role="button"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                    >
                      <Image src="/images/avatar.png" alt="semina" width="60" height='60' />
                    </a>

                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <li>
                        <Link href={"/dashboard"} className="dropdown-item">
                          Dashboard
                        </Link>
                      </li>
                      {/* <li>
                        <a className="dropdown-item" href="#">
                          Settings
                        </a>
                      </li> */}
                      {/* <li>
                        <a className="dropdown-item" href="/rewards">
                          Rewards
                        </a>
                      </li> */}
                      <li onClick={() => handleLogout()}>
                        <a className="dropdown-item">Sign Out</a>
                      </li>
                    </ul>

                    <div className="collapse" id="collapseExample">
                      <ul className="list-group">
                        <li>
                          <Link className="list-group-item" href="/dashboard">
                            Dashboard
                          </Link>
                        </li>
                        {/* <li>
                          <a className="list-group-item" href="/settings">
                            Settings
                          </a>
                        </li> */}
                        {/* <li>
                          <a className="list-group-item" href="/rewards">
                            Rewards
                          </a>
                        </li> */}
                        <li onClick={() => handleLogout()}>
                          <a className="list-group-item">Sign Out</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="d-grid">
                  <Link href={"/signin"} className="btn-navy">
                    Sign In
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
