import { Slide, ToastContainer as DefaultContainer } from "react-toastify";

const ToastContainer: React.FC = () => {
  return (
    <DefaultContainer
      bodyClassName={"font-sans font-bold"}
      position="bottom-right"
      hideProgressBar
      closeOnClick
      newestOnTop={true}
      transition={Slide}
      rtl={false}
      autoClose={1500}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover={false}
      theme="light"
    />
  );
};

export default ToastContainer;
