<template>
	<div class="weather">
    <div class="svg" v-if="arr.weat === '多云'">
      <svg id="cloudy" class="osc"  width="100%" height="100%" viewBox="-120 -150 320 320"><defs><line id="ray" x1="-2" x2="20"></line></defs><path id="cloud" d="M-28 113 a52 52 0 1 1 12-103 a70 70 0 0 1 120-8 a58 58 0 1 1 23 111z"></path><mask id="m"><circle r="500"></circle><use xlink:href="#cloud"></use></mask><g id="sun"><g class="osc"><circle r="65"></circle><g id="rays1"><g transform="rotate(330)"><use xlink:href="#ray" x="85"></use></g><g transform="rotate(300)"><use xlink:href="#ray" x="85"></use></g><g transform="rotate(270)"><use xlink:href="#ray" x="85"></use></g><g transform="rotate(240)"><use xlink:href="#ray" x="85"></use></g><g transform="rotate(210)"><use xlink:href="#ray" x="85"></use></g><g transform="rotate(180)"><use xlink:href="#ray" x="85"></use></g><g transform="rotate(150)"><use xlink:href="#ray" x="85"></use></g><g transform="rotate(120)"><use xlink:href="#ray" x="85"></use></g><g transform="rotate(90)"><use xlink:href="#ray" x="85"></use></g><g transform="rotate(60)"><use xlink:href="#ray" x="85"></use></g><g transform="rotate(30)"><use xlink:href="#ray" x="85"></use></g><g transform="rotate(0)"><use xlink:href="#ray" x="85"></use></g></g></g></g><g x="10"><use xlink:href="#cloud"></use></g></svg>
    </div>
    <div v-else-if="arr.weat === '雨'">
      <svg id="rainy" class="osc"  width="100%" height="100%" viewBox="-100 -80 300 300"><defs><line id="raindrop" y1="-2" y2="20"></line></defs><g id="rain"><path class="osc" id="cloud" d="M-28 113 a52 52 0 1 1 12-103 a70 70 0 0 1 120-8 a58 58 0 1 1 23 111z"></path><g><use xlink:href="#raindrop" x="-10" y="140"></use><use xlink:href="#raindrop" x="20" y="140"></use><use xlink:href="#raindrop" x="50" y="140"></use><use xlink:href="#raindrop" x="80" y="140"></use><use xlink:href="#raindrop" x="110" y="140"></use><use xlink:href="#raindrop" x="0" y="170"></use><use xlink:href="#raindrop" x="30" y="170"></use><use xlink:href="#raindrop" x="60" y="170"></use><use xlink:href="#raindrop" x="90" y="170"></use><use xlink:href="#raindrop" x="120" y="170"></use></g></g></svg>
    </div>
    <div v-else>
      <svg id="sunday" class="osc"  width="100%" height="100%" viewBox="-120 -140 260 260"><defs><line id="ray" x1="-2" x2="20"></line></defs><g id="sun"><g class="osc"><circle r="65"></circle><g id="rays1"><g transform="rotate(330)"><use xlink:href="#ray" x="85"></use></g><g transform="rotate(300)"><use xlink:href="#ray" x="85"></use></g><g transform="rotate(270)"><use xlink:href="#ray" x="85"></use></g><g transform="rotate(240)"><use xlink:href="#ray" x="85"></use></g><g transform="rotate(210)"><use xlink:href="#ray" x="85"></use></g><g transform="rotate(180)"><use xlink:href="#ray" x="85"></use></g><g transform="rotate(150)"><use xlink:href="#ray" x="85"></use></g><g transform="rotate(120)"><use xlink:href="#ray" x="85"></use></g><g transform="rotate(90)"><use xlink:href="#ray" x="85"></use></g><g transform="rotate(60)"><use xlink:href="#ray" x="85"></use></g><g transform="rotate(30)"><use xlink:href="#ray" x="85"></use></g><g transform="rotate(0)"><use xlink:href="#ray" x="85"></use></g></g></g></g></svg>
    </div>
    <div class="temp">{{'北京 ' + arr.temp + '°C '}}{{arr.weat}}</div>
	</div>
</template>

<script>
export default {
  props: {
    arr: {
      type: Object
    }
  }
}
</script>

<style>
.weather {
margin: 0 auto;
}

.svg {
  float:right;
  width:60px;
  margin: 0 auto;
  padding-right: 10px;
  padding-left: 20px;
}

.temp {
  font-size: 15px;
  float: right;
  margin: 10px, 5px;
  padding-top: 10px;
  padding-right: 10px;
}
:root { --sw: 10px;/*等同于设置所有的path line 等stroke-width="10"*/ --a: 30deg; }

svg {
  flex: 1;
  fill: none;
  stroke: white;
  stroke-width: var(--sw);
  stroke-linecap: round;
}

mask :nth-child(odd) {
  fill: white;
}

mask :nth-child(2n) {
  fill: black;
  stroke: black;
  stroke-width: calc(2*var(--sw));
}

[id='sun'] {
  --i: -2;
  mask: url(#m);
}

.osc,
line {
  animation: osc 2s ease-in-out infinite alternate;
}

line {
  animation: exp 2s ease-in-out infinite alternate;
}

[id='raindrop'] {
  animation: fall-clockwise 2s ease-in-out infinite;
}

[id='rays'] {
  animation: rot 2s linear infinite;
}


/*上下晃动特效*/

@keyframes osc {
  to {
    transform: translatey(calc(var(--i, 1)*var(--sw)));
  }
}


/*旋转特效*/

@keyframes rot {
  to {
    transform: rotate(var(--a));
  }
}


/*变大*/

@keyframes exp {
  to {
    transform: scalex(1.5);
  }
}


/*下落特效*/

@keyframes fall-clockwise {
  0% {
    -webkit-transform: translateY(-7px) scale(0.8);
    transform: translateY(-7px) scale(0.8);
    opacity: 0;
  }
  10% {
    -webkit-transform: translateY(0px) translateX(4px) scale(0.7);
    transform: translateY(0px) translateX(4px) scale(0.7);
    opacity: 1;
  }
  45% {
    -webkit-transform: translateY(7px) translateX(0px) scale(0.6);
    transform: translateY(7px) translateX(0px) scale(0.6);
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    -webkit-transform: translateY(14px) translateX(3px) scale(0.5);
    transform: translateY(14px) translateX(3px) scale(0.5);
  }
}
</style>

