import React from "react";

import { loader } from "../assets";

interface LoaderProps {
  title: string;
}

const Loader: React.FC<LoaderProps> = ({ title }) => (
  <div className="w-full flex justify-center items-center flex-col">
    <img src={loader} alt="loader" className="w-32 h-32 object-contain" />
    <h1 className="text-white">{title || "Loading..."}</h1>
  </div>
);

export default Loader;
