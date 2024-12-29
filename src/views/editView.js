import { database, ref, set, update } from "../firebase/firebase-config.js";
import { html, renderInMain } from "../lib/lit-html.js";
import page from "../lib/page.js";
import { loadBike } from "./detailsView.js";

const template = (onSubmit, bike) => html`
<div id="edit-container">
    <form @submit=${onSubmit} id="edit-form">
        <div class="form-el">
            <label for="model">Model: </label>
            <input id="model" name="model" type="text" value="${bike.model}">
        </div>
        <div class="form-el">
            <label for="image-url">Image URL: </label>
            <input id="image-url" name="image-url" type="text" value="${bike.imageUrl}">
        </div>
        <div class="form-el">
            <label for="price">Price per hour: </label>
            <input id="price" name="price" type="number" value="${bike.price}">
        </div>
        <button type="submit">Edit</button>
    </form>
</div>
`;


export default async function editView(ctx) {
    const bike = await loadBike(ctx.params.itemID);
    renderInMain(template(editSubmitHandler.bind(ctx), bike));
}

async function editSubmitHandler(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const model = formData.get('model');
    const imageUrl = formData.get('image-url');
    const price = formData.get('price');
    const ownerID = localStorage.getItem('uid');
    const dbRef = ref(database, `Bikes/${this.params.itemID}`);
    try{
        await update(dbRef, {model, imageUrl, price, ownerID});
    } catch(err){
        console.log(err.message);
    }
   

    page.redirect(`/dashboard/${this.params.itemID}/details`);
}
