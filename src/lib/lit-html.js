import { html, render } from "../../node_modules/lit-html/lit-html.js";

const header = document.querySelector("header");
const main = document.querySelector("main");

export const renderInHeader = (template) => render(template, header);
export const renderInMain = (template) => render(template, main);

export{
    html
}