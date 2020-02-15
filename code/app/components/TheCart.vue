<template>
    <section 
        @click.self="hideCart"
        class="cart"
    >
        <div class="container">
            <!-- содержит кнопку закрывающую корзину -->
            <div class="header">
                <span>Cart</span>
                <TheCloseButton @hide="hideCart" />
            </div>
            <!-- содержимое корзины -->
            <div class="main">
                <transition name="cart-block" mode="out-in">
                    <!-- список товаров -->
                    <TheCartGoodsList
                        v-if="goodsListRequired"
                        :goods="goods"
                        :total="total"
                        @subtract="subtract"
                        @process-input="processInput"
                        @blur="blur"
                        @add="add"
                        @create-order="formRequired = true"
                    />
                    <!-- форма для создания заказа -->
                    <TheCartForm 
                        v-else-if="formRequired"
                        @hide-form="formRequired = false"
                        @create-order="createOrder"
                    />
                    <!-- корзина пуста -->
                    <p 
                        v-else 
                        class="padding-paragraph"
                    >Your cart is empty.</p>
                </transition>
            </div>
            <transition name="cart-notifier">
                <TheCartNotifier v-if="notifierRequired"/>
            </transition>
        </div>
    </section>
</template>

<script>
    /**
     * Компонент формирующий потребительскую корзину.
     */
    import TheCloseButton   from "./components/components/TheCloseButton.vue";
    import TheCartGoodsList from "./components/TheCartGoodsList.vue";
    import TheCartForm      from "./components/TheCartForm.vue";
    import TheCartNotifier  from "./components/TheCartNotifier.vue";

    export default {
        props: {
            /**
             * Массив содержащий товары корзины.
             */
            items: {
                type: Array,
                required: true,
                default: []
            }
        },
        components: {
            TheCloseButton,
            TheCartGoodsList,
            TheCartForm,
            TheCartNotifier
        },
        data() {
            return {
                goods: this.items.slice(), // {array} копия массива с товарами
                formRequired: false,       // {boolean} индикатор необходимости отображения формы для создания заказа
                notifierRequired: false,   // {boolean} индикатор необходимости отображения уведомителя об отправке заказа
            }
        },
        computed: {
            /**
             * Рассчитывает общюю сумму покупки.
             * 
             * @return {string}
             */
            total() {
                let amount = 0;

                for (let i = 0; i < this.goods.length; i++) {
                    amount += this.goods[i].price * this.goods[i].quantity;
                }

                return amount.toFixed(2);
            },
            /**
             * Устанавливает необходимость отображения
             * списка товаров в корзине.
             * 
             * @returns {boolean}
             */
            goodsListRequired() {
                return this.goods.length && !this.formRequired;
            }
        },
        methods: {
            /**
             * Скрывает корзину и отправляет свое содержимое
             * на случай если оно было изменено.
             */
            hideCart() {
                this.$emit("hide-cart", this.goods);
            },
            /**
             * Удаляет одну единицу товара из корзины.
             * 
             * @param {number} index - порядковый номер товара в массиве goods.
             */
            subtract(index) {
                if (this.goods[index].quantity === 1) {
                    this.goods.splice(index, 1);
                } else {
                    this.goods[index].quantity -= 1;
                }
            },
            /**
             * Добавляет одну единицу товара в корзину.
             * 
             * @param {number} index - порядковый номер товара в массиве goods.
             */
            add(index) {
                this.goods[index].quantity += 1;
            },
            /**
             * Обрабатывает ввод в input.
             * 
             * @param {object} event - объект события blur.
             * @param {number} index - порядковый номер товара в массиве goods.
             */
            processInput(event, index) {
                let refined = parseInt(event.target.value);

                if (!refined) refined = 1;

                this.goods[index].quantity = refined;
                event.target.value = refined;
            },
            /**
             * Производит событие blur.
             * 
             * @param {object} event - объект события keyup.
             */
            blur(event) {
                event.target.blur();
            },
            /**
             * Отправляет данные по заказу на сервер.
             * 
             * @param {object} clientInfo - данные покупателя.
             */
            createOrder(clientInfo) {
                // ... данные отправлются любым удобным способом

                this.goods = [];
                this.formRequired = false;
                this.notifierRequired = true;

                let vm = this;
                setTimeout(() => {
                    vm.notifierRequired = false;
                }, 3000)
            }
        }
    }
</script>

<style lang="scss">
    .cart {
        position: fixed;
        left: 0;
        top: 0;
        z-index: 10;
        width: 100%;
        height: 100vh;

        .container {
            box-sizing: border-box;
            position: absolute;
            right: 0;
            top: 0;
            height: 100%;
            width: 500px;
            background-color: white;
            overflow-y: scroll;

            @media screen and (max-width: 600px) {
                width: 100%;
            }

            .header {
                display: flex;
                justify-content: space-between;
                padding: 1rem 3rem;
                background-color: rgb(245, 245, 245);

                span {
                    color: black;
                    font-family: "PlayfairDisplay-Bold";
                    letter-spacing: 1px;
                }
            }

            .main {
                padding: 3rem;
                color: black;

                .padding-paragraph {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                }

                .create-order {
                    button {
                        cursor: pointer;
                        padding: 1rem 2rem;
                        border: none;
                        outline: none;
                        border-radius: 40px;
                        color: white;
                        font-size: 1rem;
                        font-family: "PlayfairDisplay-Medium";
                        background-color: black;
                    }
                }

                // vue-анимации появления и исчезновения блоков корзины (списков товаров, формы и пр.)
                .cart-block-enter, .cart-block-leave-to {
                    opacity: 0;
                }

                .cart-block-enter-active, .cart-block-leave-active {
                    transition: .3s ease;
                }
            }

            .cart-notifier-enter, .cart-notifier-leave-to {
                opacity: 0;
            }

            .cart-notifier-enter-active, .cart-notifier-leave-active {
                transition: .5s ease;
            }
        }
    }
</style>
