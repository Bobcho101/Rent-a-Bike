import { signOut } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js';
import page from '../lib/page.js';
import { clearUserData } from '../utils/userUtils.js';
import { auth } from '../firebase/firebase-config.js';

export default async function logoutView(ctx) {
    await signOut(auth);
    clearUserData();
    page.redirect('/');
}