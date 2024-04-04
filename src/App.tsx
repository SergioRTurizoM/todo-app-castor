import "./App.css";
import { Header } from "./components/header";
import { Outlet } from "react-router-dom";
import Container from "@mui/material/Container";

function App() {
  const currentYeae = () => {
    return new Date().getFullYear();
  };
  return (
    <Container maxWidth="md">
      <Header />
      <main>
        <Outlet />
      </main>
      <footer style={{ textAlign: "center", marginTop: 100,  }}>

      </footer>
    </Container>
  );
}

export default App;
