# JavaScript 題目篇 - 新手 JS 地下城
7F - 畫版
 <a href="https://huiyuliz.github.io/Canvas/#" target="_blank">Demo</a>、
 <a href="https://github.com/HuiyuLiz/Canvas" target="_blank">程式碼</a>
 
 使用 Vue.js 進行破關，專案中的 canvas 可以透過 .toDataURL( ) ，將畫布中的筆畫轉成 <a href="https://en.wikipedia.org/wiki/Data_URI_scheme" target="_blank">data URI scheme</a> 用來記錄步驟
 ；清除畫布時再重新繪製新的矩形覆蓋。


## 預先暖身
 <a href="https://www.youtube.com/watch?v=8ZGAzJ0drl0" target="_blank">Wes Bos - Let's build something fun with HTML5 Canvas</a>  
 
 JavaScript 30 系列之一，用原生 JS 實做一個 Canvas 小專案，不得不說這系列相當實用，看完後會更清楚如何製作，順便應用到這次的專案上，本案救星。
## 擴充功能
【橡皮擦】點選橡皮擦，將 canvas 中的 strokeStyle 設定與背景顏色相同，進行繪製時可覆蓋原本已繪製的地方。

【滑鼠游標】顯示當下使用者選取的顏色和筆畫粗細。

【自訂色彩】使用HTML 裡的 input color 新增自訂顏色，搭配 Vue.js 裡的 @change 事件可以取出當下的色號，點選後會彈跳出調色的視窗。  

```html
<div id="app">
  <input type="color" id="input" v-model="value" @change="colorChange">
</div>
```
  
```Vue.js
     let app = new Vue({
     el: '#app',
     data: {
       value: '#ec6c6b'
     },
     methods: {
       colorChange() {
         let input = document.querySelector('#input')
         console.log(input.value)
       }
     },
    })
```
實做到一半發現 input 上加了 material icon 中的滴管圖形後，出現了無法點選到下層 input 的問題，怎麼點都會先點到滴管圖形導致無法操作，後來搜尋了一下可以用 css 中的 pointer-events: none 避免，
加入後 input 就不會再被上層元件遮住。  

這行 css 同時也加在隨著滑鼠移動的游標中，避免和畫畫時的滑鼠事件互相干擾，嗯，JS又可以少寫一行了。

```css
.cursor {
  position: absolute;
  border-radius: 50%;
  cursor: crosshair;
  pointer-events: none;
}
```

## 參考資料
<a href="https://www.oxxostudio.tw/articles/201409/pointer-events.html" target="_blank">穿透的 div ( pointer-events )</a>  


