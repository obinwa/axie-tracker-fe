import { useContext } from "react";
import Sidebar from "./components/sidebar";
import LoaderContext from "./loaderContext";
import Modal from "./components/UI/modal";
import Loader from "./components/UI/loader";
const Layout = ({ children }) => {
  const { isLoading } = useContext(LoaderContext);
  return (
    <>
      <div className="layout">
        <div className="layout__container">
          <div className="layout__sidebar">
            <Sidebar />
          </div>
          <main className="layout__main">{children}</main>
        </div>
      </div>
      {isLoading && (
        <Modal>
          <Loader />
        </Modal>
      )}
    </>
  );
};

export default Layout;
