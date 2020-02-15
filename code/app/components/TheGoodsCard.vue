<template>
    <main>
        <!-- ссылка на главную страницу -->
        <div class="home-link">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 476.213 476.213"><polygon points="476.213,223.107 57.427,223.107 151.82,128.713 130.607,107.5 0,238.106 130.607,368.714 151.82,347.5 57.427,253.107 476.213,253.107 "/></svg>
            <router-link to="/">Go home</router-link>
        </div>
        <!-- описание товара -->
        <article v-if="goodsDescription">
            <div class="image">
                <img :src="goodsDescription.url" :alt="goodsDescription.name">
            </div>
            <div class="description">
                <h1>{{ goodsDescription.name }}</h1>
                <p class="price">{{ goodsDescription.price }} &pound;</p>
                <p>{{ goodsDescription.description }}</p>
                <p>
                    <button @click="addToCart">
                        <span ref="span">Add to cart</span>
                    </button>
                </p>
            </div>
        </article>
        <article v-else>
            <p>There is nothing to show</p>
        </article>
    </main>
</template>

<script>
    /**
     * Компонент формирующий страницу с описанием товара.
     */
    import anime from "animejs/lib/anime.min.js";

    export default {
        props: {
            /**
             * Содержит все данные по товарам магазина.
             */
            goods: {
                type: Array,
                required: true
            }
        },
        watch: {
            /**
             * Просмотр данного атрибута, позволит отлавливать
             * ручное изменение маршрута.
             */
            $route(to, from) {
                let id = parseInt(to.params.id);

                this.goodsDescription = id ? this.getDescription(id) : undefined;
            }
        },
        mounted() {
            /**
             * Для данного компонента кнопка вызова
             * фильтра товаров не нужна.
             */
            this.$emit("button-filter-not-required");

            document.title = this.goodsDescription.name;
        },
        data() {
            let id = parseInt(this.$route.params.id);

            return {
                goodsDescription: id ? this.getDescription(id) : undefined, // {object|undefined} объект содержащий описание товара
            }
        },
        methods: {
            /**
             * Возвращает описание товара.
             * 
             * @param {number} id - id товара.
             * @returns {object|undefined}
             */
            getDescription(id) {
                for (let i = 0; i < this.goods.length; i++) {
                    if (this.goods[i].id === id) return this.goods[i];
                }

                return undefined;
            },
            /**
             * Указывает родительскому компоненту добавить текущий товар
             * в потребительскую корзину.
             */
            addToCart() {
                let vm = this;
                let description = {
                    name: vm.goodsDescription.name,
                    price: vm.goodsDescription.price,
                    url: vm.goodsDescription.url,
                    quantity: 1
                }

                this.$emit("add-to-cart", description);
                this.animateButtonClick();
            },
            /**
             * Анимирует нажатие кнопки заказа.
             */
            animateButtonClick() {
                let span = this.$refs.span;

                anime({
                    targets: span,
                    keyframes: [
                        {scale: .8,},
                        {scale: 1.2},
                        {scale: .9},
                        {scale: 1.1},
                        {scale: 1},
                    ],
                    easing: "linear",
                    duration: 450
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    main {
        box-sizing: border-box;
        position: relative;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 5rem 2rem;

        .home-link {
            position: absolute;
            left: 2rem;
            top: 70px;
            display: flex;
            align-items: center;

            svg {
                fill: white;
                width: 1.2rem;
                height: 1.2rem;
                margin-right: .5rem;
            }

            a {
                color: white;
                text-decoration: none;

                &:hover {
                    text-decoration: underline;
                }
            }
        }
        
        article {
            @media screen and (min-width: 901px) {
                display: flex;
                flex-flow: row wrap;
                max-width: 1200px;
            }

            @media screen and (max-width: 900px) {
                max-width: 600px;
            }
            
            .image, .description {
                flex: 1;
            }

            .image img {
                display: block;
                max-width: 100%;
                margin: auto;
            }

            .description {
                @media screen and (min-width: 901px) {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }

                h1 {
                    margin: 2rem 0;
                    font-family: "PlayfairDisplay-Bold";
                    font-weight: normal;
                    font-size: 3rem;

                    @media screen and (max-width: 500px) {
                        font-size: 2rem;
                    }
                }

                p {
                    margin: 1rem 0;
                    font-size: .9rem;
                    line-height: 1.7;

                    &.price {
                        color: #FFD99D;
                        font-family: "PlayfairDisplay-Medium";
                        font-size: 1.5rem;
                    }

                    button {
                        cursor: pointer;
                        position: relative;
                        display: inline-block;
                        width: 190px;
                        height: 55px;
                        background-color: white;
                        border: 1px solid white;
                        outline: none;
                        border-radius: 40px;
                        letter-spacing: 1px;
                        font-size: 1rem;
                        font-family: "PlayfairDisplay-Medium", serif;
                        text-decoration: none;
                        color: black;
                        overflow: hidden;
                        transition: .3s ease;

                        &::after {
                            content: "";
                            position: absolute;
                            left: -30px;
                            top: 100%;
                            z-index: 1;
                            width: 250px;
                            height: 250px;
                            background-color: black;
                            border-radius: 50%;
                            transition: .3s ease;
                        }

                        &:hover {
                            color: white;
                        }

                        &:hover::after {
                            top: -55px;
                        }

                        span {
                            position: absolute;
                            left: 45px;
                            top: 17px;
                            z-index: 2;
                            width: 100px;
                            height: 25px;
                            text-align: center;
                        }
                    }
                }
            }
        }
    }
</style>
