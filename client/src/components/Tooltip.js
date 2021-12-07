import "../css/Tooltip.css";
import loginPlease from '../assets/loginplease.svg'
import {Link} from 'react-router-dom'

export default function Tooltip({ content, toggleTooltip, setToggleTooltip }) {
    const toggle = () => {
        setToggleTooltip(!toggleTooltip);
    };
    
    return (
        <>
            <div className={`modal-backdrop ${toggleTooltip && "modal-backdrop-show"}`} onClick={toggle}>
                <div className={`tooltip-content ${toggleTooltip && "tooltip-content-open"}`}>
                    <p>{content}</p>
                    <img src={loginPlease} />
                    <Link to="/login">
                        <button className="button-primary">
                            Sign-in
                        </button>
                    </Link>
                </div>
            </div>
        </>
  );
}