import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedNotification from "./protectedNotification";
import Loader from "../components/Loader/Loader";

const Dashboard = lazy(() =>
  import("../screens/Dashboard/Dashboard/Dashboard")
);

const User = lazy(() => import("../screens/Dashboard/Users/User"));
const Reports = lazy(() => import("../screens/Dashboard/Reports/Reports"));
const Notification = lazy(() =>
  import("../screens/Dashboard/Notification/Notification")
);
const Message = lazy(() => import("../screens/Dashboard/Message/Message"));
const UsageAnalytics = lazy(() =>
  import("../screens/Dashboard/UsageAnalytics/UsageAnalytics")
);
const DummyDashboard = lazy(() => import("../screens/Dashboard/Dummy/Dummy"));
const Upload = lazy(() => import("../screens/Dashboard/Uploads/Upload"));
const Files = lazy(() => import("../screens/Dashboard/Files/Files"));
const Tableau = lazy(() => import("../screens/Dashboard/Tableau/Tableau"));

const Index = () => {
  return (
    <>
      <React.Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/*" element={<Dashboard />} />
          <Route path="/viewUsers" element={<User />} />
          <Route path="/viewReports" element={<Reports />} />
          <Route path="/dummyDashboard" element={<DummyDashboard />} />
          <Route path="/dashboard" element={<Tableau />} />
          {/* <Route path="/viewNotifications" element={<Notification />} /> */}
          <Route
            exact
            path="/viewNotifications"
            element={
              <ProtectedNotification>
                <Notification />
              </ProtectedNotification>
            }
          />
          <Route path="/viewUploads" element={<Upload />} />
          <Route path="/uploadFiles/:id" element={<Files />} />
          <Route path="/viewMessages" element={<Message />} />
          <Route path="/usage-analytics" element={<UsageAnalytics />} />
        </Routes>
      </React.Suspense>
    </>
  );
};

export default Index;
