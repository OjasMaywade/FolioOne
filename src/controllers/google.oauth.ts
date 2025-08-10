import { app } from "../app.js";
import axios from "axios";

let sessionUser = null;
app.get('/auth/google',(req,res)=>{
    const redirectUrl = 'https://accounts.google.com/o/oauth2/v2/auth?' +
    new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        response_type: "code",
        scope: "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
    }).toString();
    res.redirect(redirectUrl);
});

app.get('/', async(req,res)=>{
    console.log(`Hello There`)
    res.send(`Hello`);
})
app.get('/auth/google/callback', async(req,res)=>{
    
    const code = req.query.code;

    if(!code){
    res.status(400).send('No code received')};

    try {
        // Step 3: Exchange code for access token
        const tokenRes = await axios.post('https://oauth2.googleapis.com/token', null, {
            params: {
                code,
                client_id: process.env.GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                redirect_uri: process.env.GOOGLE_REDIRECT_URI,
                grant_type: 'authorization_code'
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const { access_token } = tokenRes.data;

        // Step 4: Get user info
        const userInfoRes = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });

        sessionUser = userInfoRes.data; // simulate session
        console.log(sessionUser);
        res.redirect('/');
    } catch (err) {
        console.error(err.response?.data || err.message);
        res.status(500).send('Authentication failed');
    }
});