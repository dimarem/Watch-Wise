<template>
    <div class="notifier">
        Your order has been sent
    </div>
</template>

<script>
    /**
     * Данный компонент создает уведомление
     * об отправке заказа на сервер.
     */
    export default {
        
    }
</script>

<style lang="scss">
    .notifier {
        box-sizing: border-box;
        position: fixed;
        top: 5rem;
        left: 50%;
        z-index: 11;
        width: 300px;
        padding: 2rem 3rem;
        text-align: center;
        color: white;
        background-color: black;
        border-radius: 5px;
        box-shadow: 0 5px 10px rgba($color: #000, $alpha: .5);
        transform: translateX(-50%);
    }
</style>
