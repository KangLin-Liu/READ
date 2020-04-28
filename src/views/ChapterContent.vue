<template>
  <div class="chapter-content" ref="allContent">
    <van-nav-bar class="top" fixed title="章节内容" left-arrow @click-left="$router.go(-1)" />
    <div class="margin-top"></div>
    <div v-if="flag">
      <div class="title">{{chapterContent.chapter.title}}</div>
      <!-- <div class="content" ref="adjustContent">{{adjustContent}}</div> -->
      <div class="content" ref="adjustContent"></div>
    </div>
    <div v-else>
      <div>{{chapterContent}}</div>
    </div>
    <!-- <div class="chapter"><span v-if="chapterContent.chapter.order != '1'">上一章</span><span>下一章</span></div> -->
    <div class="chapter">
      <span @click="prevChapter(chapterOrder)">上一章</span>
      <span @click="nextChapter(chapterOrder)">下一章</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chapterContent: "", //接收到返回的data
      adjustContent: "", //分段后的content
      chapterOrder: "", //章节数
      flag: true,
      allSource: [] //所有章节内容
    };
  },
  methods: {
    prevChapter(num) {
      if (num >= 1) {
        // console.log(num);
        this.axios("/chapter/" + this.allSource[num - 1].link)
          .then(res => {
            this.flag = true;
            this.chapterContent = res.data;
            this.chapterOrder--;
            this.adjustContent = this.chapterContent.chapter.cpContent.replace(
              /\n/g,
              "<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
            );
            this.$nextTick(() => {
              this.$refs.adjustContent.innerHTML = this.adjustContent;
              this.$refs.allContent.scrollTop = 0;
            });
            // console.log(res, "这里这里这里", this.chapterOrder);
          })
          .catch(err => {
            this.flag = false;
            this.chapterOrder--;
            // console.log(err, this.chapterOrder);
            this.chapterContent = "本章为付费章节，请至正版阅读平台订阅";
          });
      } else {
        this.$toast("当前已经是第一章了");
      }
    },
    nextChapter(num) {
      // console.log(this.allSource.length, num);
      if (num < this.allSource.length - 1) {
        this.axios("/chapter/" + this.allSource[num + 1].link)
          .then(res => {
            this.flag = true;
            this.chapterContent = res.data;
            this.chapterOrder++;
            this.adjustContent = this.chapterContent.chapter.cpContent.replace(
              /\n/g,
              "<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
            );
            // console.log(this.chapterContent, this.adjustContent);
            this.$nextTick(() => {
              this.$refs.adjustContent.innerHTML = this.adjustContent;
              this.$refs.allContent.scrollTop = 0;
            });
            // console.log(res, "这里这里这里", this.chapterOrder);
          })
          .catch(err => {
            this.flag = false;
            this.chapterOrder++;
            // console.log(err, this.chapterOrder);
            this.chapterContent = "本章为付费章节，请至正版阅读平台订阅";
          });
      } else {
        this.$toast("当前已经是最新章节了");
      }
    }
  },
  watch: {
    // chapterOrder(newNum, oldNum) {
    //   console.log(newNum, oldNum);
    //   if(newNum>1){
    //     this.axios("/chapter/" + this.allSource[newNum-1].link).then(res => {
    //       console.log(res, "这里这里这里");
    //       this.chapterContent = res.data;
    //       // this.chapterOrder++;
    //     });
    //   }
    // },
    $route(to, from) {
      if (
        (to.name == "ChapterContent" && from.name == "Chapters") ||
        (to.name == "ChapterContent" && from.name == "Detail")
      ) {
        if (this.$route.params.res) {
          this.allSource = this.$route.params.allSource;
          // this.chapterOrder = this.$route.params.res.data.chapter.order;
          this.chapterOrder = this.$route.params.index;
          this.flag = true;
          this.chapterContent = this.$route.params.res.data;
          this.adjustContent = this.chapterContent.chapter.cpContent.replace(
            /\n/g,
            "<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
          );
          this.$nextTick(() => {
            this.$refs.adjustContent.innerHTML = this.adjustContent;
          });
        } else {
          this.flag = false;
          this.chapterOrder = this.$route.params.index;
          this.chapterContent = "本章为付费章节，请至正版阅读平台订阅";
        }
      }
    }
  },
  created() {
    // console.log(this.$route.params, "111111");
    if (this.$route.params.res) {
      // console.log("shang", this.$route.params.res);
      this.allSource = this.$route.params.allSource;
      // this.chapterOrder = this.$route.params.res.data.chapter.order;
      // this.chapterOrder = this.$route.params.res.index;
      this.chapterOrder = this.$route.params.index;
      this.flag = true;
      this.chapterContent = this.$route.params.res.data;
      // let adjust = this.chapterContent.chapter.cpContent.replace(/。/g,"。<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
      // this.adjustContent = adjust.replace(/^。”$/g,"。”<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
      // this.adjustContent = this.chapterContent.chapter.cpContent.replace(/。(”)?/g,"。<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
      // this.adjustContent = this.chapterContent.chapter.cpContent.replace(/。/g,"。<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
      // console.log(this.chapterContent);
      this.adjustContent = this.chapterContent.chapter.cpContent.replace(
        /\n/g,
        "<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
      );
      this.$nextTick(() => {
        this.$refs.adjustContent.innerHTML = this.adjustContent;
      });
    } else {
      this.flag = false;
      this.allSource = this.$route.params.allSource;
      this.chapterOrder = this.$route.params.index;
      this.chapterContent = "本章为付费章节，请至正版阅读平台订阅";
    }
  }
};
</script>

<style lang="scss" scoped>
.chapter-content {
  background-color: #dad9d4;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  padding: 0 10px;
  box-sizing: border-box;
  .top {
    background-color: #dad9d4;
  }
  .margin-top {
    margin-top: 56px;
  }
  .title {
    // text-indent: 2em;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
  }
  .content {
    text-indent: 2em;
    line-height: 2;
    // background-color: #ffeecc;
  }
  .chapter {
    text-align: center;
    margin: 30px;
    span {
      background-color: #ccc;
      font-size: 20px;
      margin-right: 20px;
      // color: white;
    }
  }
}
</style>