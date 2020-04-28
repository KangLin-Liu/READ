<template>
  <div>
    <van-nav-bar class="top" fixed title="目录" left-arrow @click-left="$router.go(-1)" />
    <div class="margin-top"></div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell
        v-for="(item,index) in list"
        :key="index"
        :title="item.title"
        @click="selectChapter(index)"
      />
    </van-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sourceDetail: {},
      allSource: [],
      list: [],
      loading: false,
      finished: false,
      time: 0,
      currentIndex: 0
    };
  },
  watch: {
    $route(to, from) {
      if (to.name == "Chapters" && from.name == "Detail") {
        // console.log("监听");
        this.sourceDetail = this.$route.params;
        this.allSource = this.$route.params.chapters;
        this.list = [];
        this.loading = this.finished = false;
        this.time = this.currentIndex = 0;
        // console.log(this.sourceDetail);
        this.onLoad();
      }
    }
  },
  methods: {
    onLoad() {
      // 异步更新数据
      //  ajax 请求
      this.axios("/read/atoc/" + this.sourceDetail._id + "?view=chapters").then(
        res => {
          // console.log(res, this.sourceDetail._id);
          for (let i = this.currentIndex; i < 50 * (this.time + 1); i++) {
            if (res.data.chapters[i]) {
              this.list.push(res.data.chapters[i]);
            }
          }
          //   console.log(this.list);

          this.currentIndex += 50;
          this.time += 1;
          // 加载状态结束
          this.loading = false;

          // 数据全部加载完成
          if (this.list.length >= this.allSource.length) {
            this.finished = true;
          }
        }
      );
    },
    selectChapter(index) {
      this.axios("/chapter/" + this.allSource[index].link)
        .then(res => {
          // console.log(res, "这里这里这里");
          this.$router.push({ name: "ChapterContent", params: {res:res,allSource:this.allSource,index:index} });
        })
        .catch(err => {
          // console.log(err);
          this.$router.push({ name: "ChapterContent"});
        });
      // console.log(index,"http://chapterup.zhuishushenqi.com/chapter/"+this.allSource[index].link);
      // this.axios("/chapter/"+this.allSource[index].link).then(res=>{
      //     console.log(res);
      // })
      // this.$router.push({name:'ChapterContent'})
    }
  },
  created() {
    // console.log(this.$route.params);
    this.sourceDetail = this.$route.params;
    this.allSource = this.$route.params.chapters;
  }
};
</script>

<style lang="scss" scoped>
.margin-top {
  margin-top: 46px;
}
</style>