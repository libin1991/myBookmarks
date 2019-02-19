/*
思路：
    1. 分析页面，使用什么数据结构
    2. 使用JS自动生成标签，不用手动写，生成三个div，每个div里面有对应的个数的kbd
    3. 可以假设kbd是一样，然后将固定的个数修改对应的多少个
    4. 使用css美化界面
    5. 封装函数，优化代码

*/
//1.初始化数据
var hashA = init();
var keys = hashA['keys'];
var hash = hashA['hash'];

//2.生成键盘
generateKeyBoard(keys,hash);


//3.监听用户动作
//要监听谁的键盘事件 main还是document，需要知道用户按的是什么键
//key的兼容性不是很好
listenToUser(hash);



// 下面是工具函数
function init(){
    var keys = {
        0 : ['q','w','e','r','t','y','u','i','o','p'],
        1 : ['a','s','d','f','g','h','j','k','l'],
        2 : ['z','x','c','v','b','n','m'],
        length : 3
    }
    var hash = {
        q : 'qq.com',
        w : 'wangdoc.com',
        e : undefined,
        r : 'react-juejin.foreversnsd.cn',
        t : 'tgideas.qq.com/doc/',
        y : 'youtube.com',
        i : 'iciba.com',
        o : undefined,
        p : undefined,
        a : undefined,
        s : 'segmentfault.com',
        d : 'dribbble.com',
        f : undefined,
        g : 'github.com',
        h : undefined,
        j : 'jianshu.com',
        k : 'ke.qq.com',
        l : undefined,
        z : 'zhihu.com',
        x : 'xiedaimala.com',
        c : 'csdn.net',
        v : undefined,
        b : 'bilibili.com',
        n : undefined,
        m : 'main.163.com'
    }
	//取出localStorage里面的zzz对应的hash 
    var hasInLocalStorage = getFromLocalStorage('zzz');
    if(hasInLocalStorage){
        hash = hasInLocalStorage;
    }
    return {
        'keys' : keys,
        'hash' : hash
    }
}

function generateKeyBoard(keys,hash){
    for(var index = 0;index < keys['length'];index = index + 1){//0 1 2
        var div = tag('div');
        div.className = 'row';

        main.appendChild(div);

        var row = keys[index];
        // console.log(keys[index]['length']);
        for(var index2 = 0;index2 < row['length'];index2=index2+1){//将固定的10换成可控制的
            var span = createSpan(row[index2]);

            var img = createImage(hash[row[index2]]);

            var button = createButton(row[index2]);

            var kbd = tag('kbd');
            var kbd_wrapper = tag('div');
            kbd.className = 'key';
            kbd.title = hash[row[index2]];
            kbd_wrapper.className = 'kbd_wrapper';
            kbd.appendChild(span);
            kbd.appendChild(img);
            kbd.appendChild(button);
            kbd_wrapper.appendChild(kbd);
            div.appendChild(kbd_wrapper);
        }
    }
}
function listenToUser(hash){
    document.onkeypress = function(xyz){
        var key = xyz['key'];
        var website = hash[key];
        window.open('http://'+website,'_blank');
    }
}
function getFromLocalStorage(name){
    return JSON.parse(localStorage.getItem(name) || 'null');
}
function tag(tagName){
    var element = document.createElement(tagName);
    return element;
}
function tag1(tagName,attributes){
    var element = document.createElement(tagName);
    for(var key in attributes){
        element[key] = attributes[key];
    }
    return element;
}
function createSpan(textContent){
    var span = tag('span');
    span.textContent = textContent;//第一个数组 第二个数组 第三个数组
    span.className = 'text';
    return span;
}
function createButton(id){
    var button = tag('button');
        button.textContent = 'e';
        button.id = id;
        button.onclick = function(xyz){
            var button2 = xyz['target'];
            var img2 = button2.previousSibling;
            //获取当前的id
            var key = button2['id'];
            //用户输入一个网址
            var web = prompt('请输入一个网址：');
            //将原来的hash给替换掉
            hash[key] = web;
            img2.src = 'http://' + web + '/favicon.ico';
            xyz.target.src = './image/dot.png';
            localStorage.setItem('zzz',JSON.stringify(hash));
        }
    return button;
}
function createImage(domain){//hash[row[index2]]
    var img = tag('img');
    if(domain){
        img.src = 'http://' + domain + '/favicon.ico';
    }else{
        img.src = './image/dot.png';
    }
    img.onerror = function(xyz){
        xyz.target.src = './image/dot.png';
    }
    return img;
}
