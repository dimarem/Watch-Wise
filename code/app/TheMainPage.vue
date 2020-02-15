<template>
    <section class="goods-page">
        <TheHeader
            :buttonFilterRequired="buttonFilterRequired"
            :cartLength="cart.length"
            @show-cart="showCart"
            @show-filter="showFilter"
        />
        <transition 
            name="content" 
            mode="out-in"
        >
            <router-view 
                name="assortment" 
                :goodsList="goodsList" 
                :loaderRequired="loaderRequired"
                :filterRequired="filterRequired"
                :filterSettings="filterSettings"
                :scrollTop="scrollTop"
                @button-filter-required="buttonFilterRequired = true"
                @hide-filter="hideFilter" 
                @show-more="showMore"
                @update-goods-list="updateGoodsList"
                @assortment-destroy="processAssortmentDestroyEvent"
            />
            <router-view
                name="goodsCard" 
                :goods="goods"
                @button-filter-not-required="buttonFilterRequired = false"
                @add-to-cart="addToCart"
            />
        </transition>
        <transition
            @enter="cartEnter"
            @leave="cartLeave"
        >
            <TheCart
                v-if="cartRequired"
                :items="cart"
                @hide-cart="hideCart"
            />
        </transition>
    </section>
</template>

<script>
    /**
     * Компонент формирующий страницу с ассортиментом магазина.
     * В данном компоненте содержится все состояние приложения.
     */
    import goods     from "./goods/goods.json";
    import TheHeader from "./components/TheHeader.vue";
    import TheCart   from "./components/TheCart.vue";
    import anime     from "animejs/lib/anime.min.js";

    export default {
        components: {
            TheHeader,
            TheCart
        },
        data() {
            return {
                goods: goods.list,           // {array} содержит все данные по товарам магазина
                partial: 6,                  // {number} указывает сколько товаров отображать в текущий момент
                cart: [],                    // {array} массив содержащий товары потребительской корзины
                cartRequired: false,         // {boolean} индикатор необходимости отображения корзины
                scrollTop: undefined,        // {number} величина прокрутки страницы по оси Y
                buttonFilterRequired: false, // {boolean} индикатор необходимости отображения кнопки вызова фильтра
                filterRequired: false,       // {boolean} индикатор необходимости отображения фильтра товаров
                filterSettings: {            // {object} настройки опций фильтра товаров
                    series: {
                        1: true,
                        2: true,
                        3: true,
                        4: true,
                        5: true
                    },
                    man: true,
                    woman: true,
                    priceFrom: undefined,
                    priceTo: undefined
                }
            }
        },
        computed: {
            /**
             * Формирует список товаров разрешенных для отображения компонентом TheGoodsList.
             * 
             * @returns {array}
             */
            visibleGoods() {
                let vg = [];

                for (let i = 0; i < this.goods.length; i++) {
                    let item = this.goods[i];

                    if (item.visible) vg.push(item);
                }

                return vg;
            },
            /**
             * Формирует список товаров для отображения в текущий момент компонентом TheGoodsList.
             * 
             * @returns {array}
             */
            goodsList() {
                return this.visibleGoods.slice(0, this.partial);
            },
            /**
             * Устанавливает необходимость отображения "дозагрузчика"
             * компонентом TheGoodsList.
             * 
             * @return {boolean}
             */
            loaderRequired() {
                return this.goodsList.length < this.visibleGoods.length;
            }
        },
        methods: {
            /**
             * Изначально на странице отображается не более 6 позиций,
             * данный метод "доотображает" еще до 6 единиц.
             */
            showMore() {
                this.partial += 9;
            },
            /**
             * Требует отобразить фильтр товаров.
             */
            showFilter() {
                document.documentElement.style.overflow = "hidden";
                this.filterRequired = true;
            },
            /**
             * Требует скрыть фильтр товаров.
             */
            hideFilter() {
                document.documentElement.style.overflow = "";
                this.filterRequired = false;
            },
            /**
             * Требует отобразить корзину.
             */
            showCart() {
                document.documentElement.style.overflow = "hidden";
                this.cartRequired = true;
            },
            /**
             * Требует скрыть корзину.
             * 
             * @param {array} goods - массив товаров корзины.
             */
            hideCart(goods) {
                document.documentElement.style.overflow = "";
                this.cartRequired = false;

                // обновим корзину, на случай если данные были изменены.
                this.cart = goods.slice();
            },
            /**
             * Добавляет товар в корзину.
             * 
             * @param {object} description - объект содержащий описание товара.
             */
            addToCart(description) {
                // проверим присутствует ли текущий товар уже в корзине
                let exists = false;

                for (let i = 0; i < this.cart.length; i++) {
                    let item = this.cart[i];

                    if (description.name === item.name) {
                        item.quantity += 1;
                        exists = true;
                        break;
                    }
                }

                if (!exists) this.cart.push(description);
            },
            /**
             * Анимирует появление потребительской корзины.
             * 
             * @param {HTMLElement} el - указатель на корзину.
             * @param {function} done - функция-финализатор.
             */
            cartEnter(el, done) {
                this.$nextTick(() => {
                    if (document.documentElement.clientWidth <= 900) {
                        anime({
                            targets: el,
                            opacity: [0, 1],
                            easing: "linear",
                            duration: 300,
                            complete: done
                        })
                    } else {
                        anime.timeline({
                            easing: "linear"
                        })
                        .add({
                            targets: el,
                            opacity: [0, 1],
                            duration: 100
                        })
                        .add({
                            targets: el.querySelector(".container"),
                            translateX: ["100%", 0],
                            duration: 200
                        })
                        .add({
                            targets: el.querySelectorAll(".goods, .total, .create-order, .padding-paragraph"),
                            opacity: [0, 1],
                            duration: 300,
                            delay: anime.stagger(100)
                        })
                        .add({
                            targets: el.querySelector(".header button"),
                            opacity: [0, 1],
                            rotate: 180,
                            duration: 300,
                            complete: done
                        })
                    }
                })
            },
            /**
             * Анимирует исчезновение потребительской корзины.
             * 
             * @param {HTMLElement} el - указатель на корзину.
             * @param {function} done - функция-финализатор.
             */
            cartLeave(el, done) {
                if (document.documentElement.clientWidth <= 900) {
                    anime({
                        targets: el,
                        opacity: [1, 0],
                        easing: "linear",
                        duration: 300,
                        complete: done
                    })
                } else {
                    anime.timeline({
                        easing: "linear"
                    })
                    .add({
                        targets: el.querySelector(".container"),
                        translateX: [0, "100%"],
                        duration: 200
                    })
                    .add({
                        targets: el,
                        opacity: [1, 0],
                        duration: 100,
                        complete: done
                    })
                }
            },
            /**
             * Обновляет список разрешенных к показу товаров
             * в соответствии с настройками фильтра.
             * 
             * @param {object} setting - объект настроек фильтра, 
             * который содержит какие товары требуется скрыть, а какие отобразить.
             */
            updateGoodsList(settings) {
                this.filterSettings = settings; // запомним настройки

                // неправильно заполненные поля с ценами отбросим
                if (!parseFloat(this.filterSettings.priceFrom)) this.filterSettings.priceFrom = undefined;
                if (!parseFloat(this.filterSettings.priceTo)) this.filterSettings.priceTo = undefined;

                this.goods.forEach(item => {
                    item.visible = true;

                    if (!this.filterSettings.series[1] && item.series === 1) {
                        item.visible = false;
                        return;
                    }

                    if (!this.filterSettings.series[2] && item.series === 2) {
                        item.visible = false;
                        return;
                    }

                    if (!this.filterSettings.series[3] && item.series === 3) {
                        item.visible = false;
                        return;
                    }

                    if (!this.filterSettings.series[4] && item.series === 4) {
                        item.visible = false;
                        return;
                    }

                    if (!this.filterSettings.series[5] && item.series === 5) {
                        item.visible = false;
                        return;
                    }

                    if (!this.filterSettings.man && item.gender === "man") {
                        item.visible = false;
                        return;
                    }

                    if (!this.filterSettings.woman && item.gender === "woman") {
                        item.visible = false;
                        return;
                    }

                    if (this.filterSettings.priceFrom && item.price < this.filterSettings.priceFrom) {
                        item.visible = false;
                    }

                    if (this.filterSettings.priceTo && item.price > this.filterSettings.priceTo) {
                        item.visible = false;
                    }
                })
            },
            /**
             * Обрабатывает событие уничтожения компонента
             * TheAssortment, в данном случае запоминает величину прокрутки страницы.
             */
            processAssortmentDestroyEvent() {
                this.scrollTop = document.documentElement.scrollTop;
            }
        }
    }
</script>

<style lang="scss">
    .goods-page {
        min-height: 100vh;

        .content-enter, .content-leave-to {
            opacity: 0;
        }

        .content-enter-active, .content-leave-active {
            transition: .3s ease;
        }
    }
</style>
