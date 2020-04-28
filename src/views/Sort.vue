<template>
  <div>
    <!-- <van-nav-bar class="top" fixed title="分类" /> -->
    <!-- <div class="margin-top"></div> -->
    <van-tabs v-model="active" animated title-active-color="red">
      <van-tab title="男生">
        <!-- <template #title>男生 <van-icon name="fire" /></template> -->
        <div class="male">
          <van-grid :border="false" :column-num="2" class="content">
            <van-grid-item
              @click="select(item,'male')"
              class="content-item"
              v-for="(item,index) in sortData.male"
              :key="index"
            >
              <van-image :src="decode(item)" />
              <h1 class="title">{{item.name}}</h1>
            </van-grid-item>
          </van-grid>
        </div>
      </van-tab>
      <van-tab title="女生">
        <!-- <template #title>女生 <van-icon name="like" /></template> -->
        <div class="female">
          <van-grid :border="false" :column-num="2" class="content">
            <van-grid-item
              @click="select(item,'female')"
              class="content-item"
              v-for="(item,index) in sortData.female"
              :key="index"
            >
              <van-image :src="decode(item)" />
              <h1 class="title">{{item.name}}</h1>
            </van-grid-item>
          </van-grid>
        </div>
      </van-tab>
      <van-tab title="人文教育">
        <!-- <template #title>人文教育 <van-icon name="hot" /></template> -->
        <div class="press">
          <van-grid :border="false" :column-num="2" class="content">
            <van-grid-item
              @click="select(item,'press')"
              class="content-item"
              v-for="(item,index) in sortData.press"
              :key="index"
            >
              <van-image :src="decode(item)" />
              <h1 class="title">{{item.name}}</h1>
            </van-grid-item>
          </van-grid>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      sortData: {}
    };
  },
  methods: {
    decode(str) {
      return decodeURIComponent(str.bookCover[0].slice(7));
    },
    select(item, gender) {
      if (item) {
        `/read/book/by-categories?gender={$gender}&type=hot&major={$item.name}`
        this.axios(
          "/read/book/by-categories?gender=" +
            gender +
            "&type=hot&major=" +
            item.name
        ).then(res => {
          this.$router.push({
            name: "List",
            params: { list: res.data, name: item.name }
          });
        });
      }
    }
  },
  mounted() {
    this.axios("/read/cats/lv2/statistics").then(res => {
      this.sortData = res.data;
    });
  }
};
</script>

<style lang="scss" scoped>
.top{
  z-index: 100;
  // background-color: #04b1ff;
}
.margin-top{
  margin-top: 46px;
}
  .content-item {
    .van-image {
      width: 70%;
      border: 4px solid #f0f0f0;
    	box-shadow: 10px 10px 5px #888888;
      // border-radius: 14px;
      min-height: 160px;
    }
    .title {
      margin-top: 10px;
      font-weight: bold;
    }
}
</style>