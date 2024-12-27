import page from "./lib/page.js";
import navMiddleware from "./middleware/navMiddleware.js";
import dashboardView from "./views/bikesDashboardView.js";
import homeView from "./views/homeView.js";
import loginView from "./views/loginVIew.js";
import logoutView from "./views/logoutView.js";
import sellBikeView from "./views/sellBikeView.js";
import signInView from "./views/signInView.js";

page(navMiddleware);


page('/', homeView);
page('/sign-in', signInView);
page('/login', loginView);
page('/logout', logoutView);
page('/dashboard', dashboardView);
page('/sell-bike', sellBikeView);

page.start();

