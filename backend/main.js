const { request } = require('undici');
const express = require('express');
const { clientId, clientSecret, port, frontEndUrl } = require('./config.json');
let session = require('express-session')
const app = express();

app.use(session({
	secret: 'whenimpostor is su lmfao',
	resave: false,
	saveUninitialized: true,
}));

app.get('/authorize', async (req, res) => {

	const { code } = req.query;

	if (code) {
		try {
			const tokenResponseData = await request('https://discord.com/api/oauth2/token', {
				method: 'POST',
				body: new URLSearchParams({
					client_id: clientId,
					client_secret: clientSecret,
					code,
					grant_type: 'authorization_code',
					redirect_uri: `http://localhost:${port}/authorize`,
					scope: 'identify',
				}).toString(),
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			});

			const oauthData = await tokenResponseData.body.json();
			req.session.token_type = oauthData.token_type;
			req.session.token = oauthData.access_token;
			res.redirect(`${frontEndUrl}?token=${oauthData.access_token}&token_type=${oauthData.token_type}`);
		} catch (error) {
			console.error(error);
		}
	}
	return;
});

app.listen(port, () => {console.log(); console.log(` LOG | Listening on port ${port}`); console.log();});