<template>
  <div>
      <div class="row">
      <div class="col-lg-12">
        <h4 class="font-weight-bold py-3 mb-4">
          <span class="text-muted font-weight-light">Etiket Güncelle</span>
        </h4>
      </div>


      <div class="col-lg-12 mb-4">
        <b-card title="Etiket Güncelle">
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
                <b-btn variant="primary" class="font-weight-bold save-order mt-4" @click="submitTag">Etiket Güncelle</b-btn>
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
    let data = { id: vm.$route.params.id }
    vm.id = data.id 

    axios.post(process.env.VUE_APP_SERVER_URL + "/get_tag", {data})
    .then(
    (response) => {
        console.log(response.data)
        var tag = response.data.pop()
        vm.tagName = tag.tagName
    },
    (err) => {
        console.error(err)
    }
    )
    // vm.owner = this.$store.getters.getUser
    // console.log(vm.owner)
  },
  methods: {
    submitTag: function () {
      var vm = this
      let data = {
          id: vm.id,
          tagName: vm.tagName,
      }

      axios
        .post(process.env.VUE_APP_SERVER_URL + "/update_tag/", {data})
        .then((response) => {
          if (response.data == "success") {
              vm.$notify({
                  type: 'success',
                  text: 'Yeni Etiket Basariyla Güncellendi!'
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