<template>
  <sidenav :orientation="orientation" :class="curClasses">
    <div class="sidenav-inner mt-4" :class="{ 'py-1': orientation !== 'horizontal' }">
      <sidenav-router-link icon="fas fa-tachometer-alt" :badge-class="isMenuActive('/')?'success badge-dot': null" to="/" :exact="true">Dashboard</sidenav-router-link>
      <sidenav-router-link icon="fas fa-newspaper" :badge-class="isMenuActive('/posts')?'success badge-dot': null" to="/posts" :active="isMenuActive('/posts')" :exact="true">Haber Yonetimi</sidenav-router-link>
      <sidenav-router-link icon="fas fa-tag" :badge-class="isMenuActive('/categories')?'success badge-dot': null" to="/category" :active="isMenuActive('/category')" :exact="true">Kategori Yonetimi</sidenav-router-link>
      <sidenav-router-link icon="fas fa-calendar-week" :badge-class="isMenuActive('/orders')?'success badge-dot': null" to="/activities" :active="isMenuActive('/activities')" :exact="true">Etkinlik Listesi</sidenav-router-link>
      <sidenav-router-link icon="fas fa-ad" :badge-class="isMenuActive('/instant-help')?'success badge-dot': null" to="/instant-help" :active="isMenuActive('/instant-help')" :exact="true">Reklam Yonetimi</sidenav-router-link>
      <sidenav-router-link icon="fas fa-heading" :badge-class="isMenuActive('/quotes')?'success badge-dot': null" to="/quotes" :active="isMenuActive('/quotes')" :exact="true">Kunye Duzenle</sidenav-router-link>
      <sidenav-router-link icon="fas fa-file" :badge-class="isMenuActive('/invoicing')?'success badge-dot': null" to="/invoicing" :active="isMenuActive('/invoicing')" :exact="true">Iletisim Duzenle</sidenav-router-link>
      <sidenav-router-link icon="fas fa-users" :badge-class="isMenuActive('/admin')?'success badge-dot': null" to="/admin" :active="isMenuActive('/users')" :exact="true">Kullanici Islemleri</sidenav-router-link>
      <li class="sidenav-item" style="">
                  <a href="javascript:void(0)" class="sidenav-link sidenav-toggle">
                    <i class="sidenav-icon ion ion-ios-settings"></i>
                    <div>Item 1</div>
                  </a>
                  <ul class="sidenav-menu">
                    <li class="sidenav-item">
                      <a href="javascript:void(0)" class="sidenav-link">
                        <div>Item 1.1</div>
                      </a>
                    </li>
                    <li class="sidenav-item" style="">
                      <a href="javascript:void(0)" class="sidenav-link sidenav-toggle">
                        <div>Item 2.2</div>
                      </a>

                      <ul class="sidenav-menu">
                        <li class="sidenav-item">
                          <a href="javascript:void(0)" class="sidenav-link">
                            <div>Item 2.2.1</div>
                          </a>
                        </li>
                        <li class="sidenav-item">
                          <a href="javascript:void(0)" class="sidenav-link" id="111">
                            <div>Item 2.2.2</div>
                          </a>
                        </li>
                        <li class="sidenav-item">
                          <a href="javascript:void(0)" class="sidenav-link">
                            <div>Ne veriyim abime</div>
                          </a>
                        </li>
                      </ul>
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
} from "@/vendor/libs/sidenav";

export default {
  name: "app-layout-sidenav",
  components: {
    Sidenav,
    SidenavBlock,
    SidenavRouterLink,
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
