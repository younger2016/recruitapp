// Zepto nextAll prevAll
!function(n){var t={nextAll:function(t){for(var e=n(),r=this.next();r.length;)(void 0===t||r.is(t))&&(e=e.add(r)),r=r.next();return e},prevAll:function(t){for(var e=n(),r=this.prev();r.length;)(void 0===t||r.is(t))&&(e=e.add(r)),r=r.prev();return e}};n.extend(n.fn,t)}(Zepto);

//!(function(){
    var $body = $("body"), $pages = $(".page"),
        clientHeight = document.documentElement.clientHeight,
        startX = 0, startY,
        pointDis = 50,
        $nowPage, nowPage, nowPageScrollSpace;
    function showPage(step){
        if(step == 0) return;

        var $page = $nowPage[step > 0 ? "nextAll" : "prevAll"](".page").eq(0);
        if(!$page.length) return;
        location.hash = $page.attr("r_href");
    }
    function hashChange(){
        var hash = location.hash.replace("#", "");
        if(!hash) hash = "index";
        var isNowPage = false;
        for (var i = 0, len = $pages.length; i < len; ++i) {
            var _$page = $pages.eq(i);

            if (_$page.attr("r_href") == hash) {
                isNowPage = true;
                $nowPage = _$page.removeClass("prev next").addClass("on");
            }
            else{
                if(isNowPage) _$page.removeClass("on prev").addClass("next");
                else _$page.removeClass("on next").addClass("prev");
            }
            _$page.find(".nextTips").addClass("hide");
        }
        nowPage = $nowPage[0];
        nowPageScrollSpace = nowPage.scrollHeight - clientHeight;
    }

    $body.on("touchstart", function(e){
        var touch = e.touches[0];
        startX = touch.pageX;
        startY = touch.pageY;
    });
    $body.on("touchmove", function(e){
        var nowY = e.changedTouches[0].pageY;
        if(nowPage.scrollTop >= nowPageScrollSpace && startY - nowY > 0 || // 判断是否为底
            nowPage.scrollTop <= 0 && nowY - startY > 0){ // 判断是否为顶
            e.preventDefault();
            e.stopPropagation();
        }
    });
    $body.on("touchend", function(e){
        var nowY = e.changedTouches[0].pageY;
        if(startY - nowY > pointDis && nowPage.scrollTop >= nowPageScrollSpace){
            if($nowPage.find(".nextTips").hasClass("hide")){
                $nowPage.find(".nextTips").removeClass("hide");
            }else{
                showPage(1);
            }
        }else if(nowY - startY > pointDis && nowPage.scrollTop <= 0){
            showPage(-1);
        }
    });

    window.onhashchange = hashChange;
    hashChange();
//})();