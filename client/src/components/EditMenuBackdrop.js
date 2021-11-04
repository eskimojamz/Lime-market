export default function EditMenuBackdrop({ toggleMenu, setToggleMenu, handleEdit, handleDelete }) {
    const toggle = () => {
        setToggleMenu(!toggleMenu);
    };
    
    return (
        <>
        
            <div className={`edit-menu-backdrop ${toggleMenu && "edit-menu-backdrop-show"}`} onClick={toggle}>
                <div className={`edit-menu-mobile ${toggleMenu && "edit-menu-mobile-open"}`}>
                    <button className="button-menu-edit" onClick={handleEdit}><h5 >Edit</h5></button>
                    <button className="button-menu-delete" onClick={handleDelete}><h5>Delete</h5></button>
                </div>
            </div>
        
        </>
  );
}