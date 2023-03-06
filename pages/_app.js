
import '../styles/globals.css'
import { PlasmicRootProvider } from "@plasmicapp/react-web";
import Head from "next/head";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function MyApp({ Component, pageProps }) {
  const notify = () => toast("Wow so easy!");
  return (
    <PlasmicRootProvider Head={Head}>
      <Component {...pageProps} />
      <ToastContainer
      position="top-right"
      autoClose={1000}
      hideProgressBar={true}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      />
    </PlasmicRootProvider>
  );
}

export default MyApp
  