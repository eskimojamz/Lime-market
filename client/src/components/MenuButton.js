import { motion } from "framer-motion";
import React from "react";

const Path = (props) => (
  <motion.path
    fill="transparent"
    strokeLinecap="round"
    strokeWidth="4"
    {...props}
  />
);

const transition = { duration: 0.5, ease: "easeIn" };

const MenuButton = ({ toggle, profileOpen }) => {
  return (
    <div className="mobile-menu-button" onClick={toggle}>
      {/* <svg
        width="35"
        height="35"
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      > */}
      {/* <motion.rect
          width="60"
          height="60"
          rx="30"
          animate={profileOpen ? "open" : "closed"}
          initial={false}
          variants={{
            closed: { fill: "#74CD97" },
            open: { fill: "white" },
          }}
          transition={transition}
        /> */}
      {/* <motion.rect
          x="14"
          y="17"
          width="31"
          height="4"
          rx="2"
          animate={profileOpen ? "open" : "closed"}
          initial={false}
          variants={{
            closed: { fill: "rgba(0, 12, 115, 1)" },
            open: { fill: "#74CD97" },
          }}
          transition={transition}
        />
        <motion.rect
          x="14"
          y="28"
          width="31"
          height="4"
          rx="2"
          animate={profileOpen ? "open" : "closed"}
          initial={false}
          variants={{
            closed: { fill: "rgba(0, 12, 115, 1)" },
            open: { fill: "#74CD97" },
          }}
          transition={transition}
        />
        <motion.rect
          x="14"
          y="39"
          width="31"
          height="4"
          rx="2"
          animate={profileOpen ? "open" : "closed"}
          initial={false}
          variants={{
            closed: { fill: "rgba(0, 12, 115, 1)" },
            open: { fill: "#74CD97" },
          }}
          transition={transition}
        /> */}
      {/* </svg> */}
      {/* <svg width="23" height="23" viewBox="0 0 23 23">
          <Path
            animate={profileOpen ? "open" : "closed"}
            initial={false}
            variants={{
              closed: { d: "M 2 2.5 L 20 2.5", stroke: "hsl(0, 0%, 18%)" },
              open: { d: "M 3 16.5 L 17 2.5", stroke: "hsl(0, 0%, 18%)" },
            }}
            transition={transition}
          />
          <Path
            d="M 2 9.423 L 20 9.423"
            stroke="hsl(0, 0%, 18%)"
            animate={profileOpen ? "open" : "closed"}
            initial={false}
            variants={{
              closed: { opacity: 1 },
              open: { opacity: 0 },
            }}
            transition={transition}
          />
          <Path
            animate={profileOpen ? "open" : "closed"}
            initial={false}
            variants={{
              closed: { d: "M 2 16.346 L 20 16.346", stroke: "hsl(0, 0%, 18%)" },
              open: { d: "M 3 2.5 L 17 16.346", stroke: "hsl(0, 0%, 18%)" },
            }}
            transition={transition}
          />
        </svg> */}
      <span />
      <span />
      <span />
    </div>
  );
};

export default MenuButton;
