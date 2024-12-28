import { database, get, ref } from "../firebase/firebase-config.js";
import { renderInMain, html } from "../lib/lit-html.js";

const template = (bike) => html`
<div id="bike-container">
    <div id="info-box">
        <h1>Model: ${bike.model}</h1>
        <h2>Price per hour: ${bike.price} BGN</h2>
    </div>
    <img src="${bike.imageUrl}">
<div>
`;



export default async function detailsView(ctx) {
    const bike = await loadBike(ctx.params.itemID);
    renderInMain(template(bike));
}
async function loadBike(itemID) {
    const bikeRef = ref(database, `Bikes/${itemID}`);
    const res = await get(bikeRef);
    const data = await res.val();
    return data;
}