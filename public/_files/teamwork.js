!function(){
    var clientHeight = document.documentElement.clientHeight,
        $chartUser = $("#chartUser"), $chartPie = $("#chartPie"), $chartLines, $chartTopTips = $("#chartTopTips"),
        chartUserOffsetTop = $chartUser.position().top,
        chartPieOffsetTop = $chartPie.position().top,
        triggerChartUserOn = chartUserOffsetTop - clientHeight + $chartUser.height() - 50,
        triggerChartPieOn = chartPieOffsetTop - clientHeight + $chartPie.height() - 50;
    $(".page_teamwork").on("scroll", function(){
        if(this.scrollTop > triggerChartUserOn){
            $chartLines.each(function(i, ele){
                setTimeout(function(){
                    $(ele).addClass("on");
                    if(i == $chartLines.length - 1){
                        $chartTopTips.addClass("on");
                    }
                }, i * 100);
            });
        }
        if(this.scrollTop > triggerChartPieOn){
            $(".pie").addClass("on");
        }
    });

    /*
    // 这里直接把chartist.min.js生成的dom塞到html里面
    // 画图表
    var pieDefault = {
        donut: true,
        donutWidth: 10,
        total: 100,
        showLabel: false
    };
    new Chartist.Pie("#pieIOS", {
        series: [
            { value: 0, className: "pie_primary"},
            { value: 100, className: "pie_default"}
        ]
    }, pieDefault);
    new Chartist.Pie("#pieAndroid", {
        series: [
            { value: 40, className: "pie_primary"},
            { value: 60, className: "pie_default"}
        ]
    }, pieDefault);
    new Chartist.Pie("#pieWeb", {
        series: [
            { value: 73, className: "pie_primary"},
            { value: 27, className: "pie_default"}
        ]
    }, pieDefault);
    */

    // 画条形图
    var userData = {
        labels: [2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015],
        series: [
            {value: 1, className: "chart_primary chart_line chart_line1"},
            {value: 2, className: "chart_default chart_line chart_line2"},
            {value: 3, className: "chart_primary chart_line chart_line3"},
            {value: 4, className: "chart_default chart_line chart_line4"},
            {value: 5, className: "chart_default chart_line chart_line5"},
            {value: 6, className: "chart_default chart_line chart_line6"},
            {value: 7, className: "chart_default chart_line chart_line7"},
            {value: 8, className: "chart_primary chart_line chart_line8"},
            {value: 9, className: "chart_default chart_line chart_line9"},
            {value: 10, className: "chart_default chart_line chart_line10"},
            {value: 11, className: "chart_primary chart_strong chart_line chart_line11"}
        ]
    };
    new Chartist.Bar("#chartUser", userData, {
        distributeSeries: true,
        axisX:{
            labelInterpolationFnc: function(value) {
                switch(value){
                    case 2005:
                    case 2007:
                    case 2012:
                    case 2015:
                        return value;
                }
            }
        },
        axisY: {
            offset: 10,
            labelInterpolationFnc: function(value, index) {
                return index == 0 ? " " : null;
            }
        }
    }).on("draw", function(data) {
            if(data.type === "bar" && data.series.className.indexOf("chart_primary") > -1) {
                data.group.append(new Chartist.Svg("circle", {
                    cx: data.x2,
                    cy: data.y2,
                    r: 3
                }, "ct-slice-pie"));
                data.group.append(new Chartist.Svg("circle", {
                    cx: data.x2,
                    cy: data.y1,
                    r: 3
                }, "ct-slice-pie"));
            }
            if(data.type === "bar" && data.series.className.indexOf("chart_strong") > -1){
                $("#chartTopTips").css({
                    top: data.y2 - 11,
                    left: data.x2
                });
            }
    }).on("created", function () {
        $chartLines = $chartUser.find(".chart_line");
        $chartLines.each(function (i, ele) {
            var $ele = $(ele), $line = $ele.find("line"), height = $ele.height();
            $line.css({
                "stroke-dasharray": height + "px",
                "stroke-dashoffset": height + "px"
            });
        });
    });
}();