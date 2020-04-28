<template>
  <div>
    <!-- 我是列表 -->
    <van-nav-bar class="top" fixed :title="list.name" left-arrow @click-left="$router.go(-1)" />
    <div class="margin-top"></div>
    <van-card
      @click="select(item)"
      v-for="(item,index) in list.list.books"
      :key="index"
      :desc="item.author"
      :title="item.title"
      :thumb="decode(item.cover)"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: {}
    };
  },
  watch: {
    $route(to, from) {
      if (from.name == "Sort" && to.name == "List") {
        this.list = this.$route.params;
      }
    }
  },
  methods: {
    decode(str) {
      if (str) {
        return decodeURIComponent(str.slice(7));
      }
    },
    select(item) {
      this.axios("/read/book/" + item._id + "").then(res => {
        this.$router.push({ name: "Detail", params: { data:res } });
      });
    }
  },
  created() {
    this.list = this.$route.params;
  }
};
</script>

<style lang="scss" scoped>
.van-card__title {
  margin-top: 20px;
}
.margin-top {
  margin-top: 46px;
}
// .book {
//   margin: 20px;
// }
.van-card__thumb {
  width: 66px;
  height: 88px;
}
</style>