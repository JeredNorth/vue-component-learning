<template>
    <div id="following-dialog">
        <q-card class="bg-primary following-card">
            <q-card-section class="bg-primary">
                <h3 v-if="$authUser.name === value.name" class="text-bold text-accent text-center text-uppercase"
                    style="margin:0">
                    You are following
                </h3>
                <h3 v-else class="text-bold text-accent text-center text-uppercase" style="margin:0">
                    {{ value.name }} is following
                </h3>

                <q-input v-model="searchTerm" color="accent" label-color="white" bg-color="secondary"
                    style="margin: 15px 0" filled label="Search name here...">
                    <template v-slot:append>
                        <q-icon name="search" />
                    </template>
                </q-input>

                <q-scroll-area style="height: 550px">
                    <div v-for="(follow, index) in following" :key="index" class="bg-dark following-item">
                        <!--            <span>users array</span>-->
                        <div class="q-gutter-sm following-left">
                            <q-avatar v-if="$lget(follow, '_fastjoin.following.avatar')"
                                @click="$router.push(`/private/${follow._fastjoin.following._id}`)"
                                style="cursor:pointer" size="67px">
                                <img :src="$lget(follow, '_fastjoin.following.avatar.raw.file')" alt="avatar">
                            </q-avatar>
                            <q-avatar v-else @click="$router.push(`/private/${follow._fastjoin.following._id}`)"
                                style="cursor:pointer" color="secondary" size="67px" class="text-bold">
                                {{ follow._fastjoin.following.name[0] }}
                            </q-avatar>
                            <div class="following-text">
                                <p @click="$router.push(`/private/${follow._fastjoin.following._id}`)"
                                    class="text-bold ellipsis"
                                    style="width:275px; margin-bottom:5px; font-size:33px; cursor:pointer;">
                                    {{ follow._fastjoin.following.name }}
                                </p>
                                <p style="font-size:17px; margin-bottom:0">
                                    <span class="text-accent">FOLLOWED:</span> {{ followDate(follow) }}
                                </p>
                            </div>
                        </div>
                        <div class="following-buttons">
                            <q-btn v-if="$authUser.name === value.name" @click="contactUser(follow)" unelevated rounded
                                padding="xs xl" size="sm" color="complementary" label="message" />
                            <q-btn v-if="$authUser.name === value.name" @click="followUser(follow._fastjoin.following)"
                                unelevated rounded padding="xs xl" size="sm" color="complementary" label="unfollow" />
                        </div>
                    </div>
                </q-scroll-area>

            </q-card-section>
        </q-card>
    </div>
</template>

<script>
export default {
    name: 'FollowingDialog',
    props: {
    },
    data() {
        return {
            followingList: [
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
        following() {
            return this.followingList.filter(
                follow => follow._fastjoin.following.name.toLowerCase().includes(this.searchTerm.toLowerCase()),
            ).map(item => item.clone());
        },
    },
    methods: {

    },
};
</script>

<style scoped lang="scss" src="./_FollowersDialog.scss">
</style>
