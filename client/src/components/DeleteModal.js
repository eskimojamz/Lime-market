const DeleteModal = ({deleteModalOn}) => {
    return(
        <>
        { deleteModalOn && (
            <div className="delete-modal-backdrop">
                <div className="delete-modal-overlay">
                    <h3>Are you sure you want to delete this comment?</h3>
                    <button className="delete-modal-yes" >Yes</button>
                    <button className="delete-modal-no" >No</button>
                </div>
            </div>
        )}
        </>
    )
}

export default DeleteModal