<template>
    <!-- блок со ссылками на статьи -->
    <transition-group 
        v-if="goodsList.length"
        name="articles-list"
        tag="div" 
        class="articles"
    >
        <article 
            v-for="item in goodsList"
            :key="item.name"
            class="goods"
        >
            <router-link :to="'/goods/' + item.id">
                <img 
                    :src="item.url" 
                    :alt="item.name"
                >
            </router-link>
            <h2>{{ item.name }}</h2>
            <div class="price">{{ item.price }} &pound;</div>
        </article>
    </transition-group>
    <!-- данный блок отображается, когда нет информации соответствующей текущим фильтрам -->
    <article 
        v-else
        class="padding-article"
    >
        <p>There is nothing to show</p>
    </article>
</template>

<script>
    /**
     * Список товаров.
     */
    export default {
        props: {
            /**
             * Список товаров для отображения в текущий момент.
             */
            goodsList: {
                type: Array,
                required: true
            }
        }
    }
</script>

<style lang="scss">
    .articles {
        box-sizing: border-box;
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
        align-items: center;
        max-width: 1200px;
        min-height: 50vh;
        margin: auto;

        .goods {
            position: relative;
            width: 300px;
            margin: 3rem;

            @media screen and (max-width: 900px) {
                width: 250px;
            }

            .price {
                position: absolute;
                top: 0;
                left: 0;
                z-index: 1;
                padding: .5rem 1rem;
                border-radius: 5px;
                font-size: 1.1rem;
                font-family: "PlayfairDisplay-Medium";
                background-color: #FFD99D;
                color: black;

                @media screen and (max-width: 320px) {
                    padding: .25rem .5rem;
                    font-size: 1rem;
                }
            }

            a {
                display: block;

                img {
                    width: 100%;
                    transition: .3s ease;

                    &:hover {
                        transform: scale(1.2) rotate(10deg);
                    }
                }
            }

            h2 {
                margin: 0;
                margin-top: .5rem;
                color: white;
                font-weight: normal;
                text-align: center;
                font-size: 1.1rem;
                letter-spacing: 1px;
            }
        }

        p {
            color: white;
        }
    }

    .padding-article {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 50vh;
        
        p {
            text-align: center;
        }
    }

    // vue-анимации появления и исчезновения
    .articles-list-enter, .articles-list-leave-to {
        opacity: 0;
    }

    .articles-list-enter-active, .articles-list-leave-active {
        transition: .3s ease;
    }
</style>
