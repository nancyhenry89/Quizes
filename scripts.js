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
           $('.qTotal').text(data.noOfQuestion  );
           $('.qNumber').text(data.question.questionOrder  );
           $('.question').text(data.question.questionData  );
           $('.a1 span').text(data.question.answer[0].correctAnser  );
           $('.a2 span').text(data.question.answer[1].correctAnser  );
           $('.a3 span').text(data.question.answer[2].correctAnser  );
           $('.a4 span').text(data.question.answer[3].correctAnser  );
        }
      });
     
      function getToken(){

        $.ajax({
            type: "POST",
            url: "http://api.sawdreamhome.com/api/user/login",
            data: JSON.stringify({
                "Username": "test",
                "Password": "albeir4321"
              }),
              dataType: 'json',
            success: function(response){

            }
          });


          
      }
      getToken();
});