export { auth as middleware } from "@/auth"
export const config = {
    matcher: ["/login", "/register", "/", "/admin"],
};