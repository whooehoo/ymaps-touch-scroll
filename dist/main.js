!function(e){function t(n){if(i[n])return i[n].exports;var o=i[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var i={};t.m=e,t.c=i,t.d=function(e,i,n){t.o(e,i)||Object.defineProperty(e,i,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var i=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(i,"a",i),i},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=2)}([function(e,t,i){"use strict";function n(e){function t(e,t,i){var n=document.createElement("div");for(var o in i)n.style[o]=i[o];return n.classList.add(e),t.appendChild(n),n}function i(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];d.style.zIndex=e?a:a-1,s.style.opacity=e?".5":0}var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(r.default.any&&e.behaviors.isEnabled("multiTouch")){e.behaviors.disable("drag");var o=e.container.getParentElement();getComputedStyle(o).position||(o.style.position="relative");var a=getComputedStyle(e.container.getElement()).zIndex,d=t("ymaps-touch-scroll",o,{position:"absolute",top:"0",right:"0",bottom:"0",left:"0",zIndex:a-1}),s=t("ymaps-touch-scroll-bg",d,{background:"#000",opacity:"0",width:"100%",height:"100%",transition:"opacity .1s ease-in-out"}),l=e.margin.getMargin();for(var u in l)l[u]+=20;t("ymaps-touch-scroll-content",d,{position:"absolute",top:"50%",left:"0",transform:"translateY(-50%)",color:"#fff",textAlign:"center",width:"100%",overflow:"hidden",boxSizing:"border-box",textOverflow:"ellipsis",padding:l.join("px ")+"px"}).textContent=n.hasOwnProperty("text")?n.text:"Чтобы переместить карту проведите по ней двумя пальцами",o.addEventListener("touchmove",function(){return i()}),o.addEventListener("touchend",function(){return i(!1)})}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=n;var o=i(1),r=function(e){return e&&e.__esModule?e:{default:e}}(o)},function(e,t,i){var n,o,r;!function(i){var a=/iPhone/i,d=/iPod/i,s=/iPad/i,l=/(?=.*\bAndroid\b)(?=.*\bMobile\b)/i,u=/Android/i,c=/(?=.*\bAndroid\b)(?=.*\bSD4930UR\b)/i,p=/(?=.*\bAndroid\b)(?=.*\b(?:KFOT|KFTT|KFJWI|KFJWA|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|KFARWI|KFASWI|KFSAWI|KFSAWA)\b)/i,f=/Windows Phone/i,h=/(?=.*\bWindows\b)(?=.*\bARM\b)/i,b=/BlackBerry/i,v=/BB10/i,y=/Opera Mini/i,w=/(CriOS|Chrome)(?=.*\bMobile\b)/i,x=/(?=.*\bFirefox\b)(?=.*\bMobile\b)/i,m=new RegExp("(?:Nexus 7|BNTV250|Kindle Fire|Silk|GT-P1000)","i"),g=function(e,t){return e.test(t)},A=function(e){var t=e||navigator.userAgent,i=t.split("[FBAN");if(void 0!==i[1]&&(t=i[0]),i=t.split("Twitter"),void 0!==i[1]&&(t=i[0]),this.apple={phone:g(a,t),ipod:g(d,t),tablet:!g(a,t)&&g(s,t),device:g(a,t)||g(d,t)||g(s,t)},this.amazon={phone:g(c,t),tablet:!g(c,t)&&g(p,t),device:g(c,t)||g(p,t)},this.android={phone:g(c,t)||g(l,t),tablet:!g(c,t)&&!g(l,t)&&(g(p,t)||g(u,t)),device:g(c,t)||g(p,t)||g(l,t)||g(u,t)},this.windows={phone:g(f,t),tablet:g(h,t),device:g(f,t)||g(h,t)},this.other={blackberry:g(b,t),blackberry10:g(v,t),opera:g(y,t),firefox:g(x,t),chrome:g(w,t),device:g(b,t)||g(v,t)||g(y,t)||g(x,t)||g(w,t)},this.seven_inch=g(m,t),this.any=this.apple.device||this.android.device||this.windows.device||this.other.device||this.seven_inch,this.phone=this.apple.phone||this.android.phone||this.windows.phone,this.tablet=this.apple.tablet||this.android.tablet||this.windows.tablet,"undefined"==typeof window)return this},F=function(){var e=new A;return e.Class=A,e};void 0!==e&&e.exports&&"undefined"==typeof window?e.exports=A:void 0!==e&&e.exports&&"undefined"!=typeof window?e.exports=F():(o=[],n=i.isMobile=F(),void 0!==(r="function"==typeof n?n.apply(t,o):n)&&(e.exports=r))}(this)},function(e,t,i){"use strict";function n(){function e(){var e=new ymaps.Map("map",{center:[55.76,37.64],zoom:10});(0,r.default)(e)}ymaps.ready(e)}var o=i(0),r=function(e){return e&&e.__esModule?e:{default:e}}(o);i(3),i(4),document.addEventListener("DOMContentLoaded",n)},function(e,t){},function(e,t){}]);