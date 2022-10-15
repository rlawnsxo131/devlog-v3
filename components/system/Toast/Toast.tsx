import { Flip, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Props {}

function Toast(props: Props) {
  return (
    <ToastContainer
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={true}
      transition={Flip}
      closeOnClick
      pauseOnHover
    />
  );
}

export default Toast;
