<template>
    <div id="followers-dialog">
        <q-card class="bg-primary following-card">
            <q-card-section class="bg-primary">
                <h3 v-if="$authUser.name === value.name" class="text-bold text-accent text-center text-uppercase"
                    style="margin:0">
                    Your followers
                </h3>
                <h3 v-else class="text-bold text-accent text-center text-uppercase" style="margin:0">
                    {{ value.name }}'s followers
                </h3>

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
                            <q-avatar v-if="$lget(follow, '_fastjoin.follower.avatar')"
                                @click="$router.push(`/private/${follow._fastjoin.follower._id}`)"
                                style="cursor:pointer" size="67px">
                                <img :src="$lget(follow, '_fastjoin.follower.avatar.raw.file')" alt="avatar">
                            </q-avatar>
                            <q-avatar v-else @click="$router.push(`/private/${follow._fastjoin.follower._id}`)"
                                style="cursor:pointer" color="secondary" size="67px" class="text-bold">
                                {{ follow._fastjoin.follower.name[0] }}
                            </q-avatar>
                            <div class="following-text">
                                <p @click="$router.push(`/private/${follow._fastjoin.follower._id}`)" class="text-bold"
                                    style="width:275px; margin-bottom:5px; font-size:33px; cursor:pointer;">
                                    {{ follow._fastjoin.follower.name }}
                                </p>
                                <p style="font-size:17px; margin-bottom:0">
                                    <span class="text-accent">FOLLOWED:</span> {{ followDate(follow) }}
                                </p>
                            </div>
                            <q-btn v-if="!isFollowing(follow._fastjoin.follower) && !$authUser.name === value.name"
                                @click="followUser(follow._fastjoin.follower)" class="mini-follow-button" unelevated
                                round color="green" size="xs" icon="fas fa-plus" />
                        </div>
                        <div class="following-buttons">
                            <q-btn v-if="$authUser.name === value.name" @click="contactUser(follow)" unelevated rounded
                                ripple padding="xs xl" size="sm" color="complementary" label="message" />
                            <q-btn v-if="$authUser.name === value.name"
                                @click="blockUser($lget(follow, '_fastjoin.follower'))" unelevated rounded ripple
                                padding="xs xl" size="sm" color="red" text-color="black" label="block" />
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
                    avatar: 'test avatar 1',
                    name: 'test name 1',
                    date: 'test date',
                },
                {
                    avatar: 'test avatar 2',
                    name: 'test name',
                    date: 'test date',
                },
                {
                    avatar: 'test avatar 3',
                    name: 'test name 2',
                    date: 'test date 3',
                },
            ],
            searchTerm: '',
        };
    },
    computed: {
        followers() {
            return this.followersList.filter(
                (follow) => follow._fastjoin.follower.name.toLowerCase().includes(this.searchTerm.toLowerCase()),
            ).map((item) => item.clone());
        },
    },
    methods: {

    },
};
</script>

<style scoped lang="scss" src="./_FollowersDialog.scss">
</style>
