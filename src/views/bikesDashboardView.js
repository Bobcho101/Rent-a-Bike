import { database, get, ref } from "../firebase/firebase-config.js";
import { html, renderInMain } from "../lib/lit-html.js";


const template = (bikes) => html`
    <div id="bikes-container"> 
        ${bikes.map(bike => html`
        <div class="bike-box"> 
            <img class="bikes-img" src="${bike.imageUrl}"> 
            <h1>${bike.model}</h1>
            <h2>${bike.price}.00 BGN p/d</h2>
         </div>`)} 
    </div>
`;

export default async function dashboardView(ctx) {
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