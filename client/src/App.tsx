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
  const [location] = useLocation();
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-green-100 shadow-md py-2 border-t border-green-200 z-50 sm:hidden">
      <div className="flex justify-around items-center">
        <a 
          href="/" 
          className={`flex flex-col items-center ${location === '/' ? 'text-green-600' : 'text-gray-500'}`}
        >
          <HomeIcon className="h-5 w-5" />
          <span className="text-xs">Accueil</span>
        </a>
        <a 
          href="/relations" 
          className={`flex flex-col items-center ${location === '/relations' ? 'text-green-600' : 'text-gray-500'}`}
        >
          <HeartIcon className="h-5 w-5" />
          <span className="text-xs">Relations</span>
        </a>
        <a 
          href="/quetes" 
          className="flex flex-col items-center text-gray-500 opacity-50"
        >
          <ListTodo className="h-5 w-5" />
          <span className="text-xs">Quêtes</span>
        </a>
        <a 
          href="/calendrier" 
          className="flex flex-col items-center text-gray-500 opacity-50"
        >
          <CalendarIcon className="h-5 w-5" />
          <span className="text-xs">Calendrier</span>
        </a>
      </div>
    </div>
  );
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
