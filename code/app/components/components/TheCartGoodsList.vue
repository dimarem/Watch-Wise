<template>
    <div class="list">
        <div 
            v-for="(item, index) in goods" 
            :key="item.name" 
            class="goods"
        >
            <!-- изображение товара -->
            <div class="image">
                <img :src="item.url" />
            </div>
            <div class="details">
                <!-- наименование товара, цена -->
                <div class="side">
                    <div class="name">{{ item.name }}</div>
                    <div class="price">{{ item.price }} &pound;</div>
                </div>
                <div class="side">
                    <!-- данный элемент увеличивает либо уменьшает количество товара -->
                    <div class="goods-button">
                        <button 
                            @click="$emit('subtract', index)" 
                            class="left"
                        >-</button>
                        <input
                            :value="item.quantity"
                            @blur="$emit('process-input', $event, index)"
                            @keyup.enter="$emit('blur', $event)"
                            type="text"
                        />
                        <button 
                            @click="$emit('add', index)" 
                            class="right"
                        >+</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- общая сумма покупки -->
        <TheCartTotal 
            :total="total"
        />
        <div 
            @click="$emit('create-order')" 
            class="create-order"
        >
            <button>Create order</button>
        </div>
    </div>
</template>

<script>
    /**
     * Данный компонент формирует область в потребительской
     * корзине, содержащей перечень товаров.
     */
    import TheCartTotal from "./components/TheCartTotal.vue";

    export default {
        props: {
            /**
             * Массив содержащий товары корзины.
             */
            goods: {
                type: Array,
                required: true
            },
            /**
             * Общая сумма покупки.
             */
            total: {
                type: String,
                required: true
            }
        },
        components: {
            TheCartTotal
        }
    }
</script>

<style lang="scss">
    .list {
        .goods {
            margin-bottom: 2rem;

            .image {
                margin-bottom: .5rem;

                img {
                    display: block;
                    width: 60%;
                    margin: auto;
                }
            }

            .details {
                @media screen and (min-width: 501px) {
                    display: flex;
                    flex-flow: row wrap;
                }
                            
                .side {
                    @media screen and (min-width: 501px) {
                        width: 50%;
                    }

                    .name, .price {
                        @media screen and (max-width: 500px) {
                            text-align: center;
                        }
                    }

                    .goods-button {
                        display: flex;
                        flex-flow: row nowrap;
                        justify-content: center;
                        align-items: center;
                        height: 100%;

                        @media screen and (max-width: 500px) {
                            margin-top: 1rem;
                        }
                                    
                        input, button {
                            box-sizing: border-box;
                            padding: .5rem 1rem;
                            font-size: 1.2rem;
                            text-align: center;
                            font-family: "PlayfairDisplay-Regular";
                            border: none;
                            outline: none;
                        }

                        input {
                            width: 70px;
                            background-color: rgb(245, 245, 245);
                        }

                        button {
                            cursor: pointer;
                            background-color: black;
                            color: white;

                            &.left {
                                border-radius: 50% 0 0 50%;
                            }

                            &.right {
                                border-radius: 0 50% 50% 0;
                            }
                        }
                    }
                }
            }
        }
    }
    
    // vue-анимации исчезновения
    .list-leave-to {
        opacity: 0;
    }

    .list-leave-active {
        transition: .3s ease;
    }
</style>
