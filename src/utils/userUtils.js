export const saveUserData = (accessToken, email, uid) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('email', email);
    localStorage.setItem('uid', uid);
}
export const clearUserData = () => {
    localStorage.clear();
}