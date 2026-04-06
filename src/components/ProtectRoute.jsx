import { Navigate } from "react-router";
import useUserStore from "@/stores/userStore";

export const ProtectRoute = ({ children, allowRoles }) => {
    const { user, token } = useUserStore();

    // 1. Check if user is logged in
    if (!token || !user) {
        return <Navigate to="/auth/login" />;
    }
    if (allowRoles && !allowRoles.includes(user.role)) {
        return <Navigate to="/barfront" />;
    }

    return children;
};