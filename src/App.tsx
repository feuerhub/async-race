import { Routes, Route } from "react-router-dom";

import { Header } from "./components";
import { Garage, Winners } from "./views";

export function App() {
  return <>
    <Header />
    <Routes>
      <Route path="/garage" element={<Garage />} />
      <Route path="/winners" element={<Winners />} />
    </Routes>
  </>;
}