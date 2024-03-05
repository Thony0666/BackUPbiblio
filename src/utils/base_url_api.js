export function getUrlApi() {
    return process.env.REACT_APP_MY_API;
}
export function siteUrlApi(lien) {
    return process.env.REACT_APP_MY_API + '/' + lien;
}
export function siteUrlApiSansSlash(lien) {
    return process.env.REACT_APP_MY_API + lien;
}
