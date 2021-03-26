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
.activity_item img {
    flex-shrink: 0;
    min-width: 100%;
    min-height: 100%
}

.activity_item h4 {
    position: relative;
    top: -100%;
    color: white;
    background: rgba(0,0,0,0.6);
    left: 30%;
    width: 50%;
    text-align: center;
    z-index: 10;
}

.activity_item p {
    position: relative;
    top: -90%;
    color: white;
    background: rgba(204,12,0,0.6);
    left: 30%;
    width: 50%;
    text-align: center;
    z-index: 10;
}
</style>