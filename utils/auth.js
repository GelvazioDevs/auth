export function checkAuth() {
    const currentUser = localStorage.getItem("currentUser");
    return !!currentUser;
}
