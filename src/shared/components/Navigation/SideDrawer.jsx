import './SideDrawer.css';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

const SideDrawer = ({ show, children }) => {
  const drawerElement = (
    <CSSTransition
      in={show}
      timeout={200}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
    >
      <aside className="side-drawer">{children}</aside>
    </CSSTransition>
  );

  return ReactDOM.createPortal(
    drawerElement,
    document.getElementById('drawer-container')
  );
};

export default SideDrawer;
