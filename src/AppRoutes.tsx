

import {  Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./layout/Layout";
import BidFormPage from "./pages/BidFormPage";
import HotelsPage from "./pages/HotelsPage";
import ReadyBidPage from "./pages/ReadyBidPage";
import ReadyBid from "./components/readyBids/ReadyBid";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import ProtectedRoute from "./auth/ProtactedRoute";
import UpdateHotelsForm from "./forms/UpdateHotelsForm/UpdateHotelsForm";
import UpdateMainFormPage from "./pages/UpdateMainFormPage";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route
        path="/form/:formName"
        element={
          // <Layout>
            <ReadyBid />
          // </Layout>
        }
      />

      <Route element={<ProtectedRoute />}>
        <Route
          path="/bid-page"
          element={
            <Layout>
              <BidFormPage />
            </Layout>
          }
        />

        <Route
          path="/ready-bids"
          element={
            <Layout>
              <ReadyBidPage />
             </Layout>
          }
        />

        <Route
          path="/hotels"
          element={
            <Layout>
              <HotelsPage />
            </Layout>
          }
        />

        <Route
          path="/update-hotel"
          element={
            <Layout>
              <UpdateHotelsForm />
            </Layout>
          }
        />
        <Route
          path="/update-main-form"
          element={
            <Layout>
              <UpdateMainFormPage />
            </Layout>
          }
        />
      </Route>

      <Route path="/auth-callback" element={<AuthCallbackPage />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
