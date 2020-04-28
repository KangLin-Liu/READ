<template>
  <div class="book-shelf">
    <van-nav-bar class="top" fixed title="书架" />
    <div class="margin-top"></div>

    <div v-if="empty" class="empty-book">
      <van-empty
        class="custom-image"
        image="https://img.yzcdn.cn/vant/custom-empty-image.png"
        description="书架空了"
      >
        <van-button round type="primary" class="bottom-button" @click="addBook">前往添加书籍</van-button>
      </van-empty>
    </div>
    <div v-else class="book-list">
      <van-swipe-cell class="swipe-cell" v-for="(item,index) in bookData" :key="index">
        <van-card
          @click="select(item)"
          :desc="item.author"
          :title="item.title"
          :thumb="decode(item.cover)"
        />
        <template #right>
          <van-button
            @click="removeBook(item)"
            square
            text="删除"
            type="info"
            class="delete-button delect"
          />
        </template>
      </van-swipe-cell>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      empty: false,
      bookData: [],
      bookArr: [],
      arr: []
    };
  },
  methods: {
    decode(str) {
      if (str) {
        return decodeURIComponent(str.slice(7));
      }
    },
    select(item) {
      this.axios("/read/book/" + item._id + "").then(res => {
        this.$router.push({ name: "Detail", params: { data: res } });
      });
    },
    removeBook(item) {
      this.$dialog
        .confirm({
          message: "确定删除该小说吗？"
        })
        .then(() => {
          let storage = JSON.parse(window.localStorage.favoriteBook);
          // console.log(storage, item._id);
          let newArr = storage.filter(v => v != item._id);
          this.arr = [];
          let local = window.localStorage;
          local.setItem("favoriteBook", JSON.stringify(newArr));
          this.bookArr = newArr;
          for (let i = 0; i < this.bookArr.length; i++) {
            this.axios("/read/book/" + this.bookArr[i]).then(res => {
              this.arr.push(res.data);
            });
          }
          this.bookData = this.arr;
          if (local.favoriteBook == "[]") {
            this.empty = true;
          }
        })
        .catch(() => {});
    },
    addBook() {
      this.$router.push({ name: "Ranking" });
    }
  },
  created() {
    let storage = window.localStorage;
    let favorite = storage.getItem("favoriteBook");
    if (favorite && favorite != "[]") {
      this.empty = false;
      this.bookArr = JSON.parse(favorite);
    } else {
      this.empty = true;
    }
  },
  watch: {
    $route(to, from) {
      // console.log(this.bookData);
      if (to.name == "BookShelf") {
        this.arr = [];
        // console.log(this.arr);
        let storage = window.localStorage;
        let favorite = storage.getItem("favoriteBook");
        if (favorite && favorite != "[]") {
          this.empty = false;
          this.bookArr = JSON.parse(favorite);
          for (let i = 0; i < this.bookArr.length; i++) {
            this.axios("/read/book/" + this.bookArr[i]).then(res => {
              this.arr.push(res.data);
              // this.bookData.push(res.data);
            });
          }
          this.bookData = this.arr;
        } else {
          this.empty = true;
        }
      }
    }
    // bookData(n,o){
    //   // console.log(n,o);
    //   this.bookData = n;
    //   console.log(n,o);
    // }
  },
  // beforeRouteUpdate(to, from, next) {
  //   // console.log(to,from);
  //   if (to.name == "BookShelf") {
  //     let storage = window.localStorage;
  //     let favorite = storage.getItem("favoriteBook");
  //     if (favorite) {
  //       this.bookArr = JSON.parse(favorite);
  //     }
  //     console.log(storage, favorite);
  //   }
  //   next();
  // },
  // watch: {
  //   localStorage(newValue, oldValue) {
  //     console.log(newValue, oldValue);
  //     for (let i = 0; i < this.bookArr.length; i++) {
  //       console.log("3333");
  //       this.axios("/read/book/" + this.bookArr[i]).then(res => {
  //         this.bookData.push(res.data);
  //         console.log("22222");
  //       });
  //     }
  //   }
  // },
  mounted() {
    for (let i = 0; i < this.bookArr.length; i++) {
      this.axios("/read/book/" + this.bookArr[i]).then(res => {
        this.bookData.push(res.data);
      });
    }
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
.van-card__thumb {
  width: 66px;
  height: 88px;
}
.custom-image .van-empty__image {
  width: 90px;
  height: 90px;
}
.book-list {
  .swipe-cell {
    margin-top: 10px;
    .delect {
      height: 100%;
    }
  }
}
</style>