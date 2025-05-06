import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import Relations from "@/pages/Relations";
import NotFound from "@/pages/not-found";
import { CalendarIcon, HeartIcon, HomeIcon, InfoIcon, ListTodo } from "lucide-react";

function Navigation() {
  // Navigation supprimée comme demandé
  return null;
}

function Router() {
  return (
    <>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/relations" component={Relations} />
        <Route component={NotFound} />
      </Switch>
      <Navigation />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
