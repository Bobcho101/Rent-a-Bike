import { database, ref, set , push} from "../firebase/firebase-config.js";
import { html, renderInMain } from "../lib/lit-html.js";
import page from "../lib/page.js";
import { emptyFieldsAlert, somethingWentWrongAlert } from "../utils/alerts.js";

const template = (onSubmit) => html`
    <div id="form-container">
        <form @submit=${onSubmit} id="sell-bike-form">
            <div class="sell-bike-form-el">
                <label for="model">Model: </label><input id="model" name="model" type="text">
            </div>
            <div class="sell-bike-form-el">
                <label for="image-url">Image URL: </label><input id="image-url" name="image-url" type="text">
            </div>
            <div class="sell-bike-form-el">
                <label for="price">Price per hour: </label><input id="price" name="price" type="number">
            </div>
            <button type="submit">Post</button>
        </form>
    </div>
`;

export default async function sellBikeView(ctx) {
    const isUser = checkForAccount();
    if(!isUser){
        page.redirect('/');
        return alert('You need an account to be able to sell bikes!');
    } 
    renderInMain(template(sellBikeSubmitHandler));
}
function checkForAccount(){
    const isUser = !!localStorage.getItem('accessToken');
    if(!isUser){
        return false
    } else{
        return true;
    };
    
}
async function sellBikeSubmitHandler(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const model = formData.get('model');
    const imageUrl = formData.get('image-url')
    const price = formData.get('price');

    if(model.trim() === "" || imageUrl.trim() === "" || price.trim() === "") return alert(emptyFieldsAlert);

    const userID = localStorage.getItem('uid');

    try{
        const dbRef = ref(database, "Bikes");
        const newItemRef = push(dbRef);
        const response = await set(newItemRef, {
            model,
            imageUrl,
            price,
            ownerID: userID
        });
        if(response !== undefined) return alert(somethingWentWrongAlert);
        page.redirect('/dashboard');
    } catch(err){
        console.log(err.message);
    }
}