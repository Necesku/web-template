<script setup>
    import rightcard from './components/rightcard.vue'
</script>

<script>
    export default {
        data() {
            return { dc_nickname: "LOADING#0000" }
        },
        mounted() {
            if (!sessionStorage.getItem("token")) {
                let fragment = new URLSearchParams(window.location.search);
                console.log(fragment.toString());
	            const token = fragment.get("token");
                const token_type = fragment.get("token_type");
                if (token && token_type) {
                    sessionStorage.setItem("token", token);
                    sessionStorage.setItem("token_type", token_type);
                }
            } else {
                document.getElementById("login").hidden = true;
                fetch('https://discord.com/api/users/@me', {
                    headers: {
                        authorization: `${sessionStorage.getItem("token_type")} ${sessionStorage.getItem("token")}`,
                    },
                }).then(result => result.json()).then(response => {
                    const { username, discriminator } = response;
                    this.dc_nickname = ` ${username}#${discriminator}`;
                    document.getElementById("rightcard").hidden = false;
                }).catch(console.error);
            }
        }
    }
</script>

<template>
    <div class="container" style="margin-top: 13em;">
        <h1 style="font-size: 3vmax;" class="nmb">WebBase</h1>
        <a id="login" href="https://discord.com/oauth2/authorize?client_id=1071503014713622662&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauthorize&response_type=code&scope=guilds%20identify">login</a>
        <rightcard :dc_nickname="dc_nickname" id="rightcard" hidden></rightcard>
    </div>
</template>