<template>
    <section 
        :class="{outdated}"
        class="curtain"
    >
        <article v-if="outdated">
            <h1>If you see this, it means you are using an outdated browser, use another one to launch this application</h1>
        </article>
    </section>
</template>

<script>
    /**
     * Задачей данного компонента, является
     * скрыть приложение до его полной готовности.
     */
    export default {
        props: {
            /**
             * Индикатор указывающий, что приложение запущено в устаревшем браузере.
             */
            outdated: {
                type: Boolean,
                required: true
            }
        }
    }
</script>

<style lang="scss" scoped>
    .curtain {
        box-sizing: border-box;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 100;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100vh;
        padding: 1rem;
        background-color: white;

        &.outdated {
            background-image: url("../assets/images/outdated.jpg");
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
        }

        article {
            max-width: 500px;
            color: white;
            text-shadow: 0 2px 5px rgba($color: #000, $alpha: 1);

            h1 {
                font-weight: normal;
                font-family: "PlayfairDisplay-Medium";
                text-align: center;
            }
        }
    }
</style>
