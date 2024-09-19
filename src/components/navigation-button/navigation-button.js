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
import { useDispatch, useSelector } from "react-redux";
import { switchSidebar } from "../../stores/auth/authSlice";

export default function NavigationButton({
  icon,
  name,
  to,
}) {
  const icons = {
    RiBarChartBoxLine: <RiBarChartBoxLine color="black" size={30} />,
    LuCircuitBoard: <LuCircuitBoard color="black" size={30} />,
    GiLed: <GiLed color="black" size={30} />,
    IoIosNotifications: <IoIosNotifications color="black" size={30} />,
    BsGraphUp: <BsGraphUp color="black" size={30} />,
    LiaUserCogSolid: <LiaUserCogSolid color="black" size={30} />
  };

  const { sidebar } = useSelector((store) => store.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div
      className={`link-button mx-3 my-4 d-flex align-items-center p-3 py-4 ${
        sidebar === name ? "active" : ""
      }`}
      onClick={() => {
        dispatch(switchSidebar({ sidebar: name }));
        navigate(to);
      }}
    >
      {icons[icon]}
      <h5 className="my-0 ms-3 fw-bold button-name">{name}</h5>
      <IoIosArrowForward className="ms-auto stroke-custom arrow-icon" />
    </div>
  );
}
