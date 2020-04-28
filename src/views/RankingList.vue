<template>
  <div>
    <van-nav-bar
      class="top"
      fixed
      :title="rankingListData.title"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <div class="margin-top"></div>
    <van-tabs v-model="activeName" v-if="flag">
      <van-tab title="周榜" name="week">
        <van-card
          @click="select(item)"
          v-for="(item,index) in rankingListData.books"
          :key="index"
          :desc="item.author"
          :title="item.title"
          :thumb="decode(item.cover)"
        />
      </van-tab>
      <van-tab title="月榜" name="month">
        <van-card
          @click="select(item)"
          v-for="(item,index) in rankingMonthData.books"
          :key="index"
          :desc="item.author"
          :title="item.title"
          :thumb="decode(item.cover)"
        />
      </van-tab>
      <van-tab title="总榜" name="total">
        <van-card
          @click="select(item)"
          v-for="(item,index) in rankingTotalData.books"
          :key="index"
          :desc="item.author"
          :title="item.title"
          :thumb="decode(item.cover)"
        />
      </van-tab>
    </van-tabs>
    <div v-else>
      <van-card
        @click="select(item)"
        v-for="(item,index) in rankingListData.books"
        :key="index"
        :desc="item.author"
        :title="item.title"
        :thumb="decode(item.cover)"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rankingListData: {},
      rankingMonthData: {},
      rankingTotalData: {},
      activeName: "week",
      //是否有月榜和总榜
      flag: true
    };
  },
  methods: {
    decode(str) {
      return decodeURIComponent(str.slice(7));
    },
    select(item) {
      this.axios("/read/book/" + item._id + "").then(res => {
        this.$router.push({ name: "Detail", params: { data: res } });
      });
    }
  },
  watch: {
    $route(to, from) {
      if (to.name == "RankingList" && from.name == "Ranking") {
        this.rankingListData = this.$route.params.data.ranking;
        // console.log(this.$route.params);
        if (this.$route.params.data.ranking.monthRank) {
          this.flag = true;
          this.axios(
            "/read/ranking/" + this.$route.params.data.ranking.monthRank
          ).then(res => {
            // console.log(res);
            this.rankingMonthData = res.data.ranking;
          });
          this.axios(
            "/read/ranking/" + this.$route.params.data.ranking.totalRank
          ).then(res => {
            // console.log(res);
            this.rankingTotalData = res.data.ranking;
          });
        } else {
          this.flag = false;
        }
      }
    }
  },
  created() {
    // console.log(this.$route.params);
    this.rankingListData = this.$route.params.data.ranking;
    if (this.$route.params.data.ranking.monthRank) {
      this.flag = true;
      this.axios(
        "/read/ranking/" + this.$route.params.data.ranking.monthRank
      ).then(res => {
        // console.log(res);
        this.rankingMonthData = res.data.ranking;
      });
      this.axios(
        "/read/ranking/" + this.$route.params.data.ranking.totalRank
      ).then(res => {
        // console.log(res);
        this.rankingTotalData = res.data.ranking;
      });
    } else {
      this.flag = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.van-card__title {
  margin-top: 20px;
}
.top {
  z-index: 100;
}
.margin-top {
  margin-top: 46px;
}
.van-card__thumb {
  width: 66px;
  height: 88px;
}
</style>