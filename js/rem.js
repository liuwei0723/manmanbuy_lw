//根据屏幕大小获取设置当前元素字体大小  页面加载之前引入
setNowFontSize();
function setNowFontSize() {
    var uiWidth = 750;
    var docFontsize = 200;
    var nowDocWidth = document.documentElement.offsetWidth; //当前文档宽度
    var nowFontSize = nowDocWidth/(uiWidth/docFontsize);
    document.documentElement.style.fontSize = nowFontSize+'px';
}
window.addEventListener('resize',setNowFontSize)