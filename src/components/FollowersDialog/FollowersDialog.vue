<template>
    <div id="followers-dialog">
        <q-card class="bg-primary following-card">
            <q-card-section class="bg-primary" style="padding:10px">
                <h3 class="text-bold text-accent text-center text-uppercase" style="margin:0">
                    Your followers
                </h3>
                <!-- <h3 v-else class="text-bold text-accent text-center text-uppercase" style="margin:0">
                    {{ value.name }}'s followers
                </h3> -->

                <q-input v-model="searchTerm" color="accent" label-color="white" bg-color="secondary"
                    style="margin: 15px 0" filled label="Search name here...">
                    <template v-slot:append>
                        <q-icon name="search" />
                    </template>
                </q-input>

                <q-scroll-area style="height: 550px">
                    <div v-for="(follow, index) in followers" :key="index" class="bg-dark following-item">
                        <!--            <span>users array</span>-->
                        <div class="q-gutter-sm following-left">
                            <q-avatar v-if="follow.avatar" style="cursor:pointer" size="67px">
                                <img :src="follow.avatar" alt="avatar">
                            </q-avatar>
                            <q-avatar v-else style="cursor:pointer" color="secondary" size="67px" class="text-bold">
                                {{ follow.name[0] }}
                            </q-avatar>
                            <div class="following-text">
                                <p class="text-bold"
                                    style="width:275px; margin-bottom:5px; font-size:33px; cursor:pointer;">
                                    {{ follow.name }}
                                </p>
                                <p style="font-size:17px; margin-bottom:0">
                                    <span class="text-accent">FOLLOWED:</span> {{ follow.date }}
                                </p>
                            </div>
                            <!-- <q-btn v-if="!isFollowing(follow._fastjoin.follower) && !$authUser.name === value.name"
                                @click="followUser(follow._fastjoin.follower)" class="mini-follow-button" unelevated
                                round color="green" size="xs" icon="fas fa-plus" /> -->
                        </div>
                        <div class="following-buttons">
                            <q-btn unelevated rounded ripple padding="xs xl" size="sm" color="complementary"
                                label="message" />
                            <q-btn unelevated rounded ripple padding="xs xl" size="sm" color="red" text-color="black"
                                label="block" />
                        </div>
                    </div>
                </q-scroll-area>

            </q-card-section>
        </q-card>
    </div>
</template>

<script>

export default {
    name: 'FollowersDialog',
    props: {
    },
    data() {
        return {
            followersList: [
                {
                    avatar: 'https://image.emojipng.com/471/9074471.jpg',
                    name: 'Jered North',
                    date: '2/22/2022',
                },
                {
                    avatar: '',
                    name: 'Lorley Splendor',
                    date: '1/15/2022',
                },
                {
                    avatar: '',
                    name: 'Sadderton',
                    date: '9/25/2021',
                },
            ],
            searchTerm: '',
        };
    },
    computed: {
        followers() {
            return this.followersList.filter(
                (follow) => follow.name.toLowerCase().includes(this.searchTerm.toLowerCase()),
            ).map((item) => item);
        },
    },
    methods: {

    },
};
</script>

<style scoped lang="scss" src="./_FollowersDialog.scss">
</style>
