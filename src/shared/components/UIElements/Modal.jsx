import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import './Modal.css';
import Backdrop from './Backdrop';

const ModalOverlay = ({
  header,
  className,
  contentClass,
  footerClass,
  style,
  onSubmit,
  children,
  footer,
}) => {
  const content = (
    <div className={`modal ${className}`} style={style}>
      <header className={`modal__header ${header}`}>
        <h2>{header}</h2>
      </header>
      <form
        onSubmit={
          onSubmit
            ? onSubmit
            : (e) => {
                e.preventDefault();
              }
        }
      >
        <div className={`modal__content ${contentClass}`}>{children}</div>
        <footer className={`modal__footer ${footerClass}`}>{footer}</footer>
      </form>
    </div>
  );

  return ReactDOM.createPortal(
    content,
    document.getElementById('modal-container')
  );
};

const Modal = ({ show, onCancel, ...props }) => {
  return (
    <>
      {show && <Backdrop onClick={onCancel} />}
      <CSSTransition
        in={show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </>
  );
};

export default Modal;
