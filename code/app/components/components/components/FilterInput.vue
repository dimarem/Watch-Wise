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
            v-on="inputListeners"
            @focus="processFocus"
            @blur="processBlur"
            @input="validate"
            type="text"
        >
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
            },
            /**
             * Проверяет правильность заполнения цены,
             * допускает только числовое выражение.
             */
            validate(e) {
                let price = e.target.value;

                if (price) {
                    let refined = parseFloat(price);

                    this.$emit("input", refined);
                } else {
                    this.$emit("input", null);
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    label {
        position: relative;
        display: block;
        width: 48%;
        border-bottom: 1px solid rgb(230, 230, 230);

        @media screen and (max-width: 370px) {
            width: 100%;
            margin-bottom: 1.5rem;
        }

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
    }
</style>
