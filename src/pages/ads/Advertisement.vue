<template>
<div class="activity_item">
    <img :src="ad.adImage" />
    <h4>{{ad.adName}}</h4>
</div>
</template>
<script>
import axios from "axios";
export default {
  name: "activity",
  props: {
      ad: Object
  },
  data: () => ({
      activity: {},
  }),
  created() {
    var vm = this;
  },
  methods: {
  }
};
</script>

<style>
</style>