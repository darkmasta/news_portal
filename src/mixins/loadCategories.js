import axios from "axios";
import categoryData from "../pages/category/categories_data";

var loadCustomers = {
  data() {
    return {
      categories: [],
    };
  },
  created: function () {
    var vm = this;

    vm.categoryTitles = Object.keys(categoryData);

    axios
      .post(process.env.VUE_APP_SERVER_URL + "/get_categories/", {})
      .then((response) => {
        //console.log(response.data);
        vm.categoriesData = response.data[0];
        console.log(vm.categoriesData.updatedCategories);
        vm.categoriesData.updatedCategories.forEach((element) => {
          vm.categoryTitles.push(element.topCategory);
        });

        // remove duplicates
        // it is expected from top categories
        var uniqueCategoryTitles = [...new Set(vm.categoryTitles)];
        vm.categoryTitles = uniqueCategoryTitles;

        vm.categoriesData.updatedCategories.forEach((element) => {
          if (vm.categoriesData[element.topCategory]) {
            vm.categoriesData[element.topCategory].push(element.bottomCategory);
          } else {
            vm.categoriesData[element.topCategory] = new Array();
            if (!element.bottomCategory == "")
              vm.categoriesData[element.topCategory].push(
                element.bottomCategory
              );
          }
        });
      });
  },
};

export default loadCustomers;
