<template>
    <div class="total">
        Total amount: 
        <span ref="total" v-once>{{ total }}</span> 
        &pound;
    </div>
</template>

<script>
    /**
     * Данный компонент формирует область
     * содержащую общую сумму покупки.
     */
    import anime from "animejs/lib/anime.min.js";

    export default {
        props: {
            /**
             * Общая сумма покупки.
             */
            total: {
                type: String,
                required: true
            }
        },
        watch: {
            /**
             * Анимирует изменение общей суммы покупки.
             */
            total(newVal, oldVal) {
                let vm = this;
                
                anime({
                    targets: vm.$refs.total,
                    innerHTML: [oldVal, newVal],
                    easing: "linear",
                    duration: 300,
                    round: 100
                })
            }
        }
    }
</script>

<style lang="scss">
    .total {
        margin-bottom: 2rem;
        padding: 1rem 0;
        font-size: 1.3rem;
        font-family: "PlayfairDisplay-Medium";
        border-top: 1px dotted rgb(200, 200, 200);

            span {
                font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                font-weight: 500;
            }
        }

    // vue-анимации смены общей суммы покупки
    .total-amount-enter, .total-amount-leave-to {
        opacity: 0;
    }

    .total-amount-enter-active, .total-amount-leave-active {
        transition: .2s ease;
    }
</style>
