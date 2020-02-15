<template>
    <!-- кнопка закрывающая фильтр -->
    <button @click="$emit('hide')">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31.112 31.112"><polygon points="31.112,1.414 29.698,0 15.556,14.142 1.414,0 0,1.414 14.142,15.556 0,29.698 1.414,31.112 15.556,16.97 29.698,31.112 31.112,29.698 16.97,15.556 "/></svg>
    </button>
</template>

<style lang="scss" scoped>
    button {
        cursor: pointer;
        margin: 0;
        padding: 0;
        border: none;
        outline: none;
        background-color: transparent;

        svg {
            width: 1rem;
            height: 1rem;
        }
    }
</style>
