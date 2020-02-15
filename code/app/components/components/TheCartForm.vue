<template>
    <form @submit.prevent>
        <p>
            <button 
                @click="$emit('hide-form')"
                class="go-back"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 476.213 476.213"><polygon points="476.213,223.107 57.427,223.107 151.82,128.713 130.607,107.5 0,238.106 130.607,368.714 151.82,347.5 57.427,253.107 476.213,253.107 "/></svg>
                Go back
            </button>
        </p>
        <CartInput
            v-model="name"
            name="name" 
            caption="Your name"
            :omitted="nameOmitted"
        />
        <CartInput
            v-model="email"
            name="email" 
            caption="Your email"
        />
        <CartInput
            v-model="phone"
            name="phone" 
            caption="Your phone"
            :omitted="phoneOmitted"
        />
        <button @click="send">Send</button>
    </form>
</template>

<script>
    /**
     * Компонент формирующий форму для создания заказа.
     */
    import CartInput from "./components/CartInput.vue";

    export default {
        components: {
            CartInput
        },
        data() {
            return {
                name: undefined,
                email: undefined,
                phone: undefined,
                nameOmitted: false,
                phoneOmitted: false
            }
        },
        methods: {
            /**
             * Указывает родительскому компоненту
             * отправить данные на сервер.
             */
            send() {
                this.nameOmitted = false;
                this.phoneOmitted = false;

                if (!this.name) this.nameOmitted = true;
                if (!this.phone) this.phoneOmitted = true;
                if (this.nameOmitted || this.phoneOmitted) return;

                let vm = this;
                let clientInfo = {
                    name: vm.name,
                    email: vm.email ? vm.email : undefined,
                    phone: vm.phone
                }

                this.$emit("create-order", clientInfo);
            }
        }
    }
</script>

<style lang="scss" scoped>
    p {
        display: flex;
        justify-content: flex-end;
        margin: 0;
        margin-bottom: 2rem;

        .go-back {
            cursor: pointer;
            display: flex;
            align-items: center;
            padding: 0;
            border: none;
            outline: none;
            background-color: transparent;
            color: black;
            font-family: "PlayfairDisplay-Bold";
            font-size: .9rem;

            &:hover svg {
                transform: translateX(-10px);
            }

            svg {
                width: 1rem;
                height: 1rem;
                margin-right: .5rem;
                transition: .3s ease;
            }
        }
    }

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
</style>
