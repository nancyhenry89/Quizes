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
var questionType=5;
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
                   $('#sortable').attr('id1',data.question.answer[0].answerId).attr('id2',data.question.answer[1].answerId ).attr('id3',data.question.answer[2].answerId ).attr('id4',data.question.answer[3].answerId )
                   $('#sortable .sortable1').text(data.question.answer[0].orginalAnswer2  )
                   $('#sortable .sortable2').text(data.question.answer[1].orginalAnswer2  )
                   $('#sortable .sortable3').text(data.question.answer[2].orginalAnswer2  )
                   $('#sortable .sortable4').text(data.question.answer[3].orginalAnswer2  )

        
                   $('.question').attr('id',data.question.questionId  );
                   
                }
              });
        }

    
        
    }

     getQuestion(questionType);
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
    "QuestionLst": answers
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
      function formAnswers(questionType){
        id=$('.question').attr('id');
        var answer="";
          if(questionType==1){ 

          $('.ans input').each(function(){
          if ($(this).is(':checked')){
               answer=answer+$(this).attr('id')+",";
          }
          });
          answer=answer.slice(0,-1)
          getToken(answer,id);
          }else if(questionType==5){
            var questionList=[
                {
                    "answerId":   $('#sortable').attr('id1'),
             
                    "correctAnser2": $('#sortable li:nth-of-type(1)').text()
            
                },
                {
                    "answerId": $('#sortable').attr('id2'),
          
                 
                    "correctAnser2":$('#sortable li:nth-of-type(2)').text()
        
                },
                {
                    "answerId":  $('#sortable').attr('id3'),
              
                    "correctAnser2": $('#sortable li:nth-of-type(3)').text()
                   
                },
                {
                    "answerId":  $('#sortable').attr('id4'),
            
                    "correctAnser2": $('#sortable li:nth-of-type(4)').text()
              
                }
            ];
            getToken(questionList,id);

          }
      }
$('.submit').click(function(){

    formAnswers(questionType);
});
      
});