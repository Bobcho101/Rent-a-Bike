import { database, get, ref } from "../firebase/firebase-config.js";
import { html, renderInMain } from "../lib/lit-html.js";


const template = (bikes) => html`
    <div id="bikes-container"> 
        ${bikes.map(bike => html`
        <div class="bike-box"> 
            <img class="bikes-img" src="${bike.imageUrl}"> 
            <h1>${bike.model}</h1>
            <h2>${bike.price} BGN p/d</h2>
            <a class="more-info" href="/dashboard/${bike.itemID}/details"><button>More Info</button></a>
         </div>`)} 
    </div>
`;

export default async function dashboardView(ctx) {
    renderInMain(html`<div class="lds-ring"><div></div><div></div><div></div><div></div></div>`);
    const bikes = await getBikesFromData();

    renderInMain(template(bikes));
}

async function getBikesFromData() {
    try{
        const dbRef = ref(database, "Bikes");
        const res = await get(dbRef);
        const data = await res.val();   
        return Object.values(data);
    } catch(err){
        console.log(err.message);
    }
}
getBikesFromData();