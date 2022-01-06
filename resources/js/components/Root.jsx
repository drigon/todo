import React from "react";
import App from "./App";
import NavigationBar from "./NavigationBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NoMatch from "./pages/NoMatch";
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';
//mport { ReactQueryDevtools } from 'react-query/devtools';
//<ReactQueryDevtools initialIsOpen={false} />

export default function Root() {

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="todo-app-container">
          <NavigationBar />
          <div className="content">
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NoMatch />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
     
    </QueryClientProvider>
  );
}
