<template>
    <div class="swiper">
        <div class="swiper-wrapper">
            <div v-for="i in images" :key="i" class="swiper-slide">
                <!-- <div class="slider-content">Slide {{ i }}</div> -->
                <img :src="`https://localhost:5001/api/files/${i}`" alt="" width="500" height="500">
            </div>
        </div>
        <!-- If pagination is needed -->
        <div class="swiper-pagination"></div>

        <!-- If navigation buttons are needed -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>

<script>
import { Swiper, Navigation, Pagination, Autoplay } from 'swiper';
import 'swiper/swiper-bundle.min.css';

export default {
    props: {
        images: Array
    },
    data: () => ({
        // images: [
        //     "Img__GLOCKS__JEANS.png",
        //     "PIC_PREDATOR_VEST.png",
        //     "PIC_BELTS_DISTRESSED_JEANS_DARK.png",
        //     "666-TEE WH.jfif",
        //     "D.O.C.-FULL ZIP PUFFER JKT BL.jpeg",
        //     "W.O.F.-FULL ZIP HOODIE BL.jpeg",
        //     "XCROSS-T WASHED HOODIE DARK GR.jfif",
        // ],
    }),
    mounted() {
        Swiper.use([Navigation, Pagination, Autoplay])

        const swiper = new Swiper('.swiper', {
            direction: 'horizontal',
            loop: false,
            modules: [Navigation, Pagination, Autoplay],
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true
            },
            // autoplay: {
            //   delay: 3000
            // },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            }
        })
    },
}
</script>

<style scoped>
.swiper {
    height: 500px;
    overflow: hidden;
    position: relative;
    width: 500px;
}

.swiper-slide {
    align-items: center;
    display: flex;
    justify-content: center;
}
</style>