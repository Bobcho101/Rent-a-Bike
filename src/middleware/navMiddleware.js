import navView from "../views/navView.js";

export default async function navMiddleware(ctx, next) {
    navView();
    next();
}