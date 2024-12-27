import { html, renderInMain } from "../lib/lit-html.js";

const template = () => html`

`;

export default async function sellBikeView(ctx) {
    renderInMain(template());
}
