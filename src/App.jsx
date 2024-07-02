import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Home, Trash2 } from "lucide-react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./layouts/sidebar"; // Use sidebar layout
import Notes from "./pages/Notes";
import Trash from "./pages/Trash";

const queryClient = new QueryClient();

export const navItems = [
  {
    title: "Notes",
    to: "/",
    icon: <Home className="h-4 w-4" />,
  },
  {
    title: "Trash",
    to: "/trash",
    icon: <Trash2 className="h-4 w-4" />,
  },
];

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Notes />} />
              <Route path="trash" element={<Trash />} />
            </Route>
          </Routes>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;