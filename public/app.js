angular.module('myApp', [])
angular.module('myApp').controller('myController', function ($scope) {

  $scope.players = [];

  $scope.winScore = 0;

  $scope.round = 1;
  
  $scope.turn = -1;

  $scope.questions = [];

  $scope.answers = [];

  //cool intro
  $(document).ready(function(){
    $("#topTron").slideDown(function(){
      $("#topText").fadeToggle(function(){
        $("#botTron").fadeToggle(function(){
          $("#instr").fadeToggle(2000) ;
        });
      });
    });
  });

  //Home screen button press
  $("#newgamebtn").click(function(){
    $("#newgamebtn").attr("disabled", true);
    $("#titlescreenbot").fadeToggle(function(){
      $("#playersignup").fadeToggle(100);
      $("#gamesetuptitle").slideDown();
    });
  });

  //Add a player to the player list
  $scope.addPlayer = function(){
    var newPlayer = $('#playersignupinput').val().trim();
    var isNewName = true;
    //disallow duplicate names
    //TODO: show a warning to user
    for (var i = $scope.players.length - 1; i >= 0; i--) {
      if($scope.players[i].name == newPlayer){
        isNewName = false;
      };
    };
    //add to player list and prepare for the next user
    if(newPlayer != '' && isNewName){
      $scope.players.push({name:newPlayer,"score":0})
      $("#playersignupinput").val('');
      if($scope.players.length==3){
        $("#playerreq").fadeToggle(function(){
          $('#gamestartbtn').fadeIn();
        });
      };
    };
  };

  //Remove an already added player from the list
  $scope.removePlayer = function(i){
    $scope.players[i]
    $scope.players.splice(i, 1);
    if($scope.players.length==2){
      $('#gamestartbtn').fadeOut(function(){
        $("#playerreq").fadeToggle();
      });
    };
  };

  //player creation input using enter key
  $scope.enternewplayer = function(event){
    if (event.which == 13) {
      $scope.addPlayer();
    };
  };

  //Once all players are added, NEXT button press
  $scope.startgame =function(){
    $scope.winScore = 2 * ($scope.players.length-1);
    $("#gamestartbtn").attr("disabled", true);
    $("#gamesetuptitle").slideToggle(function(){
      $("#gamereadytitle").slideToggle();
    });
    $('#playersignup').fadeToggle(function(){
      //show score to win and score table
      $("#playertablewrapper").fadeToggle();
    });
  };

  //Table NEXT button press
  $("#tablenext").click(function(){
    if($scope.turn-1==$scope.players.length){
      //TODO: check win at round end
      $scope.round++;
      $scope.turn==0;
      $scope.$apply();
    }else{
      $scope.turn++;
      $scope.$apply();
    };
    $("#tablenext").attr("disabled", true);     
    $("#helpbutton").fadeIn(3000);

    //preparing next screen
    $('#askquestioninput').prop('disabled', false);
    $('#askquestioninput').val('');
    $('#askquestionnext').hide();
    //unlock icon
    var lockbtn = document.getElementById('askquestionbtn');
    lockbtn.style.background = "rgba(0,220,0,1)";
    lockbtn.locked = false;
    lockbtn.innerHTML = '<i class="material-icons" style="font-size:18px">lock_open</i>';
    lockbtn.disabled = false;

    $("#playertablewrapper").fadeToggle(function(){
      $("#questionaskwrap").fadeToggle();
      if(($('#gameroundtitle').css('display') == 'none')){
        $("#gameroundtitle").slideToggle();
      };
    });
    if(!($('#gamereadytitle').css('display') == 'none')){
      $('#gamereadytitle').slideToggle();
    };
  });  

  //Help menu button press
  $scope.showHelpMenu = function(){
    $("#playertabletoggle").slideToggle();
  };

  //lock in question, or unlock
  $scope.askQuestion = function(event){
    if($('#askquestioninput').val() != ''){
      if($('#askquestioninput').val().substr($('#askquestioninput').val().length-1)=="?"){
        btn_clicked=event.currentTarget;
        var questionInput = $(btn_clicked).closest('h3').find('input')
        if(btn_clicked.locked==undefined||btn_clicked.locked==false){
          btn_clicked.style.background = "red"
          btn_clicked.locked = true;
          $('#askquestionnext').prop("disabled",false)
          $("#questionreq").fadeOut(function(){
            $('#askquestionnext').fadeToggle();
          });
          btn_clicked.innerHTML = '<i class="material-icons" style="font-size:18px">lock</i>';
          questionInput.prop("disabled", true);
        }else{
          btn_clicked.style.background = "rgba(0,220,0,1)";
          btn_clicked.locked = false;
          $('#askquestionnext').prop("disabled",true);
          $('#askquestionnext').fadeToggle();
          btn_clicked.innerHTML = '<i class="material-icons" style="font-size:18px">lock_open</i>';
          questionInput.prop("disabled", false);
        };
      }else{
        $("#questionreq").fadeIn();
      };
    };
  };

  //Once question is locked in NEXT button press
  $scope.submitQuestion = function(){
    $("askquestionnext").attr("disabled", true);
    $("#askquestioninput").attr("disabled", true);
    $("#askquestionbtn").attr("disabled", true);
    $scope.questions.push({value:$('#askquestioninput').val(),askedBy:$scope.players[$scope.turn].name})

    //prepare next screen
    //reset all inputs
    var answers = $('#questionrespondwrap').find('input');
    answers.val('')
    answers.prop('disabled',false)
    answers.attr('type', 'text'); 
    //set all locks to unlock
    var lockbtn = $('#questionrespondwrap').find('.lock-button');
    console.log(lockbtn)
    lockbtn.css({'background-color':"rgba(0,220,0,1)"})
    lockbtn.locked = false;
    lockbtn.html('<i class="material-icons" style="font-size:18px">lock_open</i>')
    lockbtn.prop('disabled',false)
    //hide next button
    $('#responseNext').hide();

    $("#questionaskwrap").fadeToggle(function(){
      $("#respondwrap").fadeToggle();
      $("#roundquestiontitle").slideToggle();
      $("#questionrespondwrap").fadeToggle();
    });
  };

  //lock in for player responses
  $scope.addAnswer = function(event){
    //check if all answers are locked in (before and after changing the lock)
    var areAnswersSubmitted = function(){
      var answers = $('#questionrespondwrap').find('input');
      //returns true if everyone has responded
      if(answers.length==answers.filter(":disabled").length){
          $('#responseNext').fadeToggle()
          $('#responseNext').prop('disabled', function(i, v) { return !v; });
      };
    };

    areAnswersSubmitted();
    btn_clicked=event.currentTarget;
    var answerInput = $(btn_clicked).closest('h3').find('input');
    if(answerInput.val()!=''){
      if(btn_clicked.locked==undefined||btn_clicked.locked==false){
        btn_clicked.style.background = "red"
        btn_clicked.locked = true;
        $('#askquestionnext').prop("disabled",false);
        $("#questionreq").fadeOut(function(){
          $('#askquestionnext').fadeToggle();
        })
        btn_clicked.innerHTML = '<i class="material-icons" style="font-size:18px">lock</i>';
        $(btn_clicked).toggleClass('locked');
        answerInput.prop("disabled", true);
        answerInput.attr('type', 'password'); 
      }else{
        btn_clicked.style.background = "rgba(0,220,0,1)"
        btn_clicked.locked = false;
        $('#askquestionnext').prop("disabled",true)
        $('#askquestionnext').fadeToggle()
        btn_clicked.innerHTML = '<i class="material-icons" style="font-size:18px">lock_open</i>';
        $(btn_clicked).toggleClass('locked');
        answerInput.prop("disabled", false);
        answerInput.attr('type', 'text');
      };
      areAnswersSubmitted();
    };
  };

  $scope.submitAnswers = function(){
    var answers = $('#questionrespondwrap').find('input')
    //for each answer input field, get the response
    /*
      [
       {
        name: (player), 
        a   : (answer)
       },
       {...},
       ...
      ]
    */
    //randomize the order to make guessing more difficult (make rendering angular easier!)
    //http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    function shuffleArray(array) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      };
      return array;
    };

    $('#responseNext').prop('disabled',true);
    var answersUnshuffled = []
    $('.response input').each(function(i,value){
      answersUnshuffled[i] = {name:$(this).attr('placeholder'),a:$(this).val()}
    })
    $scope.answers = shuffleArray(answersUnshuffled)
    $('#questionrespondwrap').fadeToggle(function(){
      $('#guesswrap').fadeToggle()
    });
  };

  $scope.guessQuestion = function(event,answer){
    //check if all answers are locked in (before and after changing the lock)
    var areGuessesSubmitted = function(){
      var guesses = $('#guesswrap').find('select');
      //returns true if everyone has responded
      if(guesses.length==guesses.filter(":disabled").length){
          $('#guessNext').fadeToggle()
          $('#guessNext').prop('disabled', function(i, v) { 
            return !v; 
          });
      };
    }

    btn_clicked=event.currentTarget;
    var guessfield = $(btn_clicked).closest('.guesses').find('select')
    if(guessfield.val()!=null){
      $(guessfield).prop("disabled", true);
      $(guessfield).css({"background-color":"lightgrey"});
      $(btn_clicked).prop("disabled", true);
      btn_clicked.innerHTML = '<i class="material-icons" style="font-size:18px">lock</i>';
      var guess = $(btn_clicked).closest('.guesses').find('select').val().trim();
      var actual = '';
      for (var i = $scope.answers.length - 1; i >= 0; i--) {
        if($scope.answers[i].a==answer){
          if($scope.answers[i].name==guess){
            //add point and show user success
            $scope.players[$scope.turn].score++;
            btn_clicked.style.background = "rgba(0,220,0,1)";
            btn_clicked.innerHTML = '<i class="material-icons" style="font-size:18px">check</i>';
          }else{
            //fail            
            btn_clicked.innerHTML = '<i class="material-icons" style="font-size:18px">close</i>';
            btn_clicked.style.background = "red";
          };
          areGuessesSubmitted();
        };
      };
    };
  };

  $scope.endTurn = function(){
    $('#guessNext').prop('disabled', function(i, v) { 
      return !v; 
    });
    $('#roundquestiontitle').slideToggle();
    $('#guesswrap').fadeToggle(function(){
      $('#playertablewrapper').fadeToggle();
      $('#tablenext').prop('disabled', false);
    });
  };
});