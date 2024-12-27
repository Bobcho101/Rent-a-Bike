import { html, renderInMain } from "../lib/lit-html.js";
import app from '../firebase/firebase-config.js';
import { auth } from '../firebase/firebase-config.js';
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js';
import { saveUserData } from "../utils/userUtils.js";
import { takenEmailAlert } from "../utils/alerts.js";
import page from "../lib/page.js";

const template = (onSubmit) => html`
       <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company">
    <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form @submit=${onSubmit} class="space-y-6" action="#" method="POST">
      <div>
        <label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>
        <div class="mt-2">
          <input type="email" name="email" id="email" autocomplete="email" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
          <!-- <div class="text-sm">
            <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
          </div> -->
        </div>
        <div class="mt-2">
          <input type="password" name="password" id="password" autocomplete="current-password" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
        </div>
      </div>
      <div class="flex items-center justify-between">
          <label for="password" class="block text-sm/6 font-medium text-gray-900">Repeat Password</label>
          <div class="text-sm">
            <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
          </div>
        </div>
        <div class="mt-2">
          <input type="password" name="re-pass" id="re-pass" autocomplete="current-password" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
        </div>
      <div>
        <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
      </div>
    </form>

    <p class="mt-10 text-center text-sm/6 text-gray-500">
      Not a member?
      <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Start a 14 day free trial</a>
    </p>
  </div>
</div>
`;


export default async function signInView(ctx) {
    renderInMain(template(signInSubmitHandler));
}

async function signInSubmitHandler(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');
    const rePass = formData.get('re-pass');

    if(password.length < 6) return alert('Password must be at least 6 characters!');
    
    if(rePass !== password) return alert('Password missmatched!');

    try{
        const userCreditental = await createUserWithEmailAndPassword(auth, email, password);
        const accessToken = userCreditental.user.accessToken;
        const uid = userCreditental.user.uid;
        saveUserData(accessToken, email, uid);
        page.redirect('/');
    } catch(err){
        console.log(err.message);
        alert(takenEmailAlert);
    }
}