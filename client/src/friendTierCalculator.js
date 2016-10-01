module.exports = {

  friendTierCalculator: function(videoChatCount, textChatCount, dateLastChat) {
    var countScore;
    var dateScore;

    if (dateLastChat === null) {
      return 2;
    }


    var currentDate = new Date();
    var timeDiff = Math.abs(currentDate.getTime() - dateLastChat.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 

    if (diffDays > 180) {
      dateScore = -9999;
    } else if (diffDays > )


    var totalScore = dateScore + countScore;


  }


};