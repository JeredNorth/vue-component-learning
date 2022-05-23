<template>
    <h1>Home Page</h1>

    <!-- <q-btn v-if="reviews.length !== 0" flat :ripple="false" padding="0" class="q-mb-xl full-width"
        style="border-radius: 1em; cursor:initial">
        <q-card class="bg-secondary full-width">
            <q-card-section>
                <p class="q-ma-none q-mb-sm text-center text-accent text-uppercase"
                    style="font-size: 30px; font-weight: 700;">Reviews</p>

                <q-carousel animated v-model="slide" :autoplay="autoplay" ref="carousel" infinite
                    transition-prev="slide-right" transition-next="slide-left" @mouseenter="autoplay = false"
                    @mouseleave="autoplay = true" class="text-left" style="height: 350px">
                    <q-carousel-slide v-for="(review, index) in reviews"
                        @click="$router.push({ name: 'profile-reviews', params: { id: $route.params.id, defaultCategory: 'all' } })"
                        :key="index" :name="index" style="cursor:pointer" class="bg-secondary q-pb-none">
                        <div class="flex">
                            <q-avatar v-if="$lget(review, '_fastjoin.sender.avatar')"
                                @click="$router.push(`/private/${review._fastjoin.sender._id}`)"
                                class="text-bold q-mr-sm" style="cursor:pointer;" size="59px" color="primary">
                                <img :src="$lget(review, '_fastjoin.sender.avatar.raw.file')" alt="avatar">
                            </q-avatar>
                            <q-avatar v-else @click="$router.push(`/private/${review._fastjoin.sender._id}`)"
                                class="text-bolds q-mr-sm" style="cursor:pointer;" size="59px" color="primary">
                                {{ review._fastjoin.sender.name[0] }}
                            </q-avatar>

                            <div style="width:225px">
                                <h3 class="text-bold" style="width:200px; margin:0 0 5px 0">
                                    {{ review._fastjoin.sender.name }}
                                </h3>
                                <p class="text-accent">
                                    {{ reviewDate(review) }} -
                                    <q-rating :value="review.rating" readonly style="padding-bottom: 14px"
                                        color="accent" size="0.7em" icon="star_border" icon-selected="star" />
                                </p>
                            </div>
                        </div>

                        <div class="bg-primary q-pa-md" style="height:200px; border-radius:1em;">
                            <p style="line-height: 22px;">
                                "{{ review.message }}"<span class="text-secondary">{{ reviewEditedTag(review) }}</span>
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
                    <q-rating :value="getReviewAverage" readonly class="q-pb-xs" color="accent" size="1em"
                        icon="star_border" icon-half="star_half" icon-selected="star" />
                    <p class="q-mb-none">{{ getReviewAverage.toFixed(1) }} out of 5</p>
                </div>
            </q-card-section>
        </q-card>
    </q-btn> -->

    <template v-if="$data.$windowWidth >= 950">
        <div style="margin-right: 1vw;">
            <q-card bordered class="bg-secondary text-uppercase" style="width: calc(50px + 5vw);">
                <q-card-section class="q-py-xs text-center" @click="followersDialog = true"
                    style="font-weight: 500; font-size: calc(9px + 1vw); cursor:pointer">
                    <p class="no-margin text-white">
                        Followers
                    </p>
                    <p class="no-margin text-accent">
                        {{ $lget(user, 'followers', []).length }}
                    </p>
                </q-card-section>
                <q-dialog v-model="followersDialog">
                    <followers-dialog :value="user"></followers-dialog>
                </q-dialog>
            </q-card>
        </div>

        <div style="margin-right: 1vw;">
            <q-card bordered class="bg-secondary text-uppercase" style="width: calc(50px + 5vw);">
                <q-card-section class="q-py-xs text-center" @click="followingDialog = true"
                    style="font-weight: 500; font-size: calc(9px + 1vw); cursor:pointer;">
                    <p class="no-margin text-white">
                        Following
                    </p>
                    <p class="no-margin text-accent">
                        {{ $lget(user, 'following.users', []).length }}
                    </p>
                </q-card-section>
                <q-dialog v-model="followingDialog">
                    <following-dialog :value="user"></following-dialog>
                </q-dialog>
            </q-card>
        </div>

        <div>
            <q-card bordered class="bg-secondary text-uppercase" style="width: calc(50px + 5vw);">
                <q-card-section @click="$router.push({
                    name: 'profile-reviews',
                    params: { id: $route.params.id, defaultCategory: 'all' }
                })" class="q-py-xs text-center" style="font-weight: 500; font-size: calc(9px + 1vw); cursor:pointer;">
                    <p class="no-margin text-white">
                        Reviews
                    </p>
                    <p class="no-margin text-accent">
                        {{ $lget(user, 'reviewsReceived', []).length }}
                    </p>
                </q-card-section>
            </q-card>
        </div>
    </template>
</template>

<style>
</style>

<script>
export default {
    name: 'Home',
};
</script>
