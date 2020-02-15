<template>
    <div 
        ref="label" 
        class="label croped animated"
    >
        <span class="highlighted">W</span><span>a</span><span>t</span><span>c</span><span>h</span> <span class="highlighted">W</span><span>i</span><span>s</span><span>e</span>
    </div>
</template>

<script>
    /**
     * Анимированный лэйбл в заголовке страницы.
     */
    import anime from "animejs/lib/anime.min.js";

    export default {
        /**
         * Анимирует появление данного компонента.
         */
        mounted() {
            let vm = this;
            let label = this.$refs.label

            anime({
                targets: label.children,
                translateY: ["150%", 0],
                delay: anime.stagger(150, {start: 500}),
                duration: 500,
                easing: "linear",
                begin() {
                    label.classList.remove("croped");
                },
                complete() {
                    setTimeout(() => {
                        label.classList.remove("animated");
                    }, 400)
                    
                    setTimeout(() => {
                        vm.$emit("remove-header-curtain");
                    }, 1000)
                }
            })
        }
    }
</script>

<style lang="scss">
    .label {
        box-sizing: border-box;
        position: absolute;
        left: 2rem;
        top: .8rem;
        z-index: 4;
        padding: 3px 0;
        font-size: 1.3rem;
        font-family: "PlayfairDisplay-Bold";
        overflow: hidden;
        transition: .5s ease;

        &.croped::before, &.croped::after {
            width: 0;
        }

        &::before, &::after {
            content: "";
            position: absolute;
            left: 50%;
            width: 100%;
            height: 1px;
            background-color: white;
            transform: translateX(-50%);
            transition: .3s linear;
            transition-delay: .2s;
        }

        &::before {
            top: 0;
        }

        &::after {
            bottom: 0;
        }

        &.animated {
            top: 50vh;
            left: 50%;
            transform: translate(-50%, -50%) scale(5);

            @media screen and (max-width: 700px) {
                transform: translate(-50%, -50%) scale(3);
            }

            @media screen and (max-width: 440px) {
                transform: translate(-50%, -50%) scale(2);
            }
        }

        span {
            display: inline-block;

            &.highlighted {
                background-color: white;
                color: black;
                padding: 0 3px;
            }
        }
    }
</style>
