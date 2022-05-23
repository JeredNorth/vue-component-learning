<template>
    <q-page id="reviews">
        <div style="width:90%; margin: 0 auto" class="flex justify-between">
            <h1 v-if="($lget($authUser, '_id') === $lget(user, '_id'))" class="text-accent">
                Your Reviews
            </h1>
            <h1 v-else class="text-accent">
                {{ $lget(user, 'name') }}'s Reviews
            </h1>

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
                            <q-avatar v-if="$lget(review, '_fastjoin.sender.avatar')"
                                @click="$router.push(`/private/${review._fastjoin.sender._id}`)"
                                class="text-bold q-mr-sm" style="cursor:pointer;" size="60px" color="secondary">
                                <img :src="$lget(review, '_fastjoin.sender.avatar.raw.file')" alt="avatar">
                            </q-avatar>
                            <q-avatar v-else @click="$router.push(`/private/${review._fastjoin.sender._id}`)"
                                class="text-bold q-mr-sm" style="cursor:pointer;" size="60px" color="secondary">
                                {{ review._fastjoin.sender.name[0] }}
                            </q-avatar>

                            <div>
                                <h3 class="text-bold" style="width:200px; margin:0 0 5px 0">
                                    {{ review._fastjoin.sender.name }}
                                </h3>
                                <p class="text-accent">
                                    {{ reviewDate(review) }} -
                                    <q-rating :value="review.rating" readonly class="q-pb-xs" color="accent" size="1em"
                                        icon="star_border" icon-selected="star" />
                                </p>
                            </div>
                        </div>

                        <div class="bg-dark q-pa-md" style="height:200px; border-radius:1em;">
                            <p>
                                "{{ review.message }}"<span class="text-secondary" style="font-size: 13px">-{{
                                        reviewEditedTag(review)
                                }}</span>
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
        <user-review-form v-if="($lget($authUser, 'name') !== $lget(user, 'name'))" :value="{ user }" class="review-form">
        </user-review-form>

    </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import userReviewForm from 'components/profile/userReviewForm/userReviewForm';
import reviewMixin from 'components/profile/reviewMixin';
import { makeFindPaginateMixin } from '@iy4u/common-client-lib';
import { date } from 'quasar';

export default {
    name: 'Reviews',
    components: {
        userReviewForm,
    },
    mixins: [
        reviewMixin,
        makeFindPaginateMixin({
            limit: 50,
            service: 'reviews',
            name: 'reviewsList',
            qid: 'reviewsPage',
            infinite: true,
            query() {
                return {
                    _id: {
                        $in: this.$lget(this.user, 'reviewsReceived'),
                    },
                    $sort: {
                        createdAt: -1,
                    },
                };
            },
            params() {
                return {
                    reviewResolversQuery: {
                        sender: [['_id', 'name', 'avatar']],
                    },
                };
            },
        }),
    ],
    data() {
        return {
            user: undefined,
            searchTerm: '',
            ratingFilter: null,
            ratingFilterOptions: [
                1, 2, 3, 4, 5
            ],
        };
    },
    async mounted() {
        if (this.$route.params.id && this.stateUser._id !== this.$route.params.id) {
            let user = this.getUser(this.$route.params.id);
            if (!user) {
                user = await this.loadGetUser(this.$route.params.id);
            }
            this.user = user.clone();
        } else {
            this.user = this.$authUser;
        }
    },
    computed: {
        ...mapGetters('auth', {
            stateUser: 'user',
            isAuthenticated: 'isAuthenticated',
        }),
        ...mapGetters('users', {
            getUser: 'get',
        }),
        reviews() {
            if (this.ratingFilter !== null) {
                return this.reviewsList.filter(
                    review => review._fastjoin.sender.name.toLowerCase().includes(this.searchTerm.toLowerCase()) && review.rating === this.ratingFilter,
                ).map(item => item.clone());
            }
            else {
                return this.reviewsList.filter(
                    review => review._fastjoin.sender.name.toLowerCase().includes(this.searchTerm.toLowerCase()),
                ).map(item => item.clone());
            }
        },
    },
    methods: {
        ...mapActions('users', {
            loadGetUser: 'get',
        }),
        reviewDate(review) {
            return date.formatDate(review.createdAt, 'MM/DD/YYYY');
        },
    },
};
</script>

<style scoped lang="scss">
.filter-wrapper {
    display: flex;
    width: 550px;
    margin: 0 auto;
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
