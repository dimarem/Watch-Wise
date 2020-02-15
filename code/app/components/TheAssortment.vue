<template>
    <main>
        <TheAssortmentPadding />
        <TheAssortmentGoodsList :goodsList="goodsList" />
        <TheAssortmentLoader 
            v-if="loaderRequired" 
            @show-more="$emit('show-more')"
        />
        <TheAssortmentFooter />
        <transition
            @enter="filterEnter"
            @leave="filterLeave"
        >
            <TheAssortmentFilter
                v-if="filterRequired" 
                :filterSettings="filterSettings"
                @hide-filter="hideFilter" 
                @update-goods-list="updateGoodsList"
            />
        </transition>
    </main>
</template>

<script>
    /**
     * Ассортимент магазина.
     */
    import TheAssortmentPadding   from "./components/TheAssortmentPadding.vue";
    import TheAssortmentGoodsList from "./components/TheAssortmentGoodsList.vue";
    import TheAssortmentLoader    from "./components/TheAssortmentLoader.vue";
    import TheAssortmentFilter    from "./components/TheAssortmentFilter.vue";
    import TheAssortmentFooter    from "./components/TheAssortmentFooter.vue";
    import anime                  from "animejs/lib/anime.min.js";

    export default {
        props: {
            /**
             * Список товаров для отображения в текущий момент.
             */
            goodsList: {
                type: Array,
                required: true
            },
            /**
             * Индикатор необходимости отображения "дозагрузчика".
             */
            loaderRequired: {
                type: Boolean,
                required: false,
                default: false
            },
            /**
             * Индикатор необходимости отображения фильтра товаров.
             */
            filterRequired: {
                type: Boolean,
                required: false,
                default: false
            },
            /**
             * Настройки опций фильтра товаров.
             */
            filterSettings: {
                type: Object,
                required: true
            },
            /**
             * Величина прокрути страницы с ассортиментом.
             */
            scrollTop: {
                type: Number,
                required: false
            }
        },
        components: {
            TheAssortmentPadding,
            TheAssortmentGoodsList,
            TheAssortmentLoader,
            TheAssortmentFilter,
            TheAssortmentFooter
        },
        mounted() {
            /**
             * Для данного компонента необходима кнопка вызова
             * фильтра товаров.
             */
            this.$emit("button-filter-required");

            document.title = "Watch Wise";

            this.scrollToPreviousPosition();
        },
        beforeDestroy() {
            this.$emit("assortment-destroy");
        },
        methods: {
            /**
             * Анимирует появление фильтра товаров.
             * 
             * @param {HTMLElement} el - указатель на фильтр.
             * @param {function} done - функция-финализатор.
             */
            filterEnter(el, done) {
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
                            targets: el.querySelectorAll(".info, .checkboxes, .prices"),
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
             * Анимирует исчезновение фильтра товаров.
             * 
             * @param {HTMLElement} el - указатель на фильтр.
             * @param {function} done - функция-финализатор.
             */
            filterLeave(el, done) {
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
             * Пробрасывает событие родительскому компоненту.
             */
            hideFilter() {
                this.$emit("hide-filter");
            },
            /**
             * Пробрасывает событие родительскому компоненту.
             * 
             * @param {object} setting - объект настроек фильтра, 
             * который содержит какие товары требуется скрыть, а какие отобразить.
             */
            updateGoodsList(settings) {
                this.$emit("update-goods-list", settings)
            },
            /**
             * Прокручивает страницу по оси Y, если данная величина была сохранена.
             */
            scrollToPreviousPosition() {
                if (this.scrollTop) {
                    try {
                        let scrollTop = this.scrollTop;

                        this.$nextTick(() => {
                            anime({
                                targets: document.documentElement,
                                scrollTop: scrollTop,
                                easing: "linear",
                                duration: 300
                            }) 
                        })
                    } catch(e) {}
                }
            }
        }
    }
</script>
