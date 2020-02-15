<template>
    <label>
        <input 
            :checked="checked"
            @change="$emit('change', $event.target.checked)"
            type="checkbox"
        >
        {{ content }}
        <svg viewBox="0 0 1280.000000 959.000000"><g transform="translate(0.000000,959.000000) scale(0.100000,-0.100000)"><path d="M12252 9569 c-35 -10 -87 -31 -116 -48 -30 -16 -1843 -1223 -4030 -2680 -2188 -1458 -3980 -2651 -3984 -2651 -4 0 -776 579 -1717 1286 -1109 834 -1733 1297 -1775 1318 -61 29 -72 31 -180 31 -109 0 -119 -2 -183 -32 -79 -38 -163 -114 -200 -181 -37 -68 -70 -197 -63 -242 20 -124 8 -105 1895 -3170 1261 -2047 1866 -3021 1899 -3057 74 -78 245 -151 329 -140 122 16 214 61 304 147 37 36 524 547 1081 1135 557 589 2361 2492 4008 4230 1647 1738 3039 3207 3093 3264 107 113 143 174 172 289 18 70 18 74 0 145 -26 106 -63 175 -125 237 -63 62 -118 92 -220 121 -83 23 -105 23 -188 -2z"/></g></svg>
    </label>
</template>

<script>
    /**
     * Данный компонент формирует стилизованный checkbox.
     */
    export default {
        model: {
            prop: "checked",
            event: "change"
        },
        props: {
            /**
             * Содержание чекбокса.
             */
            content: {
                type: String,
                required: true
            },
            /**
             * Индикатор того отмечен ли данный компонент изначально.
             */
            checked: {
                type: Boolean
            }
        }
    }
</script>

<style lang="scss" scoped>
    label {
        cursor: pointer;
        position: relative;
        display: block;
        margin-bottom: 1rem;

        &::before {
            content: "";
            box-sizing: border-box;
            position: absolute;
            left: 0;
            top: 0;
            z-index: 1;
            width: 1.5rem;
            height: 1.5rem;
            background-color: white;
            border-radius: 3px;
            border: 2px solid rgb(50, 50, 50);
        }

        input[type="checkbox"] {
            margin: 0;
            margin-right: 1rem;

            &:checked ~ svg {
                display: block;
            }
        }

        svg {
            position: absolute;
            left: .25rem;
            top: .25rem;
            z-index: 1;
            display: none;
            width: 1rem;
            height: 1rem;
        }
    }
</style>
