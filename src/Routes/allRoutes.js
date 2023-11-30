import HomePage from "../app/page";

const authProtectedRoutes = [];

const publicRoutes = [{ path: "/", component: HomePage }];

export { authProtectedRoutes, publicRoutes };
