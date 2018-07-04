<template>
  <div class="layout">
    <header>
      <span class="scort">总分：{{scort}}</span>
      <button class="star" >New Game</button>
      <span class="sd"></span>
    </header>
    <div class="all-container">
      <div class="background">
        <span class="list-0-0"></span>
        <span class="list-0-1"></span>
        <span class="list-0-2"></span>
        <span class="list-0-3"></span>
        <span class="list-1-0"></span>
        <span class="list-1-1"></span>
        <span class="list-1-2"></span>
        <span class="list-1-3"></span>
        <span class="list-2-0"></span>
        <span class="list-2-1"></span>
        <span class="list-2-2"></span>
        <span class="list-2-3"></span>
        <span class="list-3-0"></span>
        <span class="list-3-1"></span>
        <span class="list-3-2"></span>
        <span class="list-3-3"></span>
      </div>
      <div class="container">
        <span 
          class="list"
          v-for="(e,i) in rocks" 
          :key="i"
        >
        <span style="display: inline-block;width: 50px;" v-for="list in e">
        	{{list}}
        </span>
          </span>
      </div>
    </div>
  </div>
</template>

<script>
const by = name => (o, p) => {
  const a = o[name];
  const b = p[name];
  return a < b ? -1 : 1;
};
const dely = ms => new Promise(res => setTimeout(res, ms));

export default {
  data() {
    return {
      scort:0,
      rocks: [
      	[0,0,2,4],
      	[4,0,2,2],
      	[2,0,0,4],
      	[2,0,2,4],
      ],
      color: {
        2: "#eee4da",
        4: "#ede0c8",
        8: "#f2b179",
        16: "#f59563",
        32: "#f67c5f",
        64: "#f65e3b",
        128: "#edcf72",
        256: "#edcc61",
        512: "#0444BF",
        1024: "#A79674",
        2048: "#282726"
      },
      directX: 30,
    };
  },
  mounted() {
    document.addEventListener("keydown", e => {
      if (e.key === "ArrowRight") {
      }else if(e.key === "ArrowLeft"){
      	console.log(left)
      }else if(e.key === "ArrowDown"){
      }else if(e.key === "ArrowUp"){
      }
    });
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
.show {
  position: fixed;
  bottom: 50vh;
  left: 20px;
  display: flex;
  flex-direction: column;
  margin-bottom: -27%;
}

body {
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.layout {
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100%;
  overflow: auto;


  header {
    display: flex;
    max-width: 600px;
    width: 100%;
    padding: 20px;
    flex-direction: row;
    justify-content: space-around;
    
    button {
      border: none;
      background: #8f7a66;
      color: #fff;
      font-size: 20px;
      padding: 10px 30px;
      cursor: pointer;
      border-radius: 10px;
    }
    span {
      width: 100px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
  }

  .all-container {
    height: 620px;
    width: 620px;

    .background {
      box-sizing: content-box;
      flex: 0 0 600px;
      background-color: #bbada0;
      display: inline-flex;
      flex-wrap: wrap;
      padding: 10px;
      justify-content: space-between;
      border-radius: 10px;
      width: 600px;
      position: absolute;
      z-index: -1;

      & > span {
        background-color: #eee4da59;
        margin: 10px;
        width: 130px;
        height: 130px;
        border-radius: 10px;
      }
    }

  }
}

@media screen and (max-width: 900px) {
  html,body{
    overflow: hidden;
  }
  .layout{
    overflow: hidden;
    header {
      span{
        width: 70px;
      }
      button {
        padding: 10px 15px;
      }
    }
    .all-container {
      margin: 2vw;
      width: 96vw;
      height: 96vw;

      .background,.container {
        width: 96vw;
        height: 96vw;
        box-sizing: border-box;
        padding: 1vw;
        & > span,.list {
          width: 21vw;
          height: 21vw;
          margin: 1vw;
          font-size: 8vw;
        }
      }
    }
  }
}

@keyframes appear {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  80% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
