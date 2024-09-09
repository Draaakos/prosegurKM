const Modal = ({ children, onClose }) => {
  const onCloseModal = () => {
    onClose(false);
  }

  const onClick = (evt) => {
    evt.stopPropagation();
  };

  return (
    <div className="modal" onClick={onCloseModal}>
      <div className="modal__content" onClick={onClick}>{children}</div>
    </div>
  )
}

export default Modal;
