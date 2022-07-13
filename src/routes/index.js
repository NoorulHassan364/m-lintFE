import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WebRoutes from "./webRoutes";

export default function Index() {
  return (
    <BrowserRouter>
      <React.Suspense>
        <Routes>
          <Route exact path="/*" element={<WebRoutes />} />
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
}
