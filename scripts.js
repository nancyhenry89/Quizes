function countdown(callback) {
    var bar = document.getElementById('progress'),
    time = 1, max = 300,
    int = setInterval(function() {
        bar.style.width = Math.floor(100 * time++ / max) + '%';
        if (time - 1 == max) {
            clearInterval(int);
            // 600ms - width animation time
            callback && setTimeout(callback, 600);
        }
    }, 100);
}

countdown(function() {
   //question expired
});
$('document').ready(function(){
    $.ajax({
        type: "GET",
        crossDomain: true,
        url: "http://api.sawdreamhome.com/api/Question/GetQuestionByCategoryAndQuestionNo/2069/1",
        
        success: function(data){
           console.log(data);
        }
      });
});