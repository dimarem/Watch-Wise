<template>
    <section 
        @click.self="hideFilter"
        class="filter"
    >
        <div class="container">
            <!-- содержит кнопку закрывающую фильтр -->
            <div class="header">
                <span>Filter</span>
                <TheCloseButton @hide="hideFilter" />
            </div>
            <!-- опции фильтра -->
            <div class="main">
                <div class="info">
                    Use settings below to show or hide specific goods, change these options then close this window to apply changes.
                </div>
                <!-- блок опций для выбора серии -->
                <div class="checkboxes">
                    <h2>Series</h2>
                    <Checkbox 
                        v-model="settings.series[1]"
                        content="Series 1" 
                    />
                    <Checkbox 
                        v-model="settings.series[2]"
                        content="Series 2" 
                    />
                    <Checkbox 
                        v-model="settings.series[3]"
                        content="Series 3" 
                    />
                    <Checkbox 
                        v-model="settings.series[4]"
                        content="Series 4" 
                    />
                    <Checkbox 
                        v-model="settings.series[5]"
                        content="Series 5" 
                    />
                </div>
                <!-- блок опций для выбора пола -->
                <div class="checkboxes">
                    <h2>Sex</h2>
                    <Checkbox 
                        v-model="settings.man"
                        content="Man" 
                    />
                    <Checkbox 
                        v-model="settings.woman"
                        content="Woman" 
                    />
                </div>
                <!-- блок опций для выбора диапазона цены -->
                <div class="prices">
                    <FilterInput 
                        v-model="settings.priceFrom"
                        :value="settings.priceFrom"
                        caption="Price from"
                    />
                    <FilterInput 
                        v-model="settings.priceTo"
                        :value="settings.priceTo"
                        caption="Price to"
                    />
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    /**
     * Фильтр товаров.
     */
    import FilterInput    from "./components/FilterInput.vue";
    import Checkbox       from "./components/Checkbox.vue";
    import TheCloseButton from "./components/TheCloseButton.vue";
    
    export default {
        props: {
            /**
             * Настройки фильтра товаров.
             */
            filterSettings: {
                type: Object,
                required: true
            }
        },
        components: {
            FilterInput,
            Checkbox,
            TheCloseButton
        },
        data() {
            let settings = Object.assign({}, this.filterSettings);

            return {
                settings,                   // {object} копия объекта настроек фильтра
                settingsWereChanged: false  // {boolean} индикатор того, что текущие настройки фильтра были изменены
            }
        },
        watch: {
            /**
             * Отслеживает изменения в настройках фильтра и
             * если таковые были, отмечает это.
             */
            settings: {
                deep: true,
                handler() {
                    this.settingsWereChanged = true;
                }
            }
        },
        methods: {
            /**
             * Производит событие "hide-filter" и, если настройки менялись, "update-goods-list".
             */
            hideFilter() {
                this.$emit("hide-filter");

                if (this.settingsWereChanged) this.$emit("update-goods-list", this.settings);
            }
        }
    }
</script>

<style lang="scss">
    .filter {
        position: fixed;
        left: 0;
        top: 0;
        z-index: 10;
        width: 100%;
        height: 100vh;

        .container {
            box-sizing: border-box;
            position: absolute;
            right: 0;
            top: 0;
            height: 100%;
            width: 500px;
            background-color: white;
            overflow: auto;

            @media screen and (max-width: 600px) {
                width: 100%;
            }

            .header {
                display: flex;
                justify-content: space-between;
                padding: 1rem 3rem;
                background-color: rgb(245, 245, 245);

                span {
                    color: black;
                    font-family: "PlayfairDisplay-Bold";
                    letter-spacing: 1px;
                }
            }

            .main {
                padding: 3rem;
                color: black;

                .info {
                    margin-bottom: 2rem;
                }

                .checkboxes {
                    margin: 1rem 0;

                    &:not(:last-of-type) {
                        border-bottom: 1px solid rgb(245, 245, 245);
                    }

                    h2 {
                        margin: 0;
                        margin-bottom: 1rem;
                        font-family: "PlayfairDisplay-Medium";
                        font-size: .8rem;
                        font-weight: normal;
                        letter-spacing: 1px;
                        color: rgb(150, 150, 150);
                    }
                }

                .prices {
                    display: flex;
                    flex-flow: row wrap;
                    justify-content: space-between;
                    margin: 1rem 0;
                }
            }
        }
    }
</style>
