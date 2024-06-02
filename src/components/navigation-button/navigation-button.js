import React from "react";
import { RiBarChartBoxLine } from "react-icons/ri";
import { LuCircuitBoard } from "react-icons/lu";
import { GiLed } from "react-icons/gi";
import { IoIosNotifications } from "react-icons/io";
import { BsGraphUp } from "react-icons/bs";
import { LiaUserCogSolid } from "react-icons/lia";
import { IoIosArrowForward } from "react-icons/io";

import "./navigation-button.css";
import { useNavigate } from "react-router-dom";

export default function NavigationButton({
  icon,
  name,
  to,
  currentTab,
  setCurrentTab,
}) {
  const icons = {
    RiBarChartBoxLine: <RiBarChartBoxLine color="black" size={30} />,
    LuCircuitBoard: <LuCircuitBoard color="black" size={30} />,
    GiLed: <GiLed color="black" size={30} />,
    IoIosNotifications: <IoIosNotifications color="black" size={30} />,
    BsGraphUp: <BsGraphUp color="black" size={30} />,
    LiaUserCogSolid: <LiaUserCogSolid color="black" size={30} />,
  };

  const navigate = useNavigate();

  return (
    <div
      className={`link-button mx-3 my-4 d-flex align-items-center p-3 py-4 ${
        currentTab === name ? "active" : ""
      }`}
      onClick={() => {
        setCurrentTab(name);
        navigate(to);
      }}
    >
      {icons[icon]}
      <h5 className="my-0 ms-3 fw-bold button-name">{name}</h5>
      <IoIosArrowForward className="ms-auto stroke-custom arrow-icon" />
    </div>
  );
}
