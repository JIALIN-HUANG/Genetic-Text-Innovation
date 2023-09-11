
//检测窗口是否为1920*1080 如果不是则提示用户  To continue exploring, please maximize the size of the web page
function checkSize() {
  console.log(window.innerWidth, window.innerHeight);
  if (window.innerWidth < 1880) {
    // window.location.href = "http://127.0.0.1:8000/";
  }
}

//每秒检测一次窗口大小
setInterval(checkSize, 1000);


//鼠标位置写入
document.addEventListener("mousemove", function (event) {
  var x = event.clientX;
  var y = event.clientY;
  var pos = x + "," + y;
  document.getElementById("position").innerHTML = pos;
});

//时间写入
function writeTime() {
  var time = document.getElementsByClassName('time')[0];
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  time.innerHTML = year + '.' + month + '.' + day + ' ' + hour + ':' + minute + ':' + second;
}

//每秒刷新时间
setInterval(writeTime, 1000);


function searchMove(time, box, marginTop, beTop) {
  if (box == undefined || box == null) {
    var box = document.querySelector('.search');
  }
  if (marginTop == undefined || marginTop == null) {
    var marginTop = 175;
  }
  if (beTop == undefined || beTop == null) {
    var beTop = 100;
  }
  var intervalId = setInterval(function () {
    marginTop -= 5; //每隔20ms减小5px
    if (marginTop <= beTop) {
      marginTop = 0; //margin-top减小到0时停止定时器
      clearInterval(intervalId);
      // marginTop = marginTop + beTop;
    }
    box.style.marginTop = marginTop + "px";
  }, time);
}

function searchMove1() {
  var box = document.querySelector('.search');
  var marginTop = 300;
  var beTop = 205;
  var intervalId = setInterval(function () {
    marginTop -= 5; //每隔20ms减小5px
    if (marginTop <= beTop) {
      marginTop = 205; //margin-top减小到175时停止定时器
      clearInterval(intervalId);
    }
    box.style.marginTop = marginTop + "px";
  }, 100);
}





//英文月份
const date = new Date();
const month = date.toLocaleString('en', { month: 'long' }); // 参数 'en' 表示英语语言环境，'long' 表示使用完整的月份名称
//天
const day = date.getDate();
//月份 天
const monthDay = month + day;
// console.log(monthDay);

//AM PM
const hours = date.getHours();
const minutes = date.getMinutes();
const seconds = date.getSeconds();
const ampm = hours >= 12 ? 'PM' : 'AM';
// 12 小时制
const hours12 = hours % 12 || 12;
// 12 小时制 + AM/PM
const strTime = hours12 + ':' + minutes + ':' + seconds + ' ' + ampm;
// console.log(strTime);

//年
const year = date.getFullYear();
// console.log(year);

//天
const daytime = strTime + ' ' + monthDay + ',' + year;


//txt打印内容
function write_txt(content) {
  $('.txt_file').find('.year').text(year);
  $('.txt_file').find('.month').text(month);
  $('.txt_file').find('.time').text(strTime);
  $('.txt_file').find('.monthDay').text(monthDay);
  $('.txt_file').find('.text').text(content);

  searchMove(50, document.querySelector('.txt_file'), 500, 50);


  //获取margin-top 是否为0，每200ms判断一次
  var intervalId = setInterval(function () {
    var marginTop = $('.txt_file').css('margin-top');
    console.log(marginTop);
    if (marginTop == '0px') {
      console.log('margin-top 为0时，停止定时器');
      //margin-top 为0时，停止定时器

      clearInterval(intervalId);
      //执行滚动到底部
      scrollBottom1();
    }
  }, 200);



}

//urbandict-worddefs.csv
function urbandict_word_defs(key, definition) {
  $('.urbandict-word-defs').find('.key').text(key);
  $('.urbandict-word-defs').find('.definition').text(definition);
  $('.urbandict-word-defs').find('.time').text(daytime);

  //margin-top 300px 设置为0
  searchMove(50, document.querySelector('.urbandict-word-defs'), 500, 50);

  //获取margin-top 是否为0，每200ms判断一次
  var intervalId = setInterval(function () {
    var marginTop = $('.urbandict-word-defs').css('margin-top');
    console.log(marginTop);
    if (marginTop == '0px') {
      console.log('margin-top 为0时，停止定时器');
      //margin-top 为0时，停止定时器

      clearInterval(intervalId);
      //执行滚动到底部
      scrollBottom1();
    }
  }, 200);

}

//one-million-reddit-jokes.csv
function one_million_reddit_jokes(content) {

  $('.one-million-reddit-jokes').find('.selftext').text(content);
  $('.one-million-reddit-jokes').find('.time').text(daytime);

  //margin-top 300px 设置为0
  searchMove(50, document.querySelector('.one-million-reddit-jokes'), 500, 50);

  //获取margin-top 是否为0，每200ms判断一次
  var intervalId = setInterval(function () {
    var marginTop = $('.one-million-reddit-jokes').css('margin-top');
    console.log(marginTop);
    if (marginTop == '0px') {
      console.log('margin-top 为0时，停止定时器');
      //margin-top 为0时，停止定时器

      clearInterval(intervalId);
      //执行滚动到底部
      scrollBottom1();
    }
  }, 200);


}

//wikisent2.csv
function wikisent2(content) {

  $('.wikisent2').find('.selftext').text(content);
  $('.wikisent2').find('.time').text(daytime);

  //margin-top 300px 设置为0
  searchMove(50, document.querySelector('.wikisent2'), 500, 50);

  //获取margin-top 是否为0，每200ms判断一次
  var intervalId = setInterval(function () {
    var marginTop = $('.wikisent2').css('margin-top');
    console.log(marginTop);
    if (marginTop == '0px') {
      console.log('margin-top 为0时，停止定时器');
      //margin-top 为0时，停止定时器

      clearInterval(intervalId);
      //执行滚动到底部
      scrollBottom1();
    }
  }, 200);


}

//
function musiccaps_public(aspect_list, caption) {

  //去除前后[],去除单引号，替换逗号为换行
  aspect_list = aspect_list.replace(/[\[\]]/g, "");
  aspect_list = aspect_list.replace(/'/g, "");
  aspect_list = aspect_list.replace(/,/g, "\n");

  //前后拼接 li
  aspect_list = aspect_list.split("\n").map(function (item) {
    return '<li>' + item + '</li>';
  }).join("\n");

  // console.log(aspect_list);

  $('.musiccaps-public').find('.aspect_list ol').html(aspect_list);
  $('.musiccaps-public').find('.caption').text(caption);

  //margin-top 300px 设置为0
  searchMove(50, document.querySelector('.musiccaps-public'), 300);


  //获取margin-top 是否为0，每200ms判断一次
  var intervalId = setInterval(function () {
    var marginTop = $('.musiccaps-public').css('margin-top');
    console.log(marginTop);
    if (marginTop == '0px') {
      console.log('margin-top 为0时，停止定时器');
      //margin-top 为0时，停止定时器

      clearInterval(intervalId);
      //执行滚动到底部
      scrollBottom1();
    }
  }, 200);

}


function ChatGPT(Tweet, User, Date) {
  $('.ChatGPT').find('.Tweet').text(Tweet);
  $('.ChatGPT').find('.User').text('@' + User);


  //去除 +00:00
  Date = Date.replace(/\+00:00/g, "");

  $('.ChatGPT').find('.Date').text(Date);

  //margin-top 300px 设置为0
  searchMove(50, document.querySelector('.ChatGPT'), 300);

  //获取margin-top 是否为0，每200ms判断一次
  var intervalId = setInterval(function () {
    var marginTop = $('.ChatGPT').css('margin-top');
    console.log(marginTop);
    if (marginTop == '0px') {
      console.log('margin-top 为0时，停止定时器');
      //margin-top 为0时，停止定时器

      clearInterval(intervalId);
      //执行滚动到底部
      scrollBottom1();
    }
  }, 200);

}


function PoetryFoundationData(key, Poem, Poet) {
  $('.PoetryFoundationData').find('.Title').text(key);
  $('.PoetryFoundationData').find('.Poem').text(Poem);
  $('.PoetryFoundationData').find('.Poet').text(Poet);
  $('.PoetryFoundationData').find('.time').text(daytime);

  //margin-top 300px 设置为0
  searchMove(50, document.querySelector('.PoetryFoundationData'), 600);


  //获取margin-top 是否为0，每200ms判断一次
  var intervalId = setInterval(function () {
    var marginTop = $('.PoetryFoundationData').css('margin-top');
    console.log(marginTop);
    if (marginTop == '0px') {
      console.log('margin-top 为0时，停止定时器');
      //margin-top 为0时，停止定时器

      clearInterval(intervalId);
      //执行滚动到底部
      scrollBottom1();
    }
  }, 200);

}




function amazon(about_product, rating, rating_count, key, category, actual_price, discounted_price) {
  $('.amazon').find('.about_product').text(about_product);
  $('.amazon').find('.rating').text(rating);
  $('.amazon').find('.rating_count').text(rating_count);
  $('.amazon').find('.key').text(key);
  //把|替换成换行
  var category = category.replace(/\|/g, "\n");
  $('.amazon').find('.category').text(category);
  $('.amazon').find('.actual_price').text(actual_price);
  $('.amazon').find('.discounted_price').text(discounted_price);
  //margin-top 300px 设置为0
  searchMove(50, document.querySelector('.amazon'), 300);



  //获取margin-top 是否为0，每200ms判断一次
  var intervalId = setInterval(function () {
    var marginTop = $('.amazon').css('margin-top');
    console.log(marginTop);
    if (marginTop == '0px') {
      console.log('margin-top 为0时，停止定时器');
      //margin-top 为0时，停止定时器

      clearInterval(intervalId);
      //执行滚动到底部
      scrollBottom1();
    }
  }, 200);


}




// 滚动指定元素到最下面
function scrollBottom1() {
  // 获取指定元素的高度
  var scrollHeight = document.getElementById("result").scrollHeight;
  // console.log(scrollHeight);
  var element = document.getElementById("result"); // 获取指定元素

  var currentPosition = element.scrollTop; // 获取当前位置
  var distance = scrollHeight - currentPosition; // 计算当前位置和底部距离
  var speed = 5; // 滚动速度，数值越大滚动越快
  var time = distance / speed; // 计算滚动需要的时间

  // console.log(distance, time);


  // 如果页面已经滑动到底部，则不再执行滚动
  if (distance <= 0) {
    return;
  }

  // 使用 setInterval 实现滚动效果
  var timer = setInterval(function () {
    console.log(currentPosition, scrollHeight);
    if (currentPosition >= scrollHeight) {
      console.log('滚动到底部');
      clearInterval(timer);
      return;
    }
    currentPosition += distance / time;
    element.scrollTop = currentPosition;
  }, 10);
}


function scrollBottom() {

  //2s后滚动到底部
  setTimeout(function () {


    var windowHeight = window.innerHeight; // 获取窗口高度
    var contentHeight = document.documentElement.scrollHeight; // 获取页面内容高度
    var scrollDistance = contentHeight - windowHeight; // 计算滚动距离

    // 如果页面已经滑动到底部，则不再执行滚动
    if (scrollDistance <= 0) {
      return;
    }

    var currentPosition = window.pageYOffset; // 获取当前位置
    var speed = 100000; // 滚动速度，数值越大滚动越慢
    var time = scrollDistance / speed; // 计算滚动需要的时间

    // 使用 setInterval 实现滚动效果
    var timer = setInterval(function () {
      if (currentPosition >= scrollDistance) {
        clearInterval(timer);
        return;
      }
      currentPosition += scrollDistance / time;
      window.scrollTo(0, currentPosition);
    }, 20);
  }, 2000);
}


//随机文字
// Apple，Banana， Chair，Desk，Eggs，Fork，Glass，Hammer，Ice，Jacket，Key，Lamp， Mirror，Notebook，Orange， Pen，Quilt，Radio，Shoes，Table，Umbrella，Vacuum，Watch， Xylophone，Yogurt，Zipper
function randomText() {
  var text = ['Apple', 'Banana', 'Chair', 'Desk', 'Eggs', 'Fork', 'Glass', 'Hammer', 'Ice', 'Jacket', 'Key', 'Lamp', 'Mirror', 'Notebook', 'Orange', 'Pen', 'Quilt', 'Radio', 'Shoes', 'Table', 'Umbrella', 'Vacuum', 'Watch', 'Xylophone', 'Yogurt', 'Zipper'];
  var random = Math.floor(Math.random() * text.length);
  var randomText = text[random];
  $('#keyword-input').val(randomText);



    //步骤2，3隐藏
    $('.step2,.step3').animate({ opacity: 0 }, 2000);



  //步骤4出来
  //宽度设置100%
  $('.step4').css('color', 'black');
  $('.step4').animate({ 'margin-top': '-50px', opacity: 1 }, 1500);
  $('.step5').animate({ opacity: 0.75 }, 2000);



}

//点击start
function stepStart() {

  //步骤1隐藏
  $('.step1').animate({ opacity: 0 }, 2000);


  //步骤2，3移动出来,left设置为50%,3s,display设置为block,z-index设置为-1
  //颜色变黑
  $('.step2').css('display', 'inline-block');
  $('.step2').css('width', '47%');

  $('.step2').animate({ opacity: 1,'margin-top':'-30px' }, 2000);
  //检测step2 opacity是否为1，是的话，执行step3
  var intervalId1 = setInterval(function () {
    var opacity = $('.step2').css('opacity');
    if (opacity == '1') {
      //opacity 为1时，停止定时器
      clearInterval(intervalId1);
      //执行step3
      $('.step3').css('display', 'inline-block');
      $('.step3').css('margin-top', '-25px');
      $('.step3').animate({ 'margin-left': '20px' }, 5000);
    }
  }, 200);




  $('.step4').animate({ opacity: 0.75 }, 2000);
  $('.step5').animate({ opacity: 0.5 }, 2000);

}


//最后
function stepEnd() {

  //步骤4隐藏
  $('.step4').animate({ opacity: 0 }, 2000);

  //步骤5移动出来
  $('.step5').animate({ opacity: 1, 'margin-top': '-50px' }, 2000);
}


// function checkInput() {
//   //检测keyword-input 是否在改变
//   var input = document.getElementById("keyword-input");
//   input.addEventListener("input", function () {
//     var keyword = document.getElementById("keyword-input").value;
//     console.log(keyword);
//     if (keyword.length > 0) {
//       $('.step2,.step3').animate({ opacity: 1, 'margin-top': '-30px' }, 2000);
//       $('.step4').animate({ opacity: 0.75 }, 2000);
//       $('.step5').animate({ opacity: 0.5 }, 2000);
//     }
//   });
// }

// //每秒检测一次
// setInterval(function () { checkInput() }, 1000);


//监听input框
document.getElementById("keyword-input").onchange = function () {
  var keyword = document.getElementById("keyword-input").value;
  console.log(keyword.length);
  if (keyword.length > 0) {
    //步骤2，3隐藏
    $('.step2,.step3').animate({ opacity: 0 }, 2000);

    //步骤4出来
    //宽度设置100%
    $('.step4').css('color', 'black');
    $('.step4').animate({ 'margin-top': '-50px', opacity: 1 }, 2000);
    $('.step5').animate({ opacity: 0.75 }, 2000);
  }
}




// //文件列表  , "file/ChatGPT.csv","file/amazon.csv",
// const files = ["file/adele.txt",  "file/al-green.txt", "file/ChatGPT.csv","file/amazon.csv"];
//
// //统计files数量
// let fileNum = files.length;
// //设置搜索完成数量
// let searchCompleteNum = 0;
//
//
// //设置文件类型空对象
// let foundTitles = {};
//
// //获取关键词
// document.getElementById("search-btn").addEventListener("click", function () {
//     const keyword = document.getElementById("keyword-input").value;
//     searchData(keyword);
// });
//
// //搜索
// function searchData(keyword) {
//     if (!keyword) {
//         alert("Please enter a keyword");
//         return;
//     }
//     console.log(keyword)
//     const resultDiv = document.getElementById("result");
//     resultDiv.innerHTML = "";
//     let result = "";
//     const csvRegex = /\.(csv)$/i;
//     const txtRegex = /\.(txt)$/i;
//
//     //重置类型
//     foundTitles = {};
//
//     //开始搜索
//     showResult("Searching...");
//
//     for (let i = 0; i < files.length; i++) {
//         const fileType = getFileType(files[i]);
//         // 如果已经找到该类型的文件标题，直接跳过
//         if (foundTitles[fileType]) {
//             continue;
//         }
//
//         fetch(files[i])
//             .then(response => response.text())
//             .then(data => {
//                 //txt文件按行分割，csv文件按逗号分割
//                 const lines = txtRegex.test(files[i]) ? data.split("\n") : data.split(/,|\n/);
//                 let found = false;
//                 for (let j = 0; j < lines.length; j++) {
//                     // 如果找到关键词，设置 found 为 true
//                     if (lines[j].includes(keyword)) {
//                         found = true;
//                         foundTitles[fileType] = true;
//                         // 关键词标红
//                         lines[j] = lines[j].replace(
//                             keyword,
//                             "<span style='color:red'>" + keyword + "</span>"
//                         );
//                         result += lines[j] + "<br>";
//                         // 只显示前 20 行
//                         // if (j >= 20) {
//                         //     break;
//                         // }
//                     }
//                 }
//                 // 分割线
//                 // if (found) {
//                 //     foundTitles[fileType] = true;
//                 //     result += "<hr>";
//                 // }
//                 showResult(result);
//                 // 搜索完成+1
//                 searchCompleteNum++;
//                 console.log(searchCompleteNum)
//             })
//             .catch(error => {
//                 console.error(error);
//                 showResult("Error occurred while fetching file: " + files[i]);
//             })
//     }
//
//
//
//     //每秒检查是否搜索完成
//     const timer = setInterval(function () {
//         console.log(searchCompleteNum)
//         if (searchCompleteNum === fileNum) {
//             clearInterval(timer);
//             // 搜索完成
//             if (result === "") {
//                 showResult("No results found");
//             }
//         }
//     }, 1000);
//
// }
//
//
// // 打字效果,无法渲染html标签
// function showResult(text) {
//     console.log(text)
//     if (text == '') {
//         return;
//     }
//     const result = document.getElementById("result");
//     result.innerHTML = text;
//
//     // const textArray = text.split("");
//     // let i = 0;
//     // const timer = setInterval(function() {
//     //     if (i < textArray.length) {
//     //         result.innerHTML += textArray[i];
//     //         i++;
//     //     } else {
//     //         clearInterval(timer);
//     //     }
//     // }, 10);
// }
//
//
// // 获取文件类型
// function getFileType(fileName) {
//     const index = fileName.lastIndexOf(".");
//     if (index === -1) {
//         return fileName;
//     } else {
//         return fileName.substr(index + 1);
//     }
// }
