<template>
    <label :class="{focused}">
        <span 
            v-if="caption"
            :class="{deposed: captionDeposed}"
            class="caption"
        >
            {{caption}}
        </span>
        <input 
            v-model="currentValue"
            v-bind="$attrs"
            :name="name"
            v-on="inputListeners"
            @focus="processFocus"
            @blur="processBlur"
            type="text"
        >
        <transition name="notification">
            <div 
                v-if="omitted" 
                class="omitted"
            >!</div>
        </transition>
    </label>
</template>

<script>
    /**
     * Компонент input[type="text"].
     * 
     * @example
     * <the-input name="input" caption="Ваше имя" value="Дмитрий"></the-input>
     */

    export default {
        inheritAttrs: false,
        props: {
            /**
             * Имя компонента.
             */
            name: {
                type: String,
                required: true
            },
            /**
             * Заголовок компонента.
             */
            caption: {
                type: String,
                required: false
            },
            /**
             * Начальное значение компонента.
             */
            value: {
                type: String,
                required: false
            },
            /**
             * Индикатор того, что данное данный
             * компонент не был заполнен.
             */
            omitted: {
                type: Boolean,
                required: false
            }
        },
        data() {
            return {
                focused: false,                                    // {boolean} индикатор того, что input находится в фокусе в текущий момент
                captionDeposed: this.value ? true : false,         // {boolean} индикатор необходимости добавления класса "deposed" элементу span
                currentValue: this.value ? this.value : undefined, // {string} текущее значение компонента
            }
        },
        computed: {
            inputListeners() {
                let vm = this;
                
                return Object.assign({},
                    // добавим все слушатели на компоненте
                    this.$listeners,
                    // добавим собственный слушатель, обеспечив работоспособность v-model на компоненте
                    {
                        input(event) {
                            vm.$emit("input", event.target.value);
                        }
                    }
                )
            }
        },
        methods: {
            /**
             * Обрабатывает фокусировку на input.
             */
            processFocus() {
                this.focused = true;

                if (this.caption && !this.currentValue) this.captionDeposed = true;
            },
            /**
             * Обрабатывает снятие фокусировки с input.
             */
            processBlur() {
                this.focused = false;

                if (this.caption && !this.currentValue) this.captionDeposed = false;
            }
        }
    }
</script>

<style lang="scss" scoped>
    label {
        position: relative;
        display: block;
        width: 100%;
        margin: 1rem 0 3rem;
        border-bottom: 1px solid rgb(230, 230, 230);

        &::after {
            content: "";
            position: absolute;
            top: 100%;
            left: 50%;
            width: 0;
            height: 1px;
            background-color: rgb(130, 130, 130);
            transform: translateX(-50%);
            transition: .2s ease;
        }

        &.focused::after {
            width: 100%;
        }

        .caption {
            cursor: auto;
            position: absolute;
            bottom: 50%;
            left: 0;
            letter-spacing: 1px;
            transform: translateY(50%);
            transition: .2s ease;

            &.deposed {
                cursor: default;
                bottom: 100%;
                font-size: .8rem;
                color:rgb(150, 150, 150);
                transform: translateY(0);
            }
        }

        input {
            box-sizing: border-box;
            width: 100%;
            padding: .8rem 0;
            padding-right: 1rem !important;
            outline: none;
            border: none;
            font-family: "PlayfairDisplay-Regular";
            font-size: 1rem;
        }

        .omitted {
            position: absolute;
            top: 50%;
            right: 0;
            font-size: 1rem;
            color: red;
            font-family: "PlayfairDisplay-Bold";
            border-radius: 50%;
            transform: translateY(-50%);
        }

        // vue-анимации появления и исчезновения блока уведомления
        .notification-enter, .notification-leave-to {
            opacity: 0;
        }

        .notification-enter-active, .notification-leave-active {
            transition: .3s ease;
        }
    }
</style>
