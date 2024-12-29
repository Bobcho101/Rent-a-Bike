import { database, get, ref } from "../firebase/firebase-config.js";
import { renderInMain, html } from "../lib/lit-html.js";

const template = (bike, itemID, isOwner) => html`
<div id="container-and-back-button">
    <a href="/dashboard"><button>Back</button></a>
    
    <div id="bike-container">
        <div id="info-box">
            <h1>Model: ${bike.model}</h1>
            <h2>Price per hour: ${bike.price} BGN</h2>
            ${isOwner
                ? html` <div id="crud-box">
                            <a href="/dashboard/${itemID}/edit"><button id="edit-btn">Edit</button></a>
                            <a href="/dashboard/${itemID}/delete"><button id="delete-btn">Delete</button></a>
                        </div>`
                : html``
            }
            
        </div>
        <img src="${bike.imageUrl}">
    </div>
</div>
`;



export default async function detailsView(ctx) {
    const bike = await loadBike(ctx.params.itemID);
    const ownerID = bike.ownerID;
    const userID = localStorage.getItem('uid');
    const isOwner = userID === ownerID;

    renderInMain(template(bike, ctx.params.itemID, isOwner));
}
export async function loadBike(itemID) {
    const bikeRef = ref(database, `Bikes/${itemID}`);
    const res = await get(bikeRef);
    const data = await res.val();
    return data;
}