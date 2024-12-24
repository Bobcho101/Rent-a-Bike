import page from "./lib/page.js";
import navMiddleware from "./middleware/navMiddleware.js";
import homeView from "./views/homeView.js";
import loginView from "./views/loginVIew.js";
import signInView from "./views/signInView.js";

page(navMiddleware);


page('/', homeView);
page('/sign-in', signInView);
page('/login', loginView);

page.start();