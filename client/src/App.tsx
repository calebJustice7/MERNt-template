import { AuthProvider } from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AbilityProvider } from "./context/AbilityContext";
import AppRouterProvider from "./router";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AbilityProvider>
          <ToastContainer position="top-left" pauseOnHover={false} />
          <AppRouterProvider queryClient={queryClient} />
        </AbilityProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
