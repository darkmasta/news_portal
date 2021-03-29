<template>
  <div>
    <div class="row">
      <div class="col-lg-12">
        <h4 class="font-weight-bold py-3 mb-4">
          <span class="text-muted font-weight-light">Category Create</span>
        </h4>
      </div>
    </div>
    <create-top-category></create-top-category> 
    <create-bottom-category></create-bottom-category>
    <div class="divider"></div>
    <update-top-category />
    <update-bottom-category />
    <div class="divider"></div>
    <delete-top-category></delete-top-category>
    <delete-bottom-category></delete-bottom-category>
  </div>
</template>
<script>
import axios from "axios";
import categoryData from "./categories_data"
import CreateTopCategory from "./CreateTopCategory"
import CreateBottomCategory from "./CreateBottomCategory"
import DeleteTopCategory from "./DeleteTopCategory"
import DeleteBottomCategory from "./DeleteBottomCategory"
import UpdateTopCategory from "./UpdateTopCategory"
import UpdateBottomCategory from "./UpdateBottomCategory"



export default {
  name: "category-create",
  components: {
    'create-top-category': CreateTopCategory,
    'create-bottom-category': CreateBottomCategory,
    'delete-top-category': DeleteTopCategory,
    'delete-bottom-category': DeleteBottomCategory,
    'update-top-category': UpdateTopCategory,
    'update-bottom-category': UpdateBottomCategory
  },
  metaInfo: {
    title: "Category Create",
  },
  data() {
    return {
      categoriesData: {},
      categoryTitles: [],
      selectedCategories: [],
    }
  },
  created() {
    var vm = this;
    vm.categoryTitles = Object.keys(categoryData)

  },
  methods: {
  }
};
</script>
<style>

.divider {
  height: 1rem;
  width: 102%;
  background: rgb(2,0,36);
  background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 7%, rgba(0,212,255,1) 100%);
}

</style>