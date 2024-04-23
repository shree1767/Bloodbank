import React, { useState } from "react";
import { Link } from "react-router-dom";
import Lottie from "react-lottie";
import animationData from "../lotties/needBlood.json";
import animationData2 from "../lotties/donor.json";

const Landing = ({ isAuth }) => {
  const [donorHovered, setDonorHovered] = useState(false);
  const [needHovered, setNeedHovered] = useState(false);

  const needOptions = {
    loop: true,
    autoplay: false,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const donorOptions = {
    loop: true,
    autoplay: false,
    animationData: animationData2,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="md:flex justify-center items-center gap-8 h-screen bg-[#F7F7F7]">
      <Link
        to={isAuth ? "/donor" : "/login"}
        className="transition duration-300 text-center text-xl font-bold rounded-xl px-3 py-8 bg-white hover:shadow-2xl"
        onMouseEnter={() => setDonorHovered(true)} 
        onMouseLeave={() => setDonorHovered(false)}
      >
        <Lottie options={donorOptions} height={300} width={300} isPaused={!donorHovered} /> 
        <p>DONATE BLOOD</p>
      </Link>
      <Link
        to={isAuth ? "/reciever" : "/login"}
        className="transition duration-300 text-center text-xl font-bold rounded-xl px-3 py-8 bg-white hover:shadow-2xl"
        onMouseEnter={() => setNeedHovered(true)} 
        onMouseLeave={() => setNeedHovered(false)}
      >
        <Lottie options={needOptions} height={300} width={300} isPaused={!needHovered} /> 
        <p>NEED A DONOR ?</p>
      </Link>
    </div>
  );
};

export default Landing;

