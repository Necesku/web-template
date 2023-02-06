<script>
    export default {
        props: {
            dc_nickname: String
        }
    }
</script>

<template>
    <div style="float: right" class="auto01">
        <div class="card auto00">
            <h1 class="nmt">INFO</h1>
            <p>Logged in as {{ dc_nickname }}</p>
        </div>
    </div>
</template>

<style scoped>
    @import "../assets/main.css";
    .auto01 {
        margin-top: -5em;
    }
    @media screen and (max-width: 600px) {
        .auto00 {
            float: none;
        }
        .auto01 {
            margin-top: 2em;
            width: 100%;
        }
    }
</style>