
;(function(w, d){

    return w.entrance = function(p, c){

        var animationName = " join-animation",                      // 入场动画的 类名( 如果是其他类名的就改为你的 )
            parents = d.getElementsByClassName(p),                  // 所有入场动画的 wrapper
            pl = parents.length,
            wH = w.innerHeight,                                     // 浏览器的高度
            sT = d.body.scrollTop || d.documentElement.scrollTop,   // 初始化时候浏览器卷去的高度

            coT,                                                    // 遍历时候用的变量

            initialize = true,                                      // 用户判断是否是初始化的

            parentOffsetTop = [],                                   // 所有入场动画 wrapper 的顶部偏移量
            childObjects = {},                                      // 存储了每个入场动画 wrapper 的对象
            i = 0,                          // 遍历时候用的变量
            j = 0,                          // 遍历时候用的变量
            co,                             // 用于遍历时候获取单个入场动画 wrapper 的顶部偏移量
            childes,                        // 单个入场动画 wrapper 里面的所有要展示入场动画的元素
            cl,                             // 单个入场动画 wrapper 里面的所有要展示入场动画的元素的长度
            delChild = []                   // 展示入场动画之后要删除的元素（也就是显示入场动画之后把 parentOffsetTop 里面的该元素的顶部偏移量去掉）
        ;

        // 取得所有入场动画的 wrapper 的 offsetTop
        for(i = 0; i < pl; i++){
            coT = parents[i].offsetTop;
            parentOffsetTop.push(coT);
            childObjects["o"+coT] = parents[i];
            childObjects["oH"+coT] = parents[i].offsetHeight;
        }

        // 检测被卷去的高度
        function getJoinElement(s){
            delChild = [];
            for(i = 0; i < pl; i++){
                co = parentOffsetTop[i];
                if(co<s){
                    if((co+childObjects["oH"+co])>=s){
                        childes = childObjects["o"+co].getElementsByClassName(c);
                        cl = childes.length;
                        for(j = 0;j < cl; j++){
                            childes[j].className = childes[j].className + animationName;
                        }
                        delChild.push(i);
                    }
                }else if(co<s+wH){
                    console.log(3);
                    childes = childObjects["o"+co].getElementsByClassName(c);
                    cl = childes.length;
                    for(j = 0;j < cl; j++){
                        childes[j].className = childes[j].className + animationName;
                    }
                    delChild.push(i);
                }
            }
            // 删除加了动画的 wrapper
            for(i = 0; i< delChild.length; i++){
                parentOffsetTop.splice(delChild[i], 1);
            }
            console.log("还剩下 " + parentOffsetTop.length + " 个入场动画");
        }


        // 页面滚动
        w.onscroll = function(){
            if(!initialize && parentOffsetTop.length !== 0){
                sT = d.body.scrollTop || d.documentElement.scrollTop;       // 初始化时候浏览器卷去的高度
                getJoinElement(sT);
            }
        };

        // 初始化的处理
        setTimeout(function(){
            initialize = false;
            getJoinElement(sT);
        }, 20);

    };

})(window, document);






