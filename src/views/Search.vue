<template>
  <div>
    <van-nav-bar class="top" fixed title="搜索中心" left-arrow @click-left="$router.go(-1)" />
    <div class="margin-top"></div>
    <van-search v-model="search" @focus="focus" @input="keyWord" placeholder="请输入搜索关键词/小说名/作者" />
    <div class="searh-list" v-if="isSearch">
      <van-cell
        @click="selectBook(item)"
        :title="item.title"
        v-for="(item,index) in searchResult.data.books"
        :key="index"
      />
    </div>
    <van-cell title="热门搜索">
      <span @click="toggle" ref="hidden">隐藏</span>
    </van-cell>
    <div v-if="isShow">
      <van-tag
        plain
        size="large"
        v-for="(item,index) in hotData"
        :key="index"
        class="tag"
        @click="select(index)"
        :color="tagColor[index]"
      >{{item.word}}</van-tag>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: true,
      isSearch: false,
      show: [],
      search: "",
      searchResult: {},
      hotData: [], //存放被显示的热门搜索词
      resHotData: {}, //所有热门搜索词
      randomNum: [], //储存产生的随机数
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
      ]
    };
  },
  methods: {
    //将点击的tag显示到搜索框中
    select(index) {
      // console.log(index, this.hotData[index]);
      this.search = this.hotData[index].word;
    },
    //用于点击tag后在搜索框获取焦点，以便显示搜索列表
    focus() {
      // this.$options.methods.keyWord();
      // console.log("?????")
      if (this.search) {
        this.axios({
          method: "GET",
          url: "/read/book/fuzzy-search",
          params: {
            query: this.search
          }
        }).then(res => {
          // console.log(this.search, res);
          this.searchResult = res;
          this.isSearch = true;
        });
      } else {
        this.isSearch = false;
      }
    },
    //点击切换
    toggle() {
      this.isShow = !this.isShow;
      // console.log(this.$refs.hidden.innerText, this.isShow);
      if (this.isShow) {
        this.$refs.hidden.innerText = "隐藏";
      } else {
        this.$refs.hidden.innerText = "显示";
      }
      // console.log(this.$refs.hidden.innerText);
    },
    //产生一个长度的随机数
    random() {
      let num = Math.floor(
        this.resHotData.searchHotWords.length * Math.random()
      );
      return num;
    },
    //显示tag数量
    change() {
      for (let i = 0; i < 12; i++) {
        let num = this.random();
        if (this.randomNum.find(v => v == num)) {
          i--;
        } else {
          this.hotData.push(this.resHotData.searchHotWords[num]);
          this.randomNum.push(num);
        }
      }
    },
    //选择搜索结果下的书籍
    selectBook(item) {
      this.axios("/read/book/" + item._id + "").then(res => {
        this.$router.push({ name: "Detail", params: { data: res } });
      });
    },
    keyWord() {
      if (this.search) {
        this.axios({
          method: "GET",
          url: "/read/book/fuzzy-search",
          params: {
            query: this.search
          }
        }).then(res => {
          // console.log(this.search, res);
          this.searchResult = res;
          this.isSearch = true;
        });
      } else {
        this.isSearch = false;
      }
    }
  },
  watch: {
    $route(to, from) {
      if (to.name == "Search") {
        // 重置数据
        this.hotData = [];
        this.randomNum = [];
        this.isShow = true;
        this.isSearch = false;
        (this.search = ""), (this.$refs.hidden.innerText = "隐藏");
        // 重置数据
        this.axios({
          method: "GET",
          url: "/read/book/search-hotwords"
        }).then(res => {
          this.resHotData = res.data;
          this.change();
          // console.log(res);
        });
      }
    }
  },
  created() {
    this.axios({
      method: "GET",
      url: "/read/book/search-hotwords"
    }).then(res => {
      this.resHotData = res.data;
      this.change();
      // console.log(res);
    });
  }
};
</script>

<style lang="scss" scoped>
.searh-list {
  max-height: 220px;
  overflow-y: auto;
  margin-bottom: 20px;
}
.margin-top {
  margin-top: 46px;
}
.tag {
  margin: 10px 0 0 10px;
}
</style>