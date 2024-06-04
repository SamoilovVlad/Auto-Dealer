
const CookiesManagement = {
    getAutoListFromCookies() {
        const cookieName = "userCart=";
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            if (cookie.startsWith(cookieName)) {
                const autoListJSON = decodeURIComponent(cookie.substring(cookieName.length));
                return JSON.parse(autoListJSON);
            }
        }
        return [];
    },


    addAutosArrayToCookies(autos) {
        const autoListJSON = JSON.stringify(autos);

        const cookieName = "userCart";
        const expirationDays = 7;
        const date = new Date();
        date.setTime(date.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        const cookie = `${cookieName}=${autoListJSON}; ${expires}; path=/`;

        document.cookie = cookie;
    },

    addAutoToCookies(autoInfo, src) {
        const autosCart = CookiesManagement.getAutoListFromCookies();
        autoInfo.src = src;
        autosCart.push(autoInfo);
        CookiesManagement.addAutosArrayToCookies(autosCart);
    },



    deleteAutoFromCookies(adv_ID) {
        var autosCart = this.getAutoListFromCookies();
        const indexToDelete = autosCart.findIndex(auto => auto.adv_ID === adv_ID);
        autosCart.splice(indexToDelete, 1);

        CookiesManagement.addAutosArrayToCookies(autosCart);
    },

    checkIsAutoInCookies(adv_ID) {
        var autosCart = this.getAutoListFromCookies();
        const indexOfAuto = autosCart.findIndex(auto => auto.adv_ID === adv_ID);
        return indexOfAuto > -1 ? true : false;
    },

    clearAllCookies() {
        const cookies = document.cookie.split(';');

        cookies.forEach((cookie) => {
            const cookieName = cookie.split('=')[0].trim();

            document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
        });
    }
};

export default CookiesManagement;
