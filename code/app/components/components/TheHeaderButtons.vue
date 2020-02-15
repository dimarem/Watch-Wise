<template>
    <div class="control-buttons">
        <!-- кнопка вызывающая фильтр отображаемых товаров -->
        <button 
            v-if="buttonFilterRequired" 
            @click="$emit('show-filter')"
        >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><circle cx="256" cy="256" r="64"/><circle cx="256" cy="448" r="64"/><circle cx="256" cy="64" r="64"/></g></svg>
        </button>
        <!-- кнопка вызывающая корзину покупок -->
        <button 
            @click="$emit('show-cart')" 
            class="cart-button"
        >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -31 512.00033 512"><g><path d="m166 300.003906h271.003906c6.710938 0 12.597656-4.4375 14.414063-10.882812l60.003906-210.003906c1.289063-4.527344.40625-9.390626-2.433594-13.152344-2.84375-3.75-7.265625-5.964844-11.984375-5.964844h-365.632812l-10.722656-48.25c-1.523438-6.871094-7.617188-11.75-14.648438-11.75h-91c-8.289062 0-15 6.710938-15 15 0 8.292969 6.710938 15 15 15h78.960938l54.167968 243.75c-15.9375 6.929688-27.128906 22.792969-27.128906 41.253906 0 24.8125 20.1875 45 45 45h271.003906c8.292969 0 15-6.707031 15-15 0-8.289062-6.707031-15-15-15h-271.003906c-8.261719 0-15-6.722656-15-15s6.738281-15 15-15zm0 0" data-original="#000000" class="active-path" data-old_color="#000000" fill="#FFFFFF"/><path d="m151 405.003906c0 24.816406 20.1875 45 45.003906 45 24.8125 0 45-20.183594 45-45 0-24.8125-20.1875-45-45-45-24.816406 0-45.003906 20.1875-45.003906 45zm0 0" data-original="#000000" class="active-path" data-old_color="#000000" fill="#FFFFFF"/><path d="m362.003906 405.003906c0 24.816406 20.1875 45 45 45 24.816406 0 45-20.183594 45-45 0-24.8125-20.183594-45-45-45-24.8125 0-45 20.1875-45 45zm0 0" data-original="#000000" class="active-path" data-old_color="#000000" fill="#FFFFFF"/></g> </svg>
            <!-- содержит количество позиций в корзине -->
            <transition name="quantity-container">
                <span v-if="cartLength">
                    <transition 
                        name="quantity" 
                        mode="out-in"
                    >
                        <i :key="cartLength">{{ cartLength }}</i>
                    </transition>
                </span>
            </transition>
        </button>
    </div>
</template>

<script>
    /**
     * Данный компонент формирует кнопки управления
     * в заголовке страницы.
     */
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
        }
    }
</script>

<style lang="scss">
    .control-buttons {
        button {
            cursor: pointer;
            position: relative;
            border: none;
            outline: none;
            color: white;
            font-family: "PlayfairDisplay-Regular";
            background-color: transparent;

            &.cart-button {
                position: relative;
            }

            svg {
                width: 1.3rem;
                height: 1.3rem;
                fill: white;
            }

            span {
                box-sizing: border-box;
                position: absolute;
                left: 50%;
                top: 50%;
                min-width: 25px;
                padding: 1px 8px 6px;
                color: black;
                line-height: 1;
                font-family: "PlayfairDisplay-Medium";
                font-size: 1rem;
                background-color: white;
                border-radius: 3px;
                box-shadow: -3px -3px 5px rgba($color: #000, $alpha: .5);
                overflow: hidden;
                animation: bounce 5s ease 5s infinite;

                i {
                    display: block;
                    font-style: normal;
                }
            }
                
            .quantity-container-enter-active {
                animation: bounce-in .2s;
            }

            .quantity-container-leave-active {
                animation: bounce-in .2s reverse;
            }

            @keyframes bounce-in {
                0% {
                    transform: scale(0);
                }
                50% {
                    transform: scale(1.5);
                }
                100% {
                    transform: scale(1);
                }
            }

            @keyframes bounce {
                0% {
                    transform: translateY(0);
                }
                5% {
                    transform: translateY(-10px);
                }
                6% {
                    transform: translateY(0);
                }
                7% {
                    transform: translateY(7px);
                }
                8% {
                    transform: translateY(0);
                }
                9% {
                    transform: translateY(4px);
                }
                10% {
                    transform: translateY(0);
                }
            }

            .quantity-enter {
                transform: translateY(-100%);
            }

            .quantity-leave-to {
                transform: translateY(100%);
            }

            .quantity-enter-active, .quantity-leave-active {
                transition: .2s ease;
            }
        }
    }
</style>
