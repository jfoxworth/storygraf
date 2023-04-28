import "../styles/globals.css";
import { UserProvider } from "../Contexts/UserContext";
import { SourceProvider } from "../Contexts/SourceContext";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navbar";

export default function App({ Component, pageProps }) {
  return (
    <>
      <UserProvider>
        <SourceProvider>
          <Navbar />
          <div style={{ height: "80px" }} />
          <Component {...pageProps} />
        </SourceProvider>
      </UserProvider>
    </>
  );
}
