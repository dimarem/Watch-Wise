<template>
    <!-- страница 404 -->
    <section class="page-404">
        <!-- тематическое изображение -->
        <div class="image"></div>
        <div class="content">
            <article>
                <h1>404</h1>
                <p>Requested page wasn't found</p>
            </article>
        </div>
    </section>
</template>

<script>
    export default {
        mounted() {
            document.title = "404 - Requested page wasn't found";   
        }
    }
</script>

<style lang="scss" scoped>
    .page-404 {
        max-width: 1200px;
        margin: auto;

        @media screen and (min-width: 901px) {
            display: flex;
            flex-flow: row wrap;
            height: 100vh;
        }

        .image {
            background-image: url("../assets/images/intro.jpg");
            background-position: center;
            background-repeat: no-repeat;
            background-size: contain;

            @media screen and (min-width: 901px) {
                width: 50%;
            }

            @media screen and (max-width: 900px) {
                height: 50vh;
                min-height: 300px;
            }
        }

        .content {
            @media screen and (min-width: 901px) {
                box-sizing: border-box;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 50%;
                padding: 1rem;
            }

            @media screen and (max-width: 900px) {
                padding: 1rem 1rem 4rem;
                box-shadow: 0 -10px 10px #000;
            }

            article {
                h1 {
                    margin: 0;
                    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
                    font-weight: bold;
                    font-size: 15rem;
                    text-align: center;

                    @media screen and (max-width: 480px) {
                        font-size: 10rem;
                    }

                    @media screen and (max-width: 330px) {
                        font-size: 7rem;
                    }
                }

                p {
                    text-align: center;
                }
            }
        }
    }
</style>
