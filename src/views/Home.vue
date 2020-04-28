<template>
  <div class="BookMain">
    <div class="top">
      <van-row>
        <van-col span="3">
          <van-image :src="logoSrc" />
        </van-col>
        <van-col class="top-text" span="3">书虫</van-col>
        <van-col span="18">
          <van-search @click="search" placeholder="大家都在搜" />
        </van-col>
      </van-row>
    </div>
    <div class="loop">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(image, index) in loopSrc" :key="index">
          <img class="auto-img img" :src="image.url" alt />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- <div class="sort">
      <van-grid :border="false">
        <van-grid-item>
          <van-image src="https://img.yzcdn.cn/vant/apple-1.jpg" />
          <span>好评榜</span>
        </van-grid-item>
        <van-grid-item>
          <van-image src="https://img.yzcdn.cn/vant/apple-1.jpg" />
          <span>热搜榜</span>
        </van-grid-item>
        <van-grid-item>
          <van-image src="https://img.yzcdn.cn/vant/apple-2.jpg" />
          <span>潜力榜</span>
        </van-grid-item>
        <van-grid-item>
          <van-image src="https://img.yzcdn.cn/vant/apple-3.jpg" />
          <span>新书榜</span>
        </van-grid-item>
      </van-grid>
    </div>-->
    <div class="like">
      <van-cell class="like-title" title="猜你喜欢" size="large" />
      <van-card
        class="like-size"
        @click="selectBook(item)"
        v-for="(item,index) in likeData"
        :key="index"
        :desc="item.author"
        :title="item.title"
        :thumb="decode(item.cover)"
      />
    </div>
    <van-cell class="change">
      <span @click="change">换一换</span>
      <van-image @click="change" class="change-img" :src="changeSrc" />
    </van-cell>
  </div>
</template>

<script>
export default {
  data() {
    return {
      logoSrc: require("../assets/images/home/logo.png"),
      changeSrc: require("../assets/images/home/change.png"),
      loopSrc: [
        { url: require("../assets/images/loop/loop1.jpg") },
        { url: require("../assets/images/loop/loop2.jpg") },
        { url: require("../assets/images/loop/loop3.jpg") },
        { url: require("../assets/images/loop/loop4.jpg") }
      ],
      guestLikeData: {},
      randomNum: [], //储存产生的随机数
      likeData: []
    };
  },
  methods: {
    selectBook(item) {
      // console.log(item._id);
      this.axios("/read/book/" + item._id + "").then(res => {
        this.$router.push({ name: "Detail", params: { data: res } });
      });
    },
    //点击搜索
    search(){
      this.$router.push({name:'Search'});
    },
    //产生一个长度的随机数
    random() {
      let num = Math.floor(this.guestLikeData.books.length * Math.random());
      return num;
    },
    //图片解码
    decode(str) {
      if (str) {
        return decodeURIComponent(str.slice(7));
      }
    },
    //换一换
    change() {
      this.likeData = [];
      this.randomNum = [];
      for (let i = 0; i < 4; i++) {
        let num = this.random();
        if (this.randomNum.find(v => v == num)) {
          i--;
        } else {
          this.likeData.push(this.guestLikeData.books[num]);
          this.randomNum.push(num);
        }
      }
    }
  },
  mounted() {
    this.axios({
      method: "GET",
      url: "/read/book/by-categories",
      params: {
        gender: "male",
        type: "hot",
        major: "玄幻"
      }
    }).then(res => {
      // console.log(res);
      this.guestLikeData = res.data;
      for (let i = 0; i < 4; i++) {
        let num = this.random();
        if (this.randomNum.find(v => v == num)) {
          i--;
        } else {
          this.likeData.push(this.guestLikeData.books[num]);
          this.randomNum.push(num);
        }
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.top {
  text-align: center;
  .top-text {
    line-height: 54px;
    color: cadetblue;
  }
}
.van-card__thumb {
  width: 66px;
  height: 88px;
}
.like {
  .like-title {
    font-size: 20px;
    font-weight: bold;
  }
  .van-card__title {
    max-height: 40px;
    line-height: 30px;
    font-size: 18px;
    font-weight: bold;
  }
  .van-card__desc {
    max-height: 40px;
    line-height: 40px;
  }
  .like-size {
    font-size: 12px;
  }
}
.img {
  height: 200px;
}
.change {
  text-align: center;
  background-color: #fafafa;
  // line-height: 31px;
  span {
    font-size: 18px;
    margin-right: 8px;
    // color: #000;
    font-weight: bold;
  }
  .change-img {
    width: 24px;
    margin-top: -2px;
    vertical-align: middle;
  }
}
.van-cell__value--alone {
  text-align: center;
}
</style>