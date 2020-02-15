import "./index.scss";
import "./app/polyfill/polyfill.js";

import anime         from "animejs/lib/anime.min.js";
// import Vue           from "vue/dist/vue.js";
import Vue           from "vue/dist/vue.min.js";
import VueRouter     from "vue-router/dist/vue-router.min.js";
import The404Page    from "./app/The404Page.vue";
import TheMainPage   from "./app/TheMainPage.vue";
import TheCurtain    from "./app/TheCurtain.vue";
import TheAssortment from "./app/components/TheAssortment.vue";
import TheGoodsCard  from "./app/components/TheGoodsCard.vue";

Vue.use(VueRouter);

const routes = [
    { 
        path: "/", 
        component: TheMainPage,
        children: [
            {
                path: "",
                components: {
                    assortment: TheAssortment
                }
            },
            {
                path: "goods/:id",
                components: {
                    goodsCard: TheGoodsCard
                }
            }
        ]
    },
    {
        path: "*",
        component: The404Page
    }
]

const router = new VueRouter({routes})

new Vue({
    el: "#container",
    router,
    components: {
        "the-curtain": TheCurtain
    },
    data() {
        return {
            ready: false,    // {boolean} индикатор указывающий на готовность приложения
            outdated: false, // {boolean} индикатор указывающий, что приложение запущено в устаревшем браузере
        }
    },
    mounted() {
        let promiseSupport = "Promise" in window;
        let flexSupport = "CSS" in window ? CSS.supports("display: flex") : false;

        if (promiseSupport && flexSupport) {
            this.ready = true;
        } else {
            this.outdated = true;
            document.documentElement.style.overflow = "hidden";
        }
    }
})
