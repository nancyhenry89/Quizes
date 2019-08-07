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
    $( "#sortable" ).sortable();
    $( "#sortable" ).disableSelection();
    var correct=["Excellent","Great","Awesome","Amazing", "Super", "Fantastic","Nice job","Brilliant","Wonderful"]
        
    function getQuestion(type){
        if(type==1){
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
        
                   $('.a1 input').attr('id',data.question.answer[0].answerId  );
                   $('.a2 input').attr('id',data.question.answer[1].answerId  );
                   $('.a3 input').attr('id',data.question.answer[2].answerId  );
                   $('.a4 input').attr('id',data.question.answer[3].answerId  );
        
                   $('.question').attr('id',data.question.questionId  );
                   
                }
              });
        }else if (type==5){
            $('.matching').show();
            $.ajax({
                type: "GET",
                crossDomain: true,
                url: "http://api.sawdreamhome.com/api/Question/GetQuestionByCategoryAndQuestionNo/2069/18",
                
                success: function(data){
                   $('.qTotal').text(data.noOfQuestion  );
                   $('.qNumber').text(data.question.questionOrder  );
                   $('.question').text(data.question.questionData  );
                   $('#sorted .sorted1').text(data.question.answer[0].orginalAnswer  );
                   $('#sorted .sorted2').text(data.question.answer[1].orginalAnswer  );
                   $('#sorted .sorted3').text(data.question.answer[2].orginalAnswer  );
                   $('#sorted .sorted4').text(data.question.answer[3].orginalAnswer  );
        
                   $('#sortable .sortable1').text(data.question.answer[0].orginalAnswer2  ).attr('id',data.question.answer[0].answerId  );;
                   $('#sortable .sortable2').text(data.question.answer[1].orginalAnswer2  ).attr('id',data.question.answer[1].answerId  );;
                   $('#sortable .sortable3').text(data.question.answer[2].orginalAnswer2  ).attr('id',data.question.answer[2].answerId  );;
                   $('#sortable .sortable4').text(data.question.answer[3].orginalAnswer2  ).attr('id',data.question.answer[3].answerId  );;

        
                   $('.question').attr('id',data.question.questionId  );
                   
                }
              });
        }

    
        
    }

     getQuestion(5);
      function checkAnswer(token,answers,qId){
    /*    
        $.ajax({
            type: "POST",
            url: "http://api.sawdreamhome.com/api/question/getResultForQuestion",
            beforeSend : function( xhr ) {
                xhr.setRequestHeader( 'Authorization', 'Bearer  ' + token );
                    xhr.setRequestHeader('content-type', "application/json")},
            data: JSON.stringify({
                "QuestionID":qId,"AnswerIDS":answers
            }),
            contentType: "application/json; charset=utf-8",
            success: function(data){
                $('.result').fadeIn();
              if(data.data.result){
                var random = correct[Math.floor(Math.random()*correct.length)]

                $('.result .correct .word').text(random);
                $('.result .correct').show();
                $('.result .sorry').hide    ();
                setTimeout(function(){
                    $('.result').slideUp();
                },2000);
               
              }else{
                $('.result .sorry').show();
                $('.result .correct').hide();
                setTimeout(function(){
                    $('.result').slideUp();
                },2000);
                $('#'+data.data.answerIDS).parents('.ans').addClass('correct-ans');
              }
            }
          });
          
*/
$.ajax({
    type: "POST",
    url: "http://api.sawdreamhome.com/api/question/getResultForQuestion",
    beforeSend : function( xhr ) {
        xhr.setRequestHeader( 'Authorization', 'Bearer  ' + token );
            xhr.setRequestHeader('content-type', "application/json")},
    data: JSON.stringify({
        "QuestionID":"1101",
    "QuestionLst": [
                {
                    "answerId": 1327,
             
                    "correctAnser2": "3000 souls believed"
            
                },
                {
                    "answerId": 1328,
          
                 
                    "correctAnser2": "He showed wisdom in every word he said"
        
                },
                {
                    "answerId": 1329,
              
                    "correctAnser2": "He was ordered to go see the Ethiopian eunuch"
                   
                },
                {
                    "answerId": 1330,
            
                    "correctAnser2": "They were given to speak in tongues"
              
                }
            ]
    }),
    contentType: "application/json; charset=utf-8",
    success: function(data){
        $('.result').fadeIn();
      if(data.data.result){
        var random = correct[Math.floor(Math.random()*correct.length)]

        $('.result .correct .word').text(random);
        $('.result .correct').show();
        $('.result .sorry').hide    ();
        setTimeout(function(){
            $('.result').slideUp();
        },2000);
       
      }else{
        $('.result .sorry').show();
        $('.result .correct').hide();
        setTimeout(function(){
            $('.result').slideUp();
        },2000);
        $('#'+data.data.answerIDS).parents('.ans').addClass('correct-ans');
      }
    }
  });
    }
      function getToken(answer,id){
        $.ajax({
            type: "POST",
            url: "http://api.sawdreamhome.com/api/user/login",
            data: JSON.stringify({
                "Username":"test","Password":"albeir4321"
            }),
            contentType: "application/json; charset=utf-8",
            success: function(data){
                checkAnswer(data.tokenKey,answer,id)
            }
          });


          
      }
$('.submit').click(function(){
    id=$('.question').attr('id');
    var answer="";
    $('.ans input').each(function(){
    if ($(this).is(':checked')){
         answer=answer+$(this).attr('id')+",";
    }
    });
    answer=answer.slice(0,-1)
    getToken(answer,id);
});
      
});