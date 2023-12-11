const host = 'https://discord-auth-tisb.onrender.com/';

const API = {
    discordUrl: '/auth/discord/url',
    refresh: '/auth/refresh',
    user: '/user'
}

const headers = new Headers();
headers.set('Content-Type', 'application/json');
headers.set('Accept', 'application/json');

const title = document.getElementById('title');
const loginLink = document.getElementById('login');

/**
 * 1. Get the discord auth url from the server
 * 2. If the jwt tocken has been set, request for refresh access tocken from the server
 * 3. Update the page with current username
 * 4. Logout the user if the logout link is clicked
 */

addEventListener('DOMContentLoaded', async () => {
    const initDiscordAuthUrl = await getDiscordAuthUrl(`${host}${API.discordUrl}`, { headers });    
    loginLink.setAttribute('href', initDiscordAuthUrl);

    const data = await refreshAccessToken(`${host}${API.refresh}`, { headers });
    // console.log(data);
    if (!data) return;
    
    // console.log(data.accessToken);
    const userAccessHeaders = {
        ...headers,
        'authorization': `Bearer ${data.accessToken}`,
    }
    
    const user = await updatePageWithUsername(`${host}${API.user}`, { headers: userAccessHeaders});
    title.textContent = 'Welcome Guest';

    if (user != null) {
        title.textContent = `Welcome ${user?.name}`;

        // convert the login link to logout link
        loginLink.firstElementChild.textContent = 'Logout';
        loginLink.setAttribute('href', '#');
        const logoutLink = loginLink;

        logoutLink.addEventListener('click', async (e) => {
            e.preventDefault();
            const response = await logoutUser(`${host}/auth/logout`, { headers: userAccessHeaders });
            if (response == null) return;
            title.textContent = 'Welcome Guest';
            loginLink.firstElementChild.textContent = 'Discord Login';
            loginLink.setAttribute('href', initDiscordAuthUrl);
            console.log(response);
        });        
    }

    
});


// Get the discord auth url from the server
async function getDiscordAuthUrl(url, options) {
    try {
        const response = await fetch(url,{ headers: options.headers });
        if (!response.ok) return null;
        const data = await response.json();
        return data.url;
    } catch (err) {
        // console.log(err);   
        return null;
    }
};


// If the jwt tocken has been set, request for refresh access token from the server
async function refreshAccessToken(url, options) {
    try {
        const response = await fetch(url, { headers: options.headers });
        if (!response.ok) return null;
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

// Update the page with current username
async function updatePageWithUsername(url , options) {
    try {
        const response = await fetch(url, { headers: options.headers });
        if (!response.ok) return null;
        const data = await response.json();
        return data;
    } catch (err) {
        // console.log(err);
        return null;
    }
}

// Logout the user
async function logoutUser(url, options) {
    try {
        const response = await fetch(url, options);
        if (!response.ok) return null;
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

