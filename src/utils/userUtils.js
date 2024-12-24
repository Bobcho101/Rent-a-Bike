export const saveUserData = (accessToken, email, uid) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('email', email);
    localStorage.setItem('uid', uid);
}