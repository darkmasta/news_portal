<template>
  <div>
      <div class="row">
      <div class="col-lg-12">
        <h4 class="font-weight-bold py-3 mb-4">
          <span class="text-muted font-weight-light">Etiket Oluştur</span>
        </h4>
      </div>


      <div class="col-lg-12 mb-4">
        <b-card title="Yeni Etiket Formu">
          <b-card-body>
            <b-row>
              <b-col>
                <b-form-group label="Etkiet İsmi">
                  <b-input label="Etkiet İsmi" 
                              placeholder="Etkiet İsmi"
                              v-model="tagName">
                  </b-input>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col class="offset-10">
                <b-btn variant="primary" class="font-weight-bold save-order mt-4" @click="submitTag">Etiket Ekle</b-btn>
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
  },
  computed: {

  }
} 
</script>

<style>
</style>