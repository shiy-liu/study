$(function() {
    $(".search-change").click(function(e) {
        $("#search-change-dropdown").slideToggle();
        e.stopPropagation();
    });
    $("#search-change-dropdown>li").click(function() {
        $(".search-change>span").html($(this).html());
    });
    $(document).click(function() {
        $("#search-change-dropdown").slideUp();
    });
    $("#content-right .content-right-paihang .paihang li span").each(function(index) { $(this).addClass("no").html(index + 1); });
    $("#content-right .content-right-paihang .weibo li span").each(function(index) { $(this).addClass("no1").html(index + 1); });
    $("#content-right .content-right-paihang .resou li span").each(function(index) { $(this).addClass("no1").html(index + 1); });
})