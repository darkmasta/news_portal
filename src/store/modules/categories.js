import api from "../../api/node-server";
import { router } from "../../router/index";
import categoryData from "@/pages/category/categories_data";
import axios from "axios";

const state = {
  categories: {},
};

const getters = {
  allCategories: (state) => state.categories,
};

const actions = {
  async getCategories(state) {
    var categoryTitles = Object.keys(categoryData);

    axios
      .post(process.env.VUE_APP_SERVER_URL + "/get_categories/", {})
      .then((response) => {
        //console.log(response.data);
        var categoriesData = response.data[0];

        categoriesData.updatedCategories.forEach((element) => {
          categoryTitles.push(element.topCategory);
        });

        // remove duplicates
        // it is expected from top categories
        var uniqueCategoryTitles = [...new Set(categoryTitles)];
        categoryTitles = uniqueCategoryTitles;

        categoriesData.updatedCategories.forEach((element) => {
          if (categoriesData[element.topCategory]) {
            categoriesData[element.topCategory].push(element.bottomCategory);
          } else {
            categoriesData[element.topCategory] = new Array();
            if (!element.bottomCategory == "")
              categoriesData[element.topCategory].push(element.bottomCategory);
          }
        });

        state.commit("setCategories", categoriesData);
      });
  },
};

const mutations = {
  setCategories: (state, categories) => {
    state.categories = categories;
  },
};

export default { state, getters, actions, mutations };
