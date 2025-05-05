import { Route as tsRoute } from "@tanstack/react-router";
import { Route as rootRoute } from "./__root";
import LoginPage from "../pages/LoginPage";

export const Route = new tsRoute({
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    getParentRoute: () => rootRoute,
    path: "login",
    component: LoginPage,
});
