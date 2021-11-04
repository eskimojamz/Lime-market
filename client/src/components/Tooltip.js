import "../css/Tooltip.css";

export default function Tooltip({ content, toggleTooltip, setToggleTooltip }) {
    const toggle = () => {
        setToggleTooltip(!toggleTooltip);
    };
    
    return (
        <>
        {toggleTooltip && (
            <div className="modal-backdrop" onClick={toggle}>
                <div className="tooltip-content fade-in">
                    <p>{content}</p>
                </div>
            </div>
        )
        }
        </>
  );
}