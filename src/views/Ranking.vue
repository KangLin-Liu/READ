<template>
  <div>
    <van-nav-bar class="top" fixed title="排行" />
    <div class="margin-top"></div>
    <div class="ranking">
      <van-collapse v-model="activeNames">
        <!-- <div class="male"> -->
        <van-collapse-item title="男生排行榜" class="rank" name="1" size="large">
          <van-cell
            @click="selectType(item)"
            :class="{padding:index==0}"
            :icon="iconUrl.male[index]"
            :title="item.title"
            v-for="(item,index) in rankingGender.male"
            :key="index"
          />
        </van-collapse-item>
        <!-- </div> -->
        <!-- <div class="female"> -->
        <van-collapse-item title="女生排行榜" class="rank" name="2" size="large">
          <!-- <van-cell title="女生排行榜" class="rank" /> -->
          <van-cell
            @click="selectType(item)"
            :class="{padding:index==0}"
            :icon="iconUrl.female[index]"
            :title="item.title"
            v-for="(item,index) in rankingGender.female"
            :key="index"
          />
        </van-collapse-item>
        <!-- </div> -->
        <!-- <div class="total"> -->
        <van-collapse-item title="话本小说" class="rank" name="3" size="large">
          <!-- <van-cell title="排行总榜" class="rank" /> -->
          <van-cell
            @click="selectType(item)"
            :class="{padding:index==0}"
            :icon="iconUrl.total[index]"
            :title="item.title"
            v-for="(item,index) in rankingGender.picture"
            :key="index"
          />
        </van-collapse-item>
        <van-collapse-item title="电子出版" class="rank" name="4" size="large">
          <!-- <van-cell title="排行总榜" class="rank" /> -->
          <van-cell
            @click="selectType(item)"
            :class="{padding:index==0}"
            :icon="iconUrl.total[index]"
            :title="item.title"
            v-for="(item,index) in rankingGender.epub"
            :key="index"
          />
        </van-collapse-item>
        <!-- </div> -->
      </van-collapse>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rankingGender: {},
      activeNames: ["1"],
      iconUrl: {
        male: [
          require("../assets/images/ranking/1.png"),
          require("../assets/images/ranking/2.png"),
          require("../assets/images/ranking/3.png"),
          require("../assets/images/ranking/4.png"),
          require("../assets/images/ranking/5.png"),
          require("../assets/images/ranking/6.png"),
          require("../assets/images/ranking/7.png"),
          require("../assets/images/ranking/8.png"),
          require("../assets/images/ranking/9.png"),
          require("../assets/images/ranking/10.png"),
          require("../assets/images/ranking/11.png"),
          require("../assets/images/ranking/12.png"),
          require("../assets/images/ranking/13.png"),
          require("../assets/images/ranking/14.png"),
          require("../assets/images/ranking/15.png"),
          require("../assets/images/ranking/16.png")
        ],
        female: [
          require("../assets/images/ranking/1.png"),
          require("../assets/images/ranking/2.png"),
          require("../assets/images/ranking/3.png"),
          require("../assets/images/ranking/7.png"),
          require("../assets/images/ranking/4.png"),
          require("../assets/images/ranking/5.png"),
          require("../assets/images/ranking/6.png"),
          require("../assets/images/ranking/8.png"),
          require("../assets/images/ranking/10.png"),
          require("../assets/images/ranking/11.png"),
          require("../assets/images/ranking/12.png"),
          require("../assets/images/ranking/14.png"),
          require("../assets/images/ranking/13.png")
          // require("../assets/images/ranking/14.png"),
          // require("../assets/images/ranking/15.png"),
          // require("../assets/images/ranking/16.png")
        ],
        total: [
          require("../assets/images/ranking/17.png"),
          require("../assets/images/ranking/2.png"),
          require("../assets/images/ranking/3.png"),
          require("../assets/images/ranking/18.png"),
          require("../assets/images/ranking/6.png"),
          require("../assets/images/ranking/5.png")
          // require("../assets/images/ranking/7.png"),
          // require("../assets/images/ranking/8.png"),
          // require("../assets/images/ranking/9.png"),
          // require("../assets/images/ranking/10.png"),
          // require("../assets/images/ranking/11.png"),
          // require("../assets/images/ranking/12.png"),
          // require("../assets/images/ranking/13.png"),
          // require("../assets/images/ranking/14.png"),
          // require("../assets/images/ranking/15.png"),
          // require("../assets/images/ranking/16.png")
        ]
      }
    };
  },
  methods: {
    selectType(item) {
      // console.log(item._id);
      this.axios("/read/ranking/" + item._id).then(res => {
        this.$router.push({ name: "RankingList", params: res });
      });
    }
  },
  mounted() {
    this.axios("/read/ranking/gender").then(res => {
      // console.log(res);
      this.rankingGender = res.data;
    });
  }
};
</script>

<style lang="scss" scoped>
.margin-top {
  margin-top: 46px;
}
.ranking {
  font-weight: bold;
  .van-cell__left-icon {
    font-size: 26px;
    margin-right: 10px;
  }
  .padding {
    padding-top: 0;
    // padding-left: 0;
  }
  .rank {
    background-color: #f0f0f0;
    font-size: 20px;
    // font-weight: bold;
  }
}
</style>