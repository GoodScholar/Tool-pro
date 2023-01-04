# js的工具方法集合

#  移动端获取终端

```js
 <script src="https://cdn.bootcss.com/vConsole/3.2.0/vconsole.min.js"></script>
 <script>
        var vConsole = new VConsole()
 </script>
```



### 计算距离下次生日还有多少天

注意这里借助 [moment](https://link.juejin.cn?target=http%3A%2F%2Fmomentjs.cn%2F) 实现

```ts
    getBirthdayFun(){
       // 首先要获取到今年的生日
      let birthdayTime = moment().format('YYYY-') + '12-19'
      // 通过时间戳  去判断当前的时间戳是否大于今年生日的时间戳 
      if (moment().unix() >= moment(birthdayTime).unix()) {
        // 如果大于的话，那么就在今年的生日上再添加一年，已达到获取下次生日的时间
        birthdayTime = moment(birthdayTime).add(1, 'y').format('YYYY-MM-DD')
      }
      // 这个直接通过计算 （下次生日的时间戳 - 当前日期的时间戳) / (60 * 60 * 24) 最后求出来的就是 XX 天
      return parseInt(
        (moment(birthdayTime).unix() - moment().unix()) / (60 * 60 * 24)
      )
    }
```

### 回到顶部

```ts
    // 这里我把 vue3 的案例拿过来
    const bindTop = () => {
       // 方法一 这样可以实现，但是效果不太行
       window.scrollTo(0, 0)
       document.documentElement.scrollTop = 0;
        
      // 方法二 通过计时器去滚动 视觉上会丝滑一些，没有太大的卡顿效果
      const timeTop = setInterval(() => {
        // 去控制他的滑行距离
        document.documentElement.scrollTop = scrollTopH.value -= 50
        // 当滑到顶部的时候记得清除计时器(*) 重点
        if (scrollTopH.value <= 0) {
          clearInterval(timeTop)
        }
      }, 10)
    }
```

### 复制文本

```js
    const copyText = (text) => {
        // clipboardData 在页面上将需要的东西复制到剪贴板上
        const clipboardData = window.clipboardData
        if (clipboardData) {
          clipboardData.clearData()
          clipboardData.setData('Text', text)
          return true
        } else if (document.execCommand) {  // 注意 document.execCommand 已弃用 但是有些浏览器依旧支持 用的时候记得看兼容情况
          // 通过创建 dom 元素，去把要复制的内容拿到 
          const el = document.createElement('textarea')
          el.value = text
          el.setAttribute('readonly', '')
          el.style.position = 'absolute'
          el.style.left = '-9999px'
          document.body.appendChild(el)
          el.select()
          // 拷贝当前内容到剪贴板
          document.execCommand('copy')
          // 删除 el 节点
          document.body.removeChild(el)
          return true
        }
        return false
      }
      copyText('hello!') // ctrl + v = copyText  | true
```

### 防抖/节流

简单介绍

- 防抖：指定时间内 频繁触发一个事件，以最后一次触发为准
- 节流：指定时间内 频繁触发一个事件，只会触发一次

> 应用场景有很多比如:
>
> 防抖是： input搜索，用户在不断输入内容的时候，用防抖来减少请求的次数并且节约请求资源
>
> 节流：场景普遍就是按钮点击，一秒点击 10 下会发起 10 次请求，节流以后 1 秒点再多次，都只会触发一次

```js
    // 防抖
    // fn 需要防抖的函数，delay 为定时器时间
    function debounce(fn,delay){
        let timer =  null  // 用于保存定时器
        return function () { 
            // 如果timer存在 就清除定时器，重新计时
            if(timer){
                clearTimeout(timer);
            }
            //设置定时器，规定时间后执行真实要执行的函数
            timer = setTimeout(() => {
               fn.apply(this);
            }, delay);
        }
    }
    
    // 节流
    function throttle(fn) {
      let timer = null; // 首先设定一个变量，没有执行定时器时,默认为 null
      return function () {
        if (timer) return; // 当定时器没有执行的时候timer永远是false,后面无需执行
        timer = setTimeout(() => {
          fn.apply(this, arguments);
           // 最后在setTimeout执行完毕后再把标记设置为true(关键)
           // 表示可以执行下一次循环了。
          timer = null;
        }, 1000);
      };
    }
```

### 过滤特殊字符

```js
    function filterCharacter(str){
        // 首先设置一个模式
        let pattern = new RegExp("[`~!@#$^&*()=：”“'。，、？|{}':;'%,\\[\\].<>/?~！@#￥……&*（）&;—|{ }【】‘；]")
        let resultStr = "";
        for (let i = 0; i < str.length; i++) {
            // 主要通过 replace ，pattern 规则 去把字符替换成空 最后拼接在 resultStr
            resultStr = resultStr + str.substr(i, 1).replace(pattern, '');
        }
        // 当循环结束的时候返回最后结果 resultStr
        return resultStr;
    }
    
    // 示例
    filterCharacter('gyaskjdhy12316789#$%^&!@#1=123,./[') // 结果:gyaskjdhy123167891123
```

### 常用正则判断

```js
    // 校验2-9位文字 不符合为 false  符合为 true
    const validateName = (name) => {
      const reg = /^[\u4e00-\u9fa5]{2,9}$/;
      return reg.test(name);
    };

    // 校验手机号
    const validatePhoneNum = (mobile) => {
      const reg = /^1[3,4,5,6,7,8,9]\d{9}$/;
      return reg.test(mobile);
    };

    // 校验6到18位大小写字母数字下划线组成的密码
    const validatePassword = (password) => {
      const reg = /^[a-zA-Z0-9_]{6,18}$/;
      return reg.test(password);
    };
```

### 判断文件类型

```js
formatType(fileName) {
    let fileType
    if (/(\.pdf)$/.test(fileName)) {
        fileType = 'pdf'
    } else if (/(\.doc|\.docx)$/.test(fileName)) {
        fileType = 'word'
    } else if (/(\.png|\.jpg|\.jpeg)$/.test(fileName)) {
        fileType = 'image'
    } else {
        fileType = 'text'
    }
    return fileType
}
```

### 将 RGB 转换为十六进制

```js
function getColorFun(r,g,b) {
   return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}
getColorFun(178,232,55) // 这里输出的是 #b2e837
```

### 检测是否是一个函数

```js
// 检测是否是一个函数  其实写法以后直接 isFunction 就好了，避免重复写判断
const isFunction = (obj) => {
  return typeof obj === "function" && typeof obj.nodeType !== "number" && typeof obj.item !== "function";
    };
```

### 检测对象是否为一个安全对象

```js
// 首先要去判断 当前对象是否为有效对象 
const isVaildObject = (obj) => {
    return typeof obj === 'object' && !Array.isArray(obj) && Object.keys(obj).length
}
// 这里直接用上面的函数 如果有效就返回本身，无效就返回空对象
const safeObject = obj => isVaildObject(obj) ? obj : {}
```

### 将格林威治时间转为时间格式yyyy-mm-dd

```js
timeTrans(time, type) {
    if (time) {
        let date = new Date(
            new Date(time).getTime() + 8 * 3600 * 1000
        )
        date = date.toJSON()
        if (type === 1) {
            date = date.substring(0, 10)
        } else {
            date = date.substring(0, 19).replace('T', ' ')
        }
        return date
    }
```

### Blob Base64 File等前端文件流处理

- **File转Base64**

```js
  let reader = new FileReader();
  reader.readAsDataURL(file[0])
  console.log(reader)
```

- **Base64转Blob：**

```js
const dataURItoBlob = (dataURI) => {  
    var byteString = atob(dataURI.split(',')[1]);  
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];  
    var ab = new ArrayBuffer(byteString.length);  
    var ia = new Uint8Array(ab);  
    for (var i = 0; i < byteString.length; i++) {  
        ia[i] = byteString.charCodeAt(i);  
    }  
    return new Blob([ab], {type: mimeString});  
}
```

- **Blob转ArrayBuffer：**

```js
let blob = new Blob([1,2,3,4])
let reader = new FileReader();
reader.onload = function(result) {
    console.log(result);
}
reader.readAsArrayBuffer(blob);
```

- **Buffer转Blob：**

```
let blob = new Blob([buffer])
```

- **base64转文件流**

```js
// base64转文件流
bTof(data, fileName) {
    const arr = data.split(',')
    const byteString = window.atob(arr[1])
    const options = {
        type: 'image/jpeg',
        endings: 'native',
    }
    const u8Arr = new Uint8Array(byteString.length)
    for (let i = 0; i < byteString.length; i++) {
        u8Arr[i] = byteString.charCodeAt(i)
    }
    return new File([u8Arr], 'file_' + fileName + '.jpg', options)
},
```

### 数组处理

- **初始化数组**

```js
// fill()方法 是 es6新增的一个方法 使用指定的元素填充数组,其实就是用默认内容初始化数组
const arrList = Array(6).fill()
console.log(arrList)  // 此处打印的是 ['','','','','','']
```

- **检测是否为一个安全数组**

```js
// 检测是否为一个安全数组,若不是返回空数组  这里借助isArray 方法
const safeArray = (array) => {
  return Array.isArray(array) ? array : []
}
```

- 数组去重

```js
// 普通数组去重
function distinctArr(arr) {
    return [...new Set(arr)]
}

// 数组对象去重（filter和findIndex）
let arr = [
		{id: 1,name: '张三'},
		{id: 2,name: '李四'},
		{id: 1,name: '张三'},
		{id: 2,name: '李四'}
	];
function distinctArr(arr) {
   return arr.filter((item, index, selfArr) =>{
	   return selfArr.findIndex(val =>val.name === item.name) === index
   });
}
console.log(distinctArr(arr));

// 数组对象去重（reduce()方法）
let arr = [
		{id: 1,name: '张三'},
		{id: 2,name: '李四'},
		{id: 1,name: '张三'},
		{id: 2,name: '李四'}
	];
function distinctArr(arr) {
    let newobj = {}; 
    return arr.reduce((preVal, curVal) => {
        newobj[curVal.id] ? '' : newobj[curVal.id] = preVal.push(curVal); 
        return preVal 
    }, [])
}
console.log(distinctArr(arr));
```

### 字符串处理

- **去除字符串中的HTML**

该方法用于去除字符串中的HTML元素：

```javascript
const stripHtml = html => (new DOMParser().parseFromString(html, 'text/html')).body.textContent || '';
```

### 排序处理

- **1、sort()方法**

```js
var ar1=[2,4,6,8,1,3]
var ar2=[2,16,36,8,56]
ar1.sort()
ar2.sort() // 这个方法值只能排序第一位数  也可以字符串进行排序
console.log(ar1)//[1,2,3,4,6,8]
console.log(ar2)//[16, 2, 36, 56, 8]

sortAArr(arr){
  	return arr.sort((a,b)=> {
    	return a-b //a-b为升序
    	// return b-a  //b-a为降序
	})
}
console.log(sortAArr(ar2))//[2, 8, 16, 36, 56]
```

- **2、reverse()方法**

```js
var ar1=[2,4,6,8,1,3]
ar1.reverse()//此方法为倒序，也就是反过来。并不会进行大小排序
console.log(ar1)//[3, 1, 8, 6, 4, 2]
```

- **3、冒泡排序**
- **4、选择排序**
- **5、快速排序**

```js
quickSort(arr, i, j) {
  if(i < j) {
    let left = i;
    let right = j;
    let mid = Math.floor((left+right)/2);
    let temp = arr[left];
    arr[left] = arr[mid];
    arr[mid] = temp;
    let pivot = arr[left];
    while(i < j) {
      while(arr[j] >= pivot && i < j) {  // 从后往前找比基准小的数
        j--;
      }
      if(i < j) {
        arr[i++] = arr[j];
      }
      while(arr[i] <= pivot && i < j) {  // 从前往后找比基准大的数
        i++;
      }
      if(i < j) {
        arr[j--] = arr[i];
      }
    }
    arr[i] = pivot;
    quickSort(arr, left, i-1);
    quickSort(arr, i+1, right);
    return arr;
  }
}
```

- **6、二分查找排序**

```js
erfen (val, arr) {
        if (arr.length < 1||val<arr[0]||val>arr[arr.length-1]) { 
          return false; 
        }//如果这个数字没在其中直接返回false
        else if (val == arr[0]||val==arr[arr.length-1]) {
            return true;
        }//如果找到了就返回true
        else if (arr.length == 1) {
            return false;
        }//如果不能再缩小了而且没查到返回false
        let res = [];
        let base = Math.floor(arr.length / 2);
        if (val > arr[base]) {
           res = arr.splice(base + 1, arr.length - 1);
        }//如果大于中间的从右边开始找
       else if (val = arr[base]) {
            return true;
        }//恰巧等于中间的就返回true
        else {
           res = arr.splic(0, base - 1);
        }//如果小于中间的就从右边找
        return erfen(val,res);//递归
};
```

随机RGB杨色

```js
const choseRgb = () => {
    let r = Math.floor(Math.random() * 256)
    let g = Math.floor(Math.random() * 256)
    let b = Math.floor(Math.random() * 256)
    return `rgb(${r},${g},${b})`
}
```

# 将时间戳转为时间格式

```js
    timesTampToTime(timestamp) {
            var date = new Date(timestamp)
            var Y = date.getFullYear() + '-'
            var M =
                (date.getMonth() + 1 < 10
                    ? '0' + (date.getMonth() + 1)
                    : date.getMonth() + 1) + '-'
            var D =
                (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) +
                ' '
            var h =
                (date.getHours() < 10
                    ? '0' + date.getHours()
                    : date.getHours()) + ':'
            var m =
                (date.getMinutes() < 10
                    ? '0' + date.getMinutes()
                    : date.getMinutes()) + ':'
            var s =
                date.getSeconds() < 10
                    ? '0' + date.getSeconds()
                    : date.getSeconds()
            return Y + M + D + h + m + s
        },
```

旋转图片

```
 turnImage(src) {
            const img = new Image()
            img.src = src
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')
            const promise = new Promise((resolve) => {
                img.onload = () => {
                    canvas.width = img.height
                    canvas.height = img.width
                    ctx.translate(0, canvas.height)
                    ctx.rotate((Math.PI * 3) / 2)
                    ctx.drawImage(img, 0, 0, img.width, img.height)
                    resolve(canvas.toDataURL('image/png'))
                }
            })
            return promise
        },
```

