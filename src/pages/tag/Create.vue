<template>
  <div>
      <div class="row">
      <div class="col-lg-12">
        <h4 class="font-weight-bold py-3 mb-4">
          <span class="text-muted font-weight-light">{{ $t('tags.create tag') }}</span>
        </h4>
      </div>


      <div class="col-lg-12 mb-4">
        <b-card>
          <h4>{{ $t('tags.new tag form') }}</h4>
          <b-card-body>
            <b-row>
              <b-col>
                <b-form-group>
                  <legend class="bv-no-focus-ring col-form-label pt-0">{{ $t('tags.tag name') }}</legend>
                  <b-input v-model="tagName" 
                              placeholder="Etkiet İsmi">
                  </b-input>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col class="offset-10">
                <b-btn variant="primary" class="font-weight-bold save-order mt-4" @click="submitTag">{{ $t('tags.add tag')}}</b-btn>
              </b-col>
            </b-row>
          </b-card-body>
        </b-card>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  name: "ad-create",
  metaInfo: {
    title: "Ad Create",
  },
  components: {
  },
  data: () => ({
    tagName: '',
    tagText: '',
  }),
  computed: {

  },
  created() {
    var vm = this

    // vm.owner = this.$store.getters.getUser
    // console.log(vm.owner)
  },
  methods: {
    submitTag: function () {
      var vm = this
      let data = {tagName: vm.tagName, }

      axios
        .post(process.env.VUE_APP_SERVER_URL + "/create_tag/", {data})
        .then((response) => {
          if (response.data == "success") {
              vm.$notify({
                  type: 'success',
                  text: 'Yeni Etiket Basariyla Olusturuldu!'
              });
              setTimeout(() => {vm.$router.push({name: 'Tags'})}, 1500);
          }
        });
    }
  }
} 
</script>

<style>
</style>