import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import WebRoutes from "./Routes/WebRoutes";
import AdminRoutes from "./Routes/AdminRoutes";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/*" element={<WebRoutes />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
