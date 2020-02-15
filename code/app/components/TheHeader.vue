<template>
    <header>
        <TheHeaderLabel @remove-header-curtain="headerCurtainRequired = false"/>
        <TheHeaderButtons 
            :buttonFilterRequired="buttonFilterRequired"
            :cartLength="cartLength"
            @show-filter="$emit('show-filter')"
            @show-cart="$emit('show-cart')" 
        />
        <transition name="header-curtain">
            <TheHeaderCurtain v-if="headerCurtainRequired"/>
        </transition>
    </header>
</template>

<script>
    /**
     * Компонент отображающий топ страницы.
     */
    import TheHeaderLabel   from "./components/TheHeaderLabel.vue";
    import TheHeaderButtons from "./components/TheHeaderButtons.vue";
    import TheHeaderCurtain from "./components/TheHeaderCurtain.vue";
    
    export default {
        props: {
            /**
             * Указывает на необходимость отображения кнопки
             * вызова фильтра отображаемых товаров.
             */
            buttonFilterRequired: {
                type: Boolean,
                required: false,
                default: false
            },
            /**
             * Количество товаров в корзине.
             */
            cartLength: {
                type: Number,
                required: false
            }
        },
        components: {
            TheHeaderLabel,
            TheHeaderButtons,
            TheHeaderCurtain
        },
        data() {
            return {
                headerCurtainRequired: true // {boolean} индикатор необходимости отображения "занавески" header
            }
        }
    }
</script>

<style lang="scss">
    header {
        box-sizing: border-box;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 2;
        display: flex;
        flex-flow: row wrap;
        justify-content: flex-end;
        align-items: center;
        padding: 1rem 2rem;
        background-color: rgb(25, 25, 25);

        // vue-анимации "занавески" топа
        .header-curtain-leave-to {
            opacity: 0;
        }

        .header-curtain-leave-active {
            transition: .3s ease;
        }
    }
</style>
