<template>
    <q-page id="reviews">
        <div style="width:90%; margin: 0 auto" class="flex justify-between">
            <h1 class="text-accent">
                Your Reviews
            </h1>
            <!-- <h1 v-else class="text-accent">
                {{ $lget(user, 'name') }}'s Reviews
            </h1> -->

            <div>
                <slot name="back-btn">
                    <q-btn @click="$router.go(-1)" color="primary" style="margin: 35px 0;">
                        <q-icon name="chevron_left" />
                        Go Back
                    </q-btn>
                </slot>
            </div>
        </div>

        <div class="filter-wrapper">
            <q-input v-model="searchTerm" color="accent" label-color="white" bg-color="primary"
                style="margin: 0 auto 25px auto; width: 250px;" filled label="Filter name...">
                <template v-slot:append>
                    <q-icon name="search" />
                </template>
            </q-input>
            <q-select v-model="ratingFilter" :options="ratingFilterOptions" clearable filled behavior="menu"
                bg-color="primary" label-color="white" label="filter rating..."
                style="margin: 0 auto 25px auto; width: 250px;" />
        </div>

        <q-scroll-area v-if="reviews.length !== 0" style="height: 700px; width: 90%; margin: auto;">
            <div class="review-container flex q-gutter-lg">
                <q-card v-for="(review, index) in reviews" :key="index" class="bg-primary" style="width:325px">
                    <q-card-section>
                        <div class="flex">
                            <q-avatar v-if="review.avatar" class="text-bold q-mr-sm" style="cursor:pointer;" size="60px"
                                color="secondary">
                                <img :src="review.avatar" alt="avatar">
                            </q-avatar>
                            <q-avatar v-else class="text-bold q-mr-sm" style="cursor:pointer;" size="60px" color="secondary">
                                {{ review.name[0] }}
                            </q-avatar>

                            <div>
                                <h3 class="text-bold" style="width:200px; margin:0 0 5px 0">
                                    {{ review.name }}
                                </h3>
                                <p class="text-accent">
                                    {{ review.date }} -
                                    <q-rating :value="review.rating" readonly class="q-pb-xs" color="accent" size="1em"
                                        icon="star_border" icon-selected="star" />
                                </p>
                            </div>
                        </div>

                        <div class="bg-dark q-pa-md" style="height:200px; border-radius:1em;">
                            <p>
                                "{{ review.message }}"
                                <!-- <span class="text-secondary" style="font-size: 13px">-{{
                                        reviewEditedTag(review)
                                }}</span> -->
                            </p>
                        </div>

                    </q-card-section>
                    <p class="text-accent text-center q-mb-sm">{{ index + 1 }} OF {{ reviews.length }}</p>
                </q-card>
            </div>
        </q-scroll-area>

        <div v-else style="width:90%; margin:auto;">
            <h1 class="text-center">No Reviews</h1>
        </div>

        <q-separator class="q-my-md" style="width:90%; margin: 20px auto;" size="2px" color="accent" />

        <!-- <user-review-form v-if="($lget($authUser, 'name') !== $lget(user, 'name'))" :value="{ user }" class="review-form">
        </user-review-form> -->

    </q-page>
</template>

<script>
// import userReviewForm from 'components/profile/userReviewForm/userReviewForm';
// import { date } from 'quasar';

export default {
    name: 'Reviews',
    components: {

    },
    data() {
        return {
            user: undefined,
            searchTerm: '',
            ratingFilter: null,
            ratingFilterOptions: [
                1, 2, 3, 4, 5,
            ],
            reviewsList: [
                {
                    avatar: '',
                    name: 'Jered North',
                    message: 'Wilfred got me the items I wanted in excellent condition so quickly',
                    date: '2/22/2022',
                    rating: 4,
                },
                {
                    avatar: '',
                    name: 'Jered North',
                    message: 'Wilfred got me the items I wanted in excellent condition so quickly',
                    date: '2/22/2022',
                    rating: 4,
                },
                {
                    avatar: '',
                    name: 'Jered North',
                    message: 'Wilfred got me the items I wanted in excellent condition so quickly',
                    date: '2/22/2022',
                    rating: 4,
                },
            ],
        };
    },
    computed: {
        reviews() {
            if (this.ratingFilter !== null) {
                return this.reviewsList.filter(
                    (review) => review.name.toLowerCase().includes(this.searchTerm.toLowerCase()) && review.rating === this.ratingFilter,
                ).map((item) => item);
            }

            return this.reviewsList.filter(
                (review) => review.name.toLowerCase().includes(this.searchTerm.toLowerCase()),
            ).map((item) => item);
        },
    },
    methods: {
        // reviewDate(review) {
        //     return date.formatDate(review.createdAt, 'MM/DD/YYYY');
        // },
    },
};
</script>

<style scoped lang="scss">
.filter-wrapper {
    display: flex;
    width: 550px;
    margin: 0 auto;
}
.review-container {
    color: white;
}

@media screen and (max-width: 720px) {
    h1 {
        font-size: 35px;
        padding: 5px 0;
    }

    .filter-wrapper {
        display: block;
        width: 250px;
    }
}
</style>
