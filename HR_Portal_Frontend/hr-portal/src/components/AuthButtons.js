import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

function LoginButton() {
    const { loginWithRedirect } = useAuth0();

    return <button onClick={() => loginWithRedirect()}>Sign In</button>;
}

function LogoutButton() {
    const { logout } = useAuth0();

    return (
        <button onClick={() => logout({ returnTo: window.location.origin })}>
            Sign Out
        </button>
    );
}

export { LoginButton, LogoutButton };
