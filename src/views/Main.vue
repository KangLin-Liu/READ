<template>
  <div class="main">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <div class="margin-bottom"></div>
    <van-tabbar v-model="active" active-color="#07c160" route>
      <van-tabbar-item to="/main/bookshelf">
        <span>书架</span>
        <template #icon="props">
          <img :src="props.active ? icon.bookshelf_active : icon.bookshelf_inactive" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/main/home">
        <span>首页</span>
        <template #icon="props">
          <img :src="props.active ? icon.home_active : icon.home_inactive" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/main/sort">
        <span>分类</span>
        <template #icon="props">
          <img :src="props.active ? icon.sort_active : icon.sort_inactive" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/main/ranking">
        <span>排行</span>
        <template #icon="props">
          <img :src="props.active ? icon.ranking_active : icon.ranking_inactive" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      icon: {
        home_active: require("../assets/images/main/home_active.png"),
        home_inactive: require("../assets/images/main/home.png"),
        sort_active: require("../assets/images/main/sort_active.png"),
        sort_inactive: require("../assets/images/main/sort.png"),
        bookshelf_active: require("../assets/images/main/bookshelf_active.png"),
        bookshelf_inactive: require("../assets/images/main/bookshelf.png"),
        ranking_active: require("../assets/images/main/ranking_active.png"),
        ranking_inactive: require("../assets/images/main/ranking.png")
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.margin-bottom {
  margin-bottom: 50px;
}
</style>