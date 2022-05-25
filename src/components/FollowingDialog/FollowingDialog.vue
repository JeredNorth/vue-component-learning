<template>
    <div id="following-dialog">
        <q-card class="bg-primary following-card">
            <q-card-section class="bg-primary" style="padding:8px">
                <h3 class="text-bold text-accent text-center text-uppercase" style="margin:0">
                    You are following
                </h3>
                <!-- <h3 v-else class="text-bold text-accent text-center text-uppercase" style="margin:0">
                    {{ value.name }} is following
                </h3> -->

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
                            <q-avatar v-if="follow.avatar" style="cursor:pointer" size="67px">
                                <img :src="follow.avatar" alt="avatar">
                            </q-avatar>
                            <q-avatar v-else style="cursor:pointer" color="secondary" size="67px" class="text-bold">
                                {{ follow.name[0] }}
                            </q-avatar>
                            <div class="following-text">
                                <p class="text-bold ellipsis"
                                    style="width:275px; margin-bottom:5px; font-size:33px; cursor:pointer;">
                                    {{ follow.name }}
                                </p>
                                <p style="font-size:17px; margin-bottom:0">
                                    <span class="text-accent">FOLLOWED:</span> {{ follow.date }}
                                </p>
                            </div>
                        </div>
                        <div class="following-buttons">
                            <q-btn unelevated rounded padding="xs xl" size="sm" color="complementary" label="message" />
                            <q-btn unelevated rounded padding="xs xl" size="sm" color="complementary"
                                label="unfollow" />
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
                    avatar: 'https://static.bandainamcoent.eu/high/pac-man/brand-setup/pac_thumb_brand_624x468_4b.jpg',
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
        following() {
            return this.followingList.filter(
                (follow) => follow.name.toLowerCase().includes(this.searchTerm.toLowerCase()),
            ).map((item) => item);
        },
    },
    methods: {

    },
};
</script>

<style scoped lang="scss" src="./_FollowingDialog.scss">
</style>
