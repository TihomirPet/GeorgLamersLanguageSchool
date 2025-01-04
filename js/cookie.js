// // Funktionen für Cookies
// function setCookie(name, value, days) {
//   const date = new Date();
//   date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
//   const expires = 'expires=' + date.toUTCString();
//   document.cookie = `${name}=${value}; ${expires}; path=/`;
// }

// function getCookie(name) {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop().split(';').shift();
//   return null;
// }

// function checkCookie() {
//   const cookieBanner = document.getElementById('cookie-banner');
//   if (getCookie('cookies_accepted') === 'true') {
//     cookieBanner.style.display = 'none';
//   }
// }

// // Event Listener für Buttons
// document
//   .getElementById('accept-cookies')
//   .addEventListener('click', function () {
//     setCookie('cookies_accepted', 'true', 365); // Cookie 1 Jahr gültig
//     document.getElementById('cookie-banner').style.display = 'none';
//   });

// document
//   .getElementById('decline-cookies')
//   .addEventListener('click', function () {
//     setCookie('cookies_accepted', 'false', 365); // Ablehnung wird auch gespeichert
//     document.getElementById('cookie-banner').style.display = 'none';
//   });

// // Beim Laden der Seite prüfen
// checkCookie();


 // Funktionen für Cookies
        function setCookie(name, value, days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            const expires = "expires=" + date.toUTCString();
            document.cookie = `${name}=${value}; ${expires}; path=/`; // Gültig auf allen Unterseiten
        }

        function getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
            return null;
        }

        function checkCookie() {
            const cookieBanner = document.getElementById("cookie-banner");
            const cookieAccepted = getCookie("cookies_accepted");

            // Wenn Cookie bereits gesetzt ist, Banner nicht anzeigen
            if (cookieAccepted === "true" || cookieAccepted === "false") {
                cookieBanner.style.display = "none";
            } else {
                cookieBanner.style.display = "flex";
            }
        }

        // Event Listener für Buttons
        document.getElementById("accept-cookies").addEventListener("click", function () {
            setCookie("cookies_accepted", "true", 365); // Cookie 1 Jahr gültig
            document.getElementById("cookie-banner").style.display = "none";
        });

        document.getElementById("decline-cookies").addEventListener("click", function () {
            setCookie("cookies_accepted", "false", 365); // Ablehnung wird auch gespeichert
            document.getElementById("cookie-banner").style.display = "none";
        });

        // Beim Laden der Seite prüfen
        checkCookie();
