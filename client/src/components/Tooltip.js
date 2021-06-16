import React, { useState } from "react";
import "../css/Tooltip.css";

export default function Modal({ content, toggle, setToggle }) {
    const toggleModal = () => {
        setToggle(!toggle);
    };
    return (
        <>
        {toggle && (
            <div className="tooltip-content">
                <p>{content}</p>
            </div>
        )}
        </>
  );
}