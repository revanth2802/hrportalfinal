import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  if (isLoading) {
    console.log("ProtectedRoute: Data is being loaded...");
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    loginWithRedirect({
      appState: { returnTo: window.location.pathname }
    });
    return null;
  }

  return children;
}

export default ProtectedRoute;
