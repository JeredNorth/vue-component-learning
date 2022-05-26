<template>
    <h1 class="text-accent">Follows</h1>
    <div class="home-button-wrapper" style="display:flex; justify-content:center; margin-bottom:20px;">
        <div style="margin-right: 1vw;">
            <q-card bordered class="bg-secondary text-uppercase">
                <q-card-section class="q-py-xs text-center" @click="followersDialog = true"
                    style="font-weight: 500; font-size: calc(9px + 1vw); cursor:pointer">
                    <p class="no-margin text-white">
                        Followers
                    </p>
                    <p class="no-margin text-accent">
                        5
                    </p>
                </q-card-section>
                <q-dialog v-model="followersDialog">
                    <followers-dialog />
                </q-dialog>
            </q-card>
        </div>

        <div style="margin-right: 1vw;">
            <q-card bordered class="bg-secondary text-uppercase">
                <q-card-section class="q-py-xs text-center" @click="followingDialog = true"
                    style="font-weight: 500; font-size: calc(9px + 1vw); cursor:pointer;">
                    <p class="no-margin text-white">
                        Following
                    </p>
                    <p class="no-margin text-accent">
                        2
                    </p>
                </q-card-section>
                <q-dialog v-model="followingDialog">
                    <following-dialog />
                </q-dialog>
            </q-card>
        </div>
    </div>

    <h1 class="text-accent">Reviews Carousel</h1>

    <q-btn v-if="reviews.length !== 0" flat :ripple="false" padding="0" class="q-mb-xl"
        style="border-radius: 1em; cursor:initial">
        <q-card class="bg-secondary full-width">
            <q-card-section style="color:white">
                <p class="q-ma-none q-mb-sm text-center text-accent text-uppercase"
                    style="font-size: 30px; font-weight: 700;">Reviews</p>

                <q-carousel animated v-model="slide" :autoplay="autoplay" ref="carousel" infinite
                    transition-prev="slide-right" transition-next="slide-left" @mouseenter="autoplay = false"
                    @mouseleave="autoplay = false" class="text-left" style="height: 380px">
                    <q-carousel-slide v-for="(review, index) in reviews"
                        @click="$router.push({ path: '/reviews' })"
                        :key="index" :name="index" style="cursor:pointer" class="bg-secondary q-pb-none">
                        <div class="flex">
                            <q-avatar v-if="review.avatar"
                                class="text-bold q-mr-sm" style="cursor:pointer;" size="59px" color="primary">
                                <img :src="(review.avatar)" alt="avatar">
                            </q-avatar>
                            <q-avatar v-else
                                class="text-bolds q-mr-sm" style="cursor:pointer;" size="59px" color="primary">
                                {{ review.name[0] }}
                            </q-avatar>

                            <div style="width:225px">
                                <h3 class="text-bold" style="width:250px; margin:0 0 5px 0">
                                    {{ review.name }}
                                </h3>
                                <p class="text-accent">
                                    {{ review.date }} -
                                    <q-rating :value="review.rating" readonly style="padding-bottom: 14px"
                                        color="accent" size="0.7em" icon="star_border" icon-selected="star" />
                                </p>
                            </div>
                        </div>

                        <div class="bg-primary q-pa-md" style="height:230px; width:375px; border-radius:1em;">
                            <p style="line-height: 22px;">
                                "{{ review.message }}"
                            </p>
                        </div>
                        <p class="text-center" style="padding-top: 11px">{{ index + 1 }} OF {{ reviews.length }}</p>
                    </q-carousel-slide>

                    <template v-slot:control>
                        <q-carousel-control position="bottom" class="q-gutter-xs text-center flex"
                            style="display:flex; margin:auto; width: 162px;">
                            <q-btn class="q-mr-lg" style="width:50px" text-color="accent" icon="arrow_left"
                                @click="$refs.carousel.previous()"></q-btn>
                            <q-btn class="q-ml-lg" style="width:50px" text-color="accent" icon="arrow_right"
                                @click="$refs.carousel.next()"></q-btn>
                        </q-carousel-control>
                    </template>
                </q-carousel>

                <div>
                    <q-rating :model-value="getReviewAverage" readonly class="q-pb-xs" color="accent" size="1em"
                        icon="star_border" icon-half="star_half" icon-selected="star" />
                    <p class="q-mb-none">{{ getReviewAverage.toFixed(1) }} out of 5</p>
                </div>
            </q-card-section>
        </q-card>
    </q-btn>

</template>

<style>
</style>

<script>
import FollowersDialog from '../components/FollowersDialog/FollowersDialog.vue';
import FollowingDialog from '../components/FollowingDialog/FollowingDialog.vue';

export default {
    name: 'Home',
    components: {
        FollowersDialog,
        FollowingDialog,
    },
    data() {
        return {
            followingDialog: false,
            followersDialog: false,
            autoplay: false,
            slide: 0,
            reviewsList: [
                {
                    avatar: '',
                    name: 'Jered North',
                    message: 'Wilfred got me the items I wanted in excellent condition so quickly',
                    date: '2/22/2022',
                    rating: 5,
                },
                {
                    avatar: '',
                    name: 'Trevor Mool',
                    message: 'Products came quickly and in good condition',
                    date: '2/22/2022',
                    rating: 4,
                },
                {
                    avatar: '',
                    name: 'Ferris Borlin',
                    message: 'Had no problems in my items and delivery',
                    date: '2/22/2022',
                    rating: 3,
                },
            ],
        };
    },
    computed: {
        reviews() {
            return this.reviewsList.map((item) => item);
        },
        getReviewAverage() {
            let totalRating = 0;
            for (let i = 0; i < this.reviewsList.length; i++) {
                totalRating += this.reviewsList[i].rating;
            }
            return totalRating / this.reviewsList.length;
        },
    },
};
</script>
