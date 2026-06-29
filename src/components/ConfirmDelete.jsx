function ConfirmDelete({
  isOpen,
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">

        <h2>Delete User</h2>

        <p>
          Are you sure you want to delete this user?
        </p>

        <div className="modal-buttons">

          <button onClick={onConfirm}>
            Yes
          </button>

          <button onClick={onCancel}>
            No
          </button>

        </div>

      </div>
    </div>
  );
}

export default ConfirmDelete;