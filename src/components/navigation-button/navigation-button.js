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

/**
 * NavigationButton Component
 * 
 * This component represents a navigation button in the sidebar.
 * It displays an icon, a label (name), and navigates to a specified route when clicked.
 * 
 * @param {Object} props - Component properties.
 * @param {string} props.icon - The icon name to display.
 * @param {string} props.name - The label text for the button.
 * @param {string} props.to - The route to navigate to when clicked.
 * 
 * @returns {JSX.Element} - A navigation button component.
 */

export default function NavigationButton({
  icon,
  name,
  to,
}) {

  // Object mapping icon names to actual icon components
  const icons = {
    RiBarChartBoxLine: <RiBarChartBoxLine color="black" size={30} />,
    LuCircuitBoard: <LuCircuitBoard color="black" size={30} />,
    GiLed: <GiLed color="black" size={30} />,
    IoIosNotifications: <IoIosNotifications color="black" size={30} />,
    BsGraphUp: <BsGraphUp color="black" size={30} />,
    LiaUserCogSolid: <LiaUserCogSolid color="black" size={30} />
  };

  // Get the current sidebar state from Redux store
  const { sidebar } = useSelector((store) => store.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div
      className={`link-button mx-3 my-4 d-flex align-items-center p-3 py-4 
        ${sidebar === name ? "active" : ""    // Highlight active button
        }`}
      onClick={() => {
        dispatch(switchSidebar({ sidebar: name }));   // Update sidebar state in Redux
        navigate(to);
      }}
    >
      {icons[icon]}   {/* Render the selected icon */}
      <h5 className="my-0 ms-3 fw-bold button-name">{name}</h5>
      <IoIosArrowForward className="ms-auto stroke-custom arrow-icon" />
    </div>
  );
}
