!function(){
    var clientHeight = document.documentElement.clientHeight,
        $roleList = $("#roleList"), roleListOffsetTop = $roleList.position().top,
        triggerRoleOn = roleListOffsetTop - clientHeight + clientHeight * 0.5;
    $(".page_train").on("scroll", function(){
        if(this.scrollTop > triggerRoleOn) $roleList.addClass("on");
    });
}();