import React from "react";

const Navbar = () => {
  return (
    <div className="w-screen gap-24 h-16 text-osu_text_white flex items-center px-6 bg-osu_purple ">
      <div>Navbar</div>
      <ul className="w-[90%] h-full flex items-center gap-16 px-6">
        <div className="rounded w-28 h-[80%] flex items-center justify-center hover:cursor-pointer hover:bg-osu_pink duration-300">
          Home
        </div>
        <div className="rounded w-28 h-[80%] flex items-center justify-center hover:cursor-pointer hover:bg-osu_pink duration-300">
          Leaderboard
        </div>
        <div className="rounded w-28 h-[80%] flex items-center justify-center hover:cursor-pointer hover:bg-osu_pink duration-300">
          Info
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
