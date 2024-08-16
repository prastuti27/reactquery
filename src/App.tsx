import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FetchData from "./components/FetchData"; // Import the FetchData component

const queryClient = new QueryClient(); // Initialize QueryClient with parentheses

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <FetchData />
    </QueryClientProvider>
  );
}

export default App;
