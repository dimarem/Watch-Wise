<template>
    <div class="padding">
        <!-- изображения -->
        <transition name="image">
            <div 
                v-if="firstRequired" 
                key="first"
                class="image first"
            ></div>
            <div 
                v-if="secondRequired" 
                key="second"
                class="image second"
            ></div>
        </transition>
        <!-- переключатели изображений -->
        <div class="switchers">
            <div 
                :class="{active: firstRequired}"
                @click="firstRequired = true; secondRequired = false" 
                class="switcher"
            ></div>
            <div 
                :class="{active: secondRequired}"
                @click="secondRequired = true; firstRequired = false;" 
                class="switcher"
            ></div>
        </div>
    </div>
</template>

<script>
    /**
     * Компонент содержащий тематическое изображение.
     */
    export default {
        data() {
            return {
                firstRequired: true,  // {boolean} отобразить первое изображение
                secondRequired: false // {boolean} отобразить второе изображение
            }
        }
    }
</script>

<style lang="scss">
    .padding {
        position: relative;
        height: 50vh;
        min-height: 500px;
        margin-top: 60px;

        @media screen and (max-width: 900px) {
            min-height: 300px;
        }

        .image {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
        }

        .first {
            background-image: url("../../../assets/images/image-padding-1.jpg");
        }

        .second {
            background-image: url("../../../assets/images/image-padding-2.jpg");
        }
        
        .switchers {
            position: absolute;
            bottom: 1rem;
            left: 50%;
            display: flex;
            justify-content: space-between;
            width: 180px;
            transform: translateX(-50%);

            .switcher {
                cursor: pointer;
                height: 5px;
                width: 48%;
                border-radius: 3px;
                background-color: rgba(190, 190, 190, .5);
                transition: .3s ease;
            }

            .active {
                background-color: rgba(190, 190, 190, 1);
            }
        }

        // vue-анимация смены изображения
        .image-enter, .image-leave-to {
            opacity: 0;
        }

        .image-enter-active, .image-leave-active {
            transition: 1s ease;
        }
    }
</style>
