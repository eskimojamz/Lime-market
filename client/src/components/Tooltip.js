import React, { useState } from "react";
import "../css/Tooltip.css";

export default function Tooltip({ content, toggle, setToggle }) {
    const toggleModal = () => {
        setToggle(!toggle);
    };
    
    return (
        <>
        {toggle && (
            <div className="modal-backdrop" onClick={toggleModal}>
                <div className="tooltip-content fade-in">
                    <p>{content}</p>
                </div>
            </div>
        )
        }
        </>
  );
}