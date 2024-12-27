import { html, renderInMain } from "../lib/lit-html.js";


const template = (bikes) => html`
    <div id="bikes-container"> 
        ${bikes.map(bike => html`
        <div class="bike-box"> 
            <img class="bikes-img" src="${bike.imageUrl}"> 
            <h1>${bike.model}</h1>
            <h2>${bike.price}.00 BGN</h2>
         </div>`)} 
    </div>
`;

export default async function dashboardView(ctx) {
    const bikes = await getBikesFromData();

    renderInMain(template(bikes));
}

async function getBikesFromData() {
    
    const url = 'https://rent-a-bike-try-default-rtdb.europe-west1.firebasedatabase.app/Bikes.json';

    try{
        const res = await fetch(url);
        const data = await res.json();
        data.shift(); // removes the first el that is null
        return data;
    } catch(err){
        console.log(err.message);
    }
}
getBikesFromData();