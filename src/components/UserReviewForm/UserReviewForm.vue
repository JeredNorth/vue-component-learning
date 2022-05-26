<template>
  <div class="reviewForm">
    <q-form
      style="width:500px; height: 300px; margin:auto;"
    >
      <h1 class="q-my-md">Give a Review!</h1>
      <q-input
        v-model="message"
        filled
        label="Review Message"
        class="q-mb-md"
        type="textarea"
      />
      <q-rating
        v-model="rating"
        style="float:left; font-size:2.5em;"
        color="accent"
        icon="star_border"
        icon-selected="star"
      />

      <div>
        <q-btn label="Send Review" type="submit" color="secondary" style="float:right"></q-btn>
      </div>
    </q-form>
  </div>
</template>

<script>

  export default {
    name: 'userReviewform',
    props: {
      value: {
        type: Object,
      },
    },
    data() {
      return {
        message: '',
        rating: 5,
      };
    },
    computed: {
    },
  };
</script>

<style scoped lang="scss">
  @media screen and (max-width: 720px) {
    .q-form {
      width: 300px !important;
    }
    .q-rating {
      font-size: 1.6em !important;
      padding-top: 7px;
    }
  }
</style>
