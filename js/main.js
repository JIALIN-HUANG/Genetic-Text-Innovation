//鼠标位置写入
document.addEventListener("mousemove", function(event) {
    var x = event.clientX;
    var y = event.clientY;
    var pos =  x + "," + y;
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
    time.innerHTML = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
}

//每秒刷新时间
setInterval(writeTime, 1000);

//文件列表  , "file/ChatGPT.csv","file/amazon.csv",
const files = ["file/adele.txt",  "file/al-green.txt", "file/ChatGPT.csv","file/amazon.csv"];

//统计files数量
let fileNum = files.length;
//设置搜索完成数量
let searchCompleteNum = 0;


//设置文件类型空对象
let foundTitles = {};

//获取关键词
document.getElementById("search-btn").addEventListener("click", function () {
    const keyword = document.getElementById("keyword-input").value;
    searchData(keyword);
});

//搜索
function searchData(keyword) {
    if (!keyword) {
        alert("Please enter a keyword");
        return;
    }
    console.log(keyword)
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";
    let result = "";
    const csvRegex = /\.(csv)$/i;
    const txtRegex = /\.(txt)$/i;

    //重置类型
    foundTitles = {};

    //开始搜索
    showResult("Searching...");

    for (let i = 0; i < files.length; i++) {
        const fileType = getFileType(files[i]);
        // 如果已经找到该类型的文件标题，直接跳过
        if (foundTitles[fileType]) {
            continue;
        }

        fetch(files[i])
            .then(response => response.text())
            .then(data => {
                //txt文件按行分割，csv文件按逗号分割
                const lines = txtRegex.test(files[i]) ? data.split("\n") : data.split(/,|\n/);
                let found = false;
                for (let j = 0; j < lines.length; j++) {
                    // 如果找到关键词，设置 found 为 true
                    if (lines[j].includes(keyword)) {
                        found = true;
                        foundTitles[fileType] = true;
                        // 关键词标红
                        lines[j] = lines[j].replace(
                            keyword,
                            "<span style='color:red'>" + keyword + "</span>"
                        );
                        result += lines[j] + "<br>";
                        // 只显示前 20 行
                        // if (j >= 20) {
                        //     break;
                        // }
                    }
                }
                // 分割线
                // if (found) {
                //     foundTitles[fileType] = true;
                //     result += "<hr>";
                // }
                showResult(result);
                // 搜索完成+1
                searchCompleteNum++;
                console.log(searchCompleteNum)
            })
            .catch(error => {
                console.error(error);
                showResult("Error occurred while fetching file: " + files[i]);
            })
    }



    //每秒检查是否搜索完成
    const timer = setInterval(function () {
        console.log(searchCompleteNum)
        if (searchCompleteNum === fileNum) {
            clearInterval(timer);
            // 搜索完成
            if (result === "") {
                showResult("No results found");
            }
        }
    }, 1000);

}


// 打字效果,无法渲染html标签
function showResult(text) {
    console.log(text)
    if (text == '') {
        return;
    }
    const result = document.getElementById("result");
    result.innerHTML = text;

    // const textArray = text.split("");
    // let i = 0;
    // const timer = setInterval(function() {
    //     if (i < textArray.length) {
    //         result.innerHTML += textArray[i];
    //         i++;
    //     } else {
    //         clearInterval(timer);
    //     }
    // }, 10);
}


// 获取文件类型
function getFileType(fileName) {
    const index = fileName.lastIndexOf(".");
    if (index === -1) {
        return fileName;
    } else {
        return fileName.substr(index + 1);
    }
}

// //加载动画
// import { gsap } from "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js";
// import { ScrambleTextPlugin } from "./js/ScrambleText.js";

// // register ScrambleTextPlugin with gsap
// gsap.registerPlugin(ScrambleTextPlugin);

// // animate the text
// gsap.to(".centered-text", {
//   scrambleText: {
//     text: "GENETIC TEXT INNOVATION",
//     revealDelay: 0.3,
//     tweenLength: true,
//   },
// });

// // animate the bottom text
// gsap.to(".bottom-text", {
//   scrambleText: {
//     text: "Innovative design explores text understanding",
//     revealDelay: 0.3,
//     tweenLength: true,
//   },
// });
