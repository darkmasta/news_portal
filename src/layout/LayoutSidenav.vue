<template>
  <sidenav :orientation="orientation" :class="curClasses" :accordion="true">
    <div class="sidenav-inner mt-4" :class="{ 'py-1': orientation !== 'horizontal' }">
      <sidenav-router-link icon="fas fa-tachometer-alt" :badge-class="isMenuActive('/')?'success badge-dot': null" to="/" :exact="true">Dashboard</sidenav-router-link>
      <sidenav-router-link icon="fas fa-newspaper" :badge-class="isMenuActive('/posts')?'success badge-dot': null" to="/posts" :active="isMenuActive('/posts')" :exact="true">{{ $t('main.post management')}}</sidenav-router-link>
      <sidenav-router-link icon="fas fa-calendar-week" :badge-class="isMenuActive('/orders')?'success badge-dot': null" to="/activities" :active="isMenuActive('/activities')" :exact="true">{{ $t('main.activity management') }}</sidenav-router-link>
      <sidenav-router-link icon="fas fa-ad" :badge-class="isMenuActive('/ads')?'success badge-dot': null" to="/ads" :active="isMenuActive('/ads')" :exact="true">{{ $t('main.ad management' )}}</sidenav-router-link>
      <sidenav-router-link icon="fas fa-heading" :badge-class="isMenuActive('/identity')?'success badge-dot': null" to="/identity" :active="isMenuActive('/identity')" :exact="true">{{ $t('main.identity management') }}</sidenav-router-link>
      <sidenav-router-link icon="fas fa-file" :badge-class="isMenuActive('/contact')?'success badge-dot': null" to="/contact" :active="isMenuActive('/contact')" :exact="true">{{ $t('main.contact management') }}</sidenav-router-link>
      <sidenav-router-link icon="fas fa-address-card" :badge-class="isMenuActive('/about')?'success badge-dot': null" to="/about" :active="isMenuActive('/about')" :exact="true">{{ $t('main.about management') }}</sidenav-router-link>
      <sidenav-router-link icon="fas fa-users" :badge-class="isMenuActive('/admin/users')?'success badge-dot': null" to="/admin/users" :active="isMenuActive('/users')" :exact="true">{{ $t('main.users management') }}</sidenav-router-link>
      <sidenav-divider />


      <li class="sidenav-item" style="">
        <a href="javascript:void(0)" class="sidenav-link sidenav-toggle">
          <i class="sidenav-icon fas fa-tag"></i>
          <div>{{ $t('main.category management')}}</div>
        </a>
        <ul class="sidenav-menu">
          <li class="sidenav-item" style="display: block;">
            <a href="javascript:void(0)" class="sidenav-link">
              <div><router-link to="/category">{{ $t('main.categories')}}</router-link></div>
            </a>
          </li>
          <li class="sidenav-item" style="display: block;">
            <a href="javascript:void(0)" class="sidenav-link">
              <div><router-link to="/category/create">{{ $t('main.create category') }}</router-link></div>
            </a>
          </li>
        </ul>
      </li>

      <li class="sidenav-item" style="">
        <a href="javascript:void(0)" class="sidenav-link sidenav-toggle">
          <i class="sidenav-icon fas fa-hashtag"></i>
          <div>{{ $t('main.tags management') }}</div>
        </a>
        <ul class="sidenav-menu">
          <li class="sidenav-item" style="display: block;">
            <a href="javascript:void(0)" class="sidenav-link">
              <div><router-link to="/tags">{{ $t('main.tags') }}</router-link></div>
            </a>
          </li>
          <li class="sidenav-item" style="display: block;">
            <a href="javascript:void(0)" class="sidenav-link">
              <div><router-link to="/tags/create">{{ $t('main.create tag') }}</router-link></div>
            </a>
          </li>
        </ul>
      </li>

      <li class="sidenav-item" style="">
        <a href="javascript:void(0)" class="sidenav-link sidenav-toggle">
          <i style="font-size: 22px;" class="sidenav-icon fab fa-searchengin"></i>
          <div>{{ $t('main.seo management') }}</div>
        </a>
        <ul class="sidenav-menu">
          <li class="sidenav-item" style="display: block;">
            <a href="javascript:void(0)" class="sidenav-link">
              <div><router-link to="/seo/create">{{ $t('main.seo settings')}}</router-link></div>
            </a>
          </li>
        </ul>
      </li>


    </div>
  </sidenav>
</template>
<script>
import {
  Sidenav,
  SidenavBlock,
  SidenavRouterLink,
  SidenavDivider,
} from "@/vendor/libs/sidenav";

export default {
  name: "app-layout-sidenav",
  components: {
    Sidenav,
    SidenavBlock,
    SidenavRouterLink,
    SidenavDivider
  },

  props: {
    orientation: {
      type: String,
      default: "vertical",
    },
  },

  computed: {
    curClasses() {
      let bg = this.layoutSidenavBg;

      if (
        this.orientation === "horizontal" &&
        (bg.indexOf(" sidenav-dark") !== -1 ||
          bg.indexOf(" sidenav-light") !== -1)
      ) {
        bg = bg
          .replace(" sidenav-dark", "")
          .replace(" sidenav-light", "")
          .replace("-darker", "")
          .replace("-dark", "");
      }

      return (
        `bg-${bg} ` +
        (this.orientation !== "horizontal"
          ? "layout-sidenav"
          : "layout-sidenav-horizontal container-p-x flex-grow-0")
      );
    },
  },

  methods: {
    isMenuActive(url) {
      if (url != '/') {
        return this.$route.path.indexOf(url) === 0;
      } else if (url == '/')  {
        if(window.location.href.split("/#/")[1] == "")  {
          return true
        }
      }
    },

    isMenuOpen(url) {
      return (
        this.$route.path.indexOf(url) === 0 && this.orientation !== "horizontal"
      );
    },

    toggleSidenav() {
      this.layoutHelpers.toggleCollapsed();
    },
  },
};
</script>
