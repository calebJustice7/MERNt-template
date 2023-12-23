import { BrowserRouter } from "react-router-dom";
import Routes from "./router/Routes";
import { AuthProvider } from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AbilityProvider } from "./context/AbilityContext";

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AbilityProvider>
            <Routes />
            <ToastContainer position="top-left" pauseOnHover={false} />
          </AbilityProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
