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
var questionType=4;
var quizId=2069;
var questionNumber=1;
$('document').ready(function(){
    $( "#sortable" ).sortable();
    $( "#sortable" ).disableSelection();
    $( "#sortable2" ).sortable();
    $( "#sortable2" ).disableSelection();
    var correct=["Excellent","Great","Awesome","Amazing", "Super", "Fantastic","Nice job","Brilliant","Wonderful"]
    function getQuestion(quizId,questionNumber){
        $.ajax({
            type: "GET",
            crossDomain: true,
            url: "http://api.sawdreamhome.com/api/Question/GetQuestionByCategoryAndQuestionNo/"+quizId+"/"+questionNumber+"",
            success: function(data){
                var type=data.question.questionTypeId ;
                var answersLength=data.question.answer.length;
                $('.answers-cont').hide();
                $('.qTotal').text(data.noOfQuestion  );
                $('.qNumber').text(data.question.questionOrder  );
                $('.question').text(data.question.questionData  );
                if(type==1){
                  debugger;
                    $('.multi-select').show();

                    $('.a1 span').text(data.question.answer[0].correctAnser  );
                    $('.a2 span').text(data.question.answer[1].correctAnser  );
                    $('.a3 span').text(data.question.answer[2].correctAnser  );
                    $('.a4 span').text(data.question.answer[3].correctAnser  );

                    $('.a1 input').attr('id',data.question.answer[0].answerId  );
                    $('.a2 input').attr('id',data.question.answer[1].answerId  );
                    $('.a3 input').attr('id',data.question.answer[2].answerId  );
                    $('.a4 input').attr('id',data.question.answer[3].answerId  );

                    $('.question').attr('id',data.question.questionId  );
                }  else if (type==4){
                    $('.sorting').show();
                    for(var i=0;i<answersLength;i++){
                      $('.sorting #sorted2').append('<li class="sorted'+i+'"><span>'+(i+1)+'</span></li>');
                      $('.sorting #sortable2').attr('id'+[i]+'',data.question.answer[i].answerId);
                      $('.sorting #sortable2').append('<li  id="'+data.question.answer[i].answerId+'" class="ui-state-default sortable'+i+'"><span class="ui-icon ui-icon-arrowthick-2-n-s">'+data.question.answer[i].correctAnser+'</span></li>');
                    }
                    $('#sorted2 li').attr('style','width : calc(100% / '+answersLength +' - 40px)');
                    $('#sortable2 li').attr('style','width : calc(100% / '+answersLength +' - 40px)')


                    $('.question').attr('id',data.question.questionId  );
                }else if (type==5){
                    $('#sorted .sorted0').text(data.question.answer[0].orginalAnswer  );
                    $('#sorted .sorted1').text(data.question.answer[1].orginalAnswer  );
                    $('#sorted .sorted2').text(data.question.answer[2].orginalAnswer  );
                    $('#sorted .sorted3').text(data.question.answer[3].orginalAnswer  );
                    $('#sortable').attr('id1',data.question.answer[0].answerId).attr('id2',data.question.answer[1].answerId ).attr('id3',data.question.answer[2].answerId ).attr('id4',data.question.answer[3].answerId )
                    $('#sortable .sortable0').text(data.question.answer[0].orginalAnswer2  )
                    $('#sortable .sortable1').text(data.question.answer[1].orginalAnswer2  )
                    $('#sortable .sortable2').text(data.question.answer[2].orginalAnswer2  )
                    $('#sortable .sortable3').text(data.question.answer[3].orginalAnswer2  )


                    $('.question').attr('id',data.question.questionId  );
                }

            }
        });
    }


    getQuestion(quizId,questionNumber);
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
                "QuestionID":$('.question').attr('id'),
                "QuestionLst": answers
            }),
            crossDomain: true,
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
                questionNumber++;

                  getQuestion(quizId,questionNumber);
            }
        });
    }
    function getToken(answer,id){
        $.ajax({
            type: "POST",
            crossDomain: true,
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
        }else if(questionType==4){
          var questionList=[
              {
                    "answerId":   $('#sortable2 li:nth-of-type(1)').attr('id'),

                    "orderAnswer": $('#sortable2 li:nth-of-type(1)').index()+1

              },
              {
                "answerId":   $('#sortable2 li:nth-of-type(2)').attr('id'),

                "orderAnswer": $('#sortable2 li:nth-of-type(2)').index()+1

              }
          ];
          getToken(questionList,id);

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
