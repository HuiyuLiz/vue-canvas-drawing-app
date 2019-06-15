# JavaScript 題目篇 - 新手 JS 地下城
 ![image]( https://github.com/HuiyuLiz/vue-canvas-drawing-app/blob/master/FireShot-%207F-Canvas.png)  
 
 7F - 畫版
 <a href="https://huiyuliz.github.io/vue-canvas-drawing-app/" target="_blank">Demo</a>、
 <a href="https://github.com/HuiyuLiz/vue-canvas-drawing-app" target="_blank">程式碼</a>  
 
 使用 Vue.js 進行破關，專案中的 Canvas 可以透過 .toDataURL( ) ，將畫布中的筆畫轉成 base64 字串，編碼後可以存成圖片內嵌至網頁內，以此用來記錄 UNDO 、 REDO 步驟，清除畫布時再重新繪製新的矩形覆蓋。


## 預先暖身
 <a href="https://www.youtube.com/watch?v=8ZGAzJ0drl0" target="_blank">Wes Bos - Let's build something fun with HTML5 Canvas</a>  
 
 JavaScript 30 系列之一，用原生 JS 實做一個 Canvas 小專案，不得不說這系列相當實用，看完後會更清楚如何製作，順便應用到這次的專案上，本案救星。

## 特定技術 遊戲規則

 繪圖區請使用 Canvas 來設計，上方的控制列與下方的畫筆調整可不用  

 SAVE ：點擊後可直接下載轉出的 PNG 圖片  

 CLEAR ALL：清除畫版樣式  

 UNDO、REDO：上一步、下一步  

 點擊箭頭時，功能列介面皆可進行收闔  

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

這行 css 同時也加在隨著滑鼠移動的游標中，避免和畫畫時的滑鼠事件互相干擾。

```css
.cursor {
  position: absolute;
  border-radius: 50%;
  cursor: crosshair;
  pointer-events: none;
}
```
## pickr 顏色選取套件
 ![image]( https://github.com/HuiyuLiz/vue-canvas-drawing-app/blob/master/FireShot-%207F-Canvas2.png?raw=true)  
  原本使用 input color 讓使用者自訂顏色，剛好看到了<a href="https://github.com/Simonwep/pickr" target="_blank">pickr</a>套件，外觀上與畫板更有一致性，修改的版本放在 <a href="https://codepen.io/liscodecode/pen/ZPLGxX" target="_blank">CodePen。</a>
 
## 參考資料
<a href="https://www.codicode.com/art/undo_and_redo_to_the_html5_canvas.aspx" target="_blank">Undo and Redo with HTML5 Canvas
</a>  
<a href="https://www.youtube.com/watch?v=rfpRZ2t_BrQ" target="_blank">Creating Custom Cursors 自訂游標</a>  
<a href="https://www.oxxostudio.tw/articles/201409/pointer-events.html" target="_blank">穿透的 div ( pointer-events )</a>  
<a href="https://blog.gtwang.org/web-development/minimizing-http-request-using-data-uri/" target="_blank">使用 DATA URI 將圖片以 Base64 編碼並內崁至網頁中，加速載入速度</a>  
<a href="https://www.youtube.com/watch?v=RSbZJYVQmPU" target="_blank">Pickr - An Awesome Color Picker for your next Project!</a>  

