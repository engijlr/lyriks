import React, { FC, useState } from "react";
import { NavLink } from "react-router-dom";
import { HiOutlineMenu } from "react-icons/hi";
import { RiCloseLine } from "react-icons/ri";

import { logo } from "../assets";
import { links } from "../assets/constants";

interface NavLinksProps {
  handleClick?: () => void;
}

const NavLinks: FC<NavLinksProps> = ({ handleClick }) => (
  <div className="mt-10">
    {links.map((link) => (
      <NavLink
        key={link.name}
        to={link.to}
        className="flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-400 hover:text-cyan-400"
        onClick={() => handleClick && handleClick()}
        end
      >
        <link.icon className="w-6 h-6 mr-2" />
        {link.name}
      </NavLink>
    ))}
  </div>
);

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="md:flex hidden flex-col w-[240px] py-10 px-4 bg-[#191624]">
        <img src={logo} alt="logo" className="w-full h-14 object-contain" />
        <NavLinks />
      </div>

      <div className="absolute md:hidden block top-6 right-3">
        {mobileMenuOpen ? (
          <RiCloseLine
            className="w-6 h-6 text-white mr-2"
            onClick={() => setMobileMenuOpen(false)}
          />
        ) : (
          <HiOutlineMenu
            data-testid="hamburger-menu"
            className="w-6 h-6 text-white mr-2"
            onClick={() => setMobileMenuOpen(true)}
          />
        )}
      </div>

      <div
        className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483d8b] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${
          mobileMenuOpen ? "left-0" : "-left-full"
        }`}
      >
        <img
          src={logo}
          alt="logo"
          className="w-full h-14 object-contain"
          data-testid="logo-mobile"
        />
        <NavLinks handleClick={() => setMobileMenuOpen(false)} />
      </div>
    </>
  );
};

export default Sidebar;
