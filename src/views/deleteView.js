import { database, ref, remove } from "../firebase/firebase-config.js";
import page from "../lib/page.js";

export default async function deleteView(ctx) {
    const confirmAlert = confirm('Are you sure you want to delete this post!?'); 
    if(!confirmAlert)return;

    const itemID = ctx.params.itemID;
    const dbRef = ref(database, `Bikes/${itemID}`);
    try{
        await remove(dbRef);
        page.redirect('/dashboard');
    } catch(err){
        console.log(err.message);
    }
}