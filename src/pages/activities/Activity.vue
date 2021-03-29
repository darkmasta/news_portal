<template>
<div class="activity_item">
    <img :src="activity.activityImage" />
    <h4>{{activity.activityTitle}}</h4>
</div>
</template>
<script>
import axios from "axios";

export default {
  name: "Activity",
  props: {
      activity: Object
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