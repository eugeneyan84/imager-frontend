import './SideDrawer.css';
import ReactDOM from 'react-dom';

const SideDrawer = ({ children }) => {
  const drawerElement = <aside className="side-drawer">{children}</aside>;

  return ReactDOM.createPortal(
    drawerElement,
    document.getElementById('drawer-container')
  );
};

export default SideDrawer;
