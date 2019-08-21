
function progress(){
    $('.progress').remove();
    $('.main-cont').prepend('<div class="progress"><div class="progress-bar  bar" id="progress" role="progressbar" style="width: 0%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div><i class="fa fa-clock-o" aria-hidden="true"></i></div>')
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
}


function beforeQuestion(){
  $("#count_num").slideDown();
  $(function(){
var timer = setInterval(function(){
$("#count_num").html(function(i,html){

if(parseInt(html)>0)
   {
   return parseInt(html)-1;
   }
   else
   {
   clearTimeout(timer);
       //$("#count_num").slideUp();
   }
 });

},1000);



});
}
var questionType="";
var quizId=2069;
var questionNumber=1;
beforeQuestion();
$('document').ready(function(){
    progress();
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
              setTimeout(function(){
                    progress();
              },1500);


                var type=data.question.questionTypeId ;
                questionType=type;
                var answersLength=data.question.answer.length;

                $('.answers-cont').hide();
                $('.qTotal').text(data.noOfQuestion  );
                $('.qNumber').text(data.question.questionOrder  );
                $('.question').text(data.question.questionData  );

                if(type==1){
                        //select all that applies
                        $('.multi-select').show();
                         $('.multi .answers').html('');
                        var width=12/answersLength;
                        for(var i=0;i<answersLength;i++){
                            $('.multi .answers').append('<div class="col-md-'+width+' col-sm-12"><div class="ans a'+(i+1)+'"><label><input id="'+data.question.answer[i].answerId+'" type="checkbox" name="checkbox" value=""><span>'+data.question.answer[i].correctAnser+'</span></label></div></div>');
                        }
                    $('.question').attr('id',data.question.questionId  );
                } else if(type==2){
                    //fill in the blank
                    $('.fill').show();
                    $('.question').wrapInner( "<span class='part1'></span>");
                    $('.question').append($('<input id="fill"/>'));
                    $('.question').append($('<span class="part2">'+data.question.assginQuastion+'</span>'));
                    $('.question').attr('id',data.question.questionId  );

                } else if (type==3){
                  // true or false
                    $('.option').removeClass('correct-ans').removeClass('selected');
                    $('.question').attr('id',data.question.questionId  );
                    $('.truefalse').show();
                }else if (type==4){
                    $('.sorting').show();
                    for(var i=0;i<answersLength;i++){
                      $('.sorting #sorted2').append('<li class="sorted'+i+'"><span>'+(i+1)+'</span></li>');
                      $('.sorting #sortable2').attr('id'+[i]+'',data.question.answer[i].answerId);
                      $('.sorting #sortable2').append('<li  id="'+data.question.answer[i].answerId+'" class="ui-state-default sortable'+i+'"><span class="ui-icon ui-icon-arrowthick-2-n-s">'+data.question.answer[i].correctAnser+'</span></li>');
                    }



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
        $('.submit').removeAttr('disabled');

    }


    getQuestion(quizId,questionNumber);
    function checkAnswer(token,answers,qId){
        if(questionType==1){


        $.ajax({

            type: "POST",
            url: "http://api.sawdreamhome.com/api/question/getResultForQuestion",
            beforeSend : function( xhr ) {
                xhr.setRequestHeader( 'Authorization', 'Bearer  ' + token );
                xhr.setRequestHeader('content-type', "application/json")},
            data: JSON.stringify({
                "QuestionID":$('.question').attr('id'),"AnswerIDS": answers
            }),
            crossDomain: true,
            contentType: "application/json; charset=utf-8",
            success: function(data){
                questionNumber++;
                showResult(data);



            }
        });
    }else if(questionType==2 ){

        //fill in the blanks
        $.ajax({
            type: "POST",
            url: "http://api.sawdreamhome.com/api/question/getResultForQuestion",
            beforeSend : function( xhr ) {
                xhr.setRequestHeader( 'Authorization', 'Bearer  ' + token );
                xhr.setRequestHeader('content-type', "application/json")},
            data: JSON.stringify({
                "QuestionID":$('.question').attr('id'),
                "CorrectAnswer": $('.part1').text()+" "+$('#fill').val()+" "+$('.part2').text()
            }),
            crossDomain: true,
            contentType: "application/json; charset=utf-8",
            success: function(data){

                questionNumber++;
                 //sortResults(data)

                  getQuestion(quizId,questionNumber);
                  sortResults(data);
            }
        });

    }else if(questionType==3){
      //true or false
      $.ajax({
          type: "POST",
          url: "http://api.sawdreamhome.com/api/question/getResultForQuestion",
          beforeSend : function( xhr ) {
              xhr.setRequestHeader( 'Authorization', 'Bearer  ' + token );
              xhr.setRequestHeader('content-type', "application/json")},
          data: JSON.stringify({
              "QuestionID":$('.question').attr('id'),
              "isCorrect":answers
          }),
          crossDomain: true,
          contentType: "application/json; charset=utf-8",
          success: function(data){

                sortResults(data,questionType);
          }
      });
    }else if(questionType==4 || questionType==5){
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

                 sortResults(data)
  questionNumber++;
                  getQuestion(quizId,questionNumber);
            }
        });
    }
    }
    function getToken(answer,id,keyword){
        $.ajax({
            type: "POST",
            url: "http://api.sawdreamhome.com/api/user/login",
            contentType: "application/json; charset=utf-8",

            data: JSON.stringify({
                "Username":"test","Password":"albeir4321"
            }),

            success: function(data){
                checkAnswer(data.tokenKey,answer,id,keyword)
            }
        });



    }
    function sortResults(data,type){

        $('.result').fadeIn();
        if(data.data.result){
            var random = correct[Math.floor(Math.random()*correct.length)]

            $('.result .correct .word').text(random);
            $('.result .correct').show();
            $('.result .sorry').hide    ();
            setTimeout(function(){
                $('.result').slideUp();
                if (type==3){
                  questionNumber++;
                  getQuestion(quizId,questionNumber);
                }
            },2000);

        }else{
            $('.result .sorry').show();
            $('.result .correct').hide();
            if(type==3){

              //true or False
              $('.truefalse .option').each(function(){
                if($(this).hasClass('selected')){

                }else{
                    $(this).addClass('correct-ans');

                                    setTimeout(function(){
                                          questionNumber++;
                                          getQuestion(quizId,questionNumber);
                                        },3000);
                }

              });

            }
            setTimeout(function(){
                $('.result').slideUp();


            },2000);


        }
    }
    function showResult(data){
        $('.result').fadeIn();
        if(data.data.result){
            var random = correct[Math.floor(Math.random()*correct.length)]

            $('.result .correct .word').text(random);
            $('.result .correct').show();
            $('.result .sorry').hide    ();
            setTimeout(function(){
                $('.result').slideUp();
                getQuestion(quizId,questionNumber);
            },2000);

        }else{
            $('.result .sorry').show();
            $('.result .correct').hide();
            setTimeout(function(){
                $('.result').slideUp();
                var correctAnsers=data.data.answerIDS.split(',');
                for (var i=0;i<correctAnsers.length;i++){
                    $('#'+correctAnsers[i]).parents('.ans').addClass('correct-ans');

                }
                setTimeout(function(){
                getQuestion(quizId,questionNumber);
            },3000);
            },2000);


        }
    }
    function formAnswers(questionType){
        id=$('.question').attr('id');
        var answer="";
        var keyword;
        if(questionType==1){
            $('.ans input').each(function(){
                if ($(this).is(':checked')){
                    answer=answer+$(this).attr('id')+",";
                }
            });
            answer=answer.slice(0,-1)
            getToken(answer,id);
        }else if (questionType==2){
            //fill in the blanks
            getToken("",id);

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
          keyword="QuestionLst";
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
            keyword="QuestionLst";
            getToken(questionList,id);

        }
    }
    $('.submit').click(function(){
        $(this).attr('disabled','disabled')
        formAnswers(questionType);
        $('.progress').css('width', '0%').attr('aria-valuenow', 0);

    });
    $('.truefalse .option').click(function(){
      $('.progress').css('width', '0%').attr('aria-valuenow', 0);
      $(this).addClass('selected');
      if($(this).hasClass('true')){
        getToken('true');
      }else{
        getToken('false');
      }
    });

});
