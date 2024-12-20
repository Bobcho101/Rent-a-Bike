import page from "./lib/page.js";
import homeView from "./views/homeView.js";


page('/', homeView);

page.start();