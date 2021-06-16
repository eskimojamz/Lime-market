import React, { useState, useEffect, useRef } from "react";
import "../css/Tooltip.css";

export default function Modal({ content, toggle, setToggle }) {
    const tooltip = useRef()

    const handleClickOutside = e => {
        if (tooltip.current.contains(e.target)) {
            return
            // inside click - do nothing
        }
        // outside click - toggle off
        setToggle(false)
    }

    useEffect(() => {
        if (toggle) {
            // if open, add event listener for outside
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            // else remove if closed
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            // remove if closed 
            document.removeEventListener("mousedown", handleClickOutside);
        };
        // on every toggle instance
      }, [toggle]);
    
    return (
        <>
        {toggle && (
            <div ref={tooltip} className="tooltip-content">
                <p>{content}</p>
            </div>
        )}
        </>
  );
}