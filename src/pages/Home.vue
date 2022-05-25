<template>
    <h1>Home Page</h1>
    <div class="home-button-wrapper" style="display:flex">
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

    <!-- <div>
        <q-card bordered class="bg-secondary text-uppercase" style="width: calc(50px + 5vw);">
            <q-card-section @click="$router.push({
                name: 'profile-reviews',
                params: { id: $route.params.id, defaultCategory: 'all' }
            })" class="q-py-xs text-center" style="font-weight: 500; font-size: calc(9px + 1vw); cursor:pointer;">
                <p class="no-margin text-white">
                    Reviews
                </p>
                <p class="no-margin text-accent">
                    3
                </p>
            </q-card-section>
        </q-card>
    </div> -->

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
        };
    },
};
</script>
