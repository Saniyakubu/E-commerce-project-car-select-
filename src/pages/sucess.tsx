import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
const SuccessPage = () => {
  return (
    <section className="flex h-[100svh] flex-col items-center bg-slate-900">
      <div className="flex flex-col items-center gap-5 pt-48">
        <h1 className=" text-3xl font-bold uppercase text-white">
          payment successful
        </h1>
        <div className=" mb-12">
          <FaCheckCircle className="text-5xl text-green-500" />
        </div>
        <Link
          className="flex w-52 justify-center rounded-3xl bg-green-500 p-5 text-lg font-bold text-white"
          to={"/"}
        >
          Home
        </Link>
      </div>
    </section>
  );
};

export default SuccessPage;
