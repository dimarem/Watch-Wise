<template>
    <!-- т.к. изнчально отображаются не все товары, -->
    <!-- задачей данного компонента является дозагрузка оставшей части ассортимента -->
    <div class="loader">
        <button @click="$emit('show-more')">Watch more</button>
    </div>
</template>

<style lang="scss">
    .loader {
        display: flex;
        justify-content: center;
        padding: 2rem 0;

        button {
            cursor: pointer;
            padding: 1rem 2rem;
            border: none;
            outline: none;
            border-radius: 5px;
            background-color: white;
            color: black;
            font-family: "PlayfairDisplay-Medium";
            transition: .3s ease;

            &:hover {
                transform: translateY(-5px);
            }
        }
    }
</style>