<template>
  <div>
    <van-nav-bar
      class="top"
      fixed
      :title="bookDetail.title"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <div class="margin-top"></div>
    <div class="detail-top">
      <div>
        <img :src="decode(bookDetail.cover)" alt />
      </div>
      <div class="content">
        <h3 class="name">{{bookDetail.title}}</h3>
        <p class="author">作者：{{bookDetail.author}}</p>
        <p class="origin">来源：{{bookDetail.copyright}}</p>
        <p>类型：{{bookDetail.minorCate}}</p>
      </div>
    </div>
    <!-- <van-divider /> -->
    <div class="btn">
      <van-button @click="read(0)" color="linear-gradient(to right, #4bb0ff, #6149f6)">开始阅读</van-button>
      <van-button color="linear-gradient(to right, #4bb0ff, #6149f6)" @click="collect">加入书架</van-button>
    </div>
    <div class="tag">
      <van-tag
        mark
        :color="tagColor[index]"
        v-for="(item, index) in bookDetail.tags"
        :key="index"
      >{{item}}</van-tag>
    </div>
    <div class="introduce">{{bookDetail.longIntro}}</div>
    <div class="bottom">
      <div class="new" @click="read(allSource.length-1)">
        <van-icon class="icon" name="clock-o" />
        最新 {{bookDetail.lastChapter}}
        <span>﹥</span>
      </div>
      <div class="menu" @click="allChapters">
        <van-icon class="icon" name="bars" />目录
        <span>﹥</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tagColor: [
        "#1989fa",
        "#07c160",
        "#ee0a24",
        "#7232dd",
        "#ff976a",
        "#1989fa",
        "#07c160",
        "#ee0a24",
        "#7232dd",
        "#ff976a",
        "#1989fa",
        "#07c160",
        "#ee0a24",
        "#7232dd",
        "#ff976a",
        "#1989fa",
        "#07c160",
        "#ee0a24",
        "#7232dd",
        "#ff976a"
      ],
      bookDetail: {},
      id: "",
      sourceId: "",
      sourceDetail: {},
      allSource: [],
      collectData: []
    };
  },
  methods: {
    decode(str) {
      if (str) {
        return decodeURIComponent(str.slice(7));
      }
    },
    //点击开始阅读
    read(index) {
      setTimeout(() => {
        // console.log(index);
        this.axios("/chapter/" + this.allSource[index].link)
          .then(res => {
            // console.log(res, "这里这里这里");
            this.$router.push({ name: "ChapterContent", params: {res:res,allSource:this.allSource,index:index} });
          })
          .catch(err => {
            // console.log(err);
            this.$router.push({ name: "ChapterContent" ,params:{allSource:this.allSource,index:index}});
          });
      }, 500);
    },
    //点击收藏
    collect() {
      this.$toast.success('收藏成功');
      // console.log(this.id);
      let storage = window.localStorage;
      // if (storage.favoriteBook) {
      let arr = JSON.parse(storage.getItem("favoriteBook"));
      // console.log(arr, "1111");
      if (arr) {
        if (arr.find(v => v == this.id)) {
          return;
        }
        arr.push(this.id);
        storage.setItem("favoriteBook", JSON.stringify(arr));
      }else{
        arr = [];
        arr.push(this.id);
        storage.setItem("favoriteBook", JSON.stringify(arr));
      }
      // if (arr.find(v => v == this.id)) {
      //   return;
      // }
      // }
    },

    allChapters() {
      this.axios("/read/atoc/" + this.sourceId + "?view=chapters").then(res => {
        this.$router.push({ name: "Chapters", params: res.data });
      });
    }
  },
  watch: {
    $route(to, from) {
      if ((from.name == "List" && to.name == "Detail") || (from.name == "RankingList" && to.name=="Detail") || (from.name == "Home" && to.name=="Detail") || (from.name == "BookShelf" && to.name=="Detail") || (from.name == "Search" && to.name=="Detail")) {
        this.bookDetail = this.$route.params.data.data;
        this.id = this.$route.params.data.data._id;
        this.axios("/read/btoc?view=summary&book=" + this.id).then(res => {
          this.sourceId = res.data[0]._id;
          this.axios("/read/atoc/" + this.sourceId + "?view=chapters").then(
            res => {
              this.allSource = res.data.chapters;
              // console.log(this.allSource);
            }
          );
        });
      }
      if (from.name == "ChapterContent" && to.name == "Detail") {
        // console.log(to, from);
        this.axios("/read/atoc/" + this.sourceId + "?view=chapters").then(
          res => {
            this.allSource = res.data.chapters;
            // console.log(this.allSource);
          }
        );
      }
    }
  },
  created() {
    this.bookDetail = this.$route.params.data.data;
    // console.log(this.bookDetail.title);
    this.id = this.$route.params.data.data._id;
    this.axios("/read/btoc?view=summary&book=" + this.id).then(res => {
      this.sourceId = res.data[0]._id;
      this.axios("/read/atoc/" + this.sourceId + "?view=chapters").then(res => {
        this.allSource = res.data.chapters;
        // console.log(this.allSource);
      });
    });
  }
};
</script>

<style lang="scss" scoped>
.van-card__title {
  margin-top: 20px;
}
.margin-top {
  margin-top: 56px;
}
.van-card__thumb {
  width: 66px;
  height: 88px;
}
.detail-top {
  display: flex;
  margin-left: 10px;
  img {
    width: 132px;
    height: 176px;
  }
  .content {
    font-size: 18px;
    margin: auto 20px;
    .name {
      font-weight: bold;
      font-size: 24px;
      // color: #4ca9fe;
    }
    > p {
      margin-top: 10px;
    }
  }
}
.btn {
  text-align: center;
  .van-button {
    margin: 10px;
    width: 140px;
    border-radius: 10px;
  }
}
.tag {
  margin-left: 10px;
  .van-tag {
    font-size: 14px;
    margin: 6px;
  }
}
.van-divider {
  background-color: #f0f0f0;
}
.introduce {
  // font-weight: bold;
  color: #6d6b76;
  margin: 10px;
  line-height: 22px;
}
.bottom {
  margin-top: 20px;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  position: relative;
  .menu {
    height: 50px;
    line-height: 50px;
    position: relative;
    border-top: 1px solid #ccc;
  }
  .new {
    line-height: 50px;
    width: 80%;
    height: 50px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .icon {
    margin: 0 10px;
  }
  span {
    position: absolute;
    right: 20px;
    color: #1296db;
    font-size: 40px;
  }
}
</style>