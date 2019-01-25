$(function() {
  $("#sections").on("change", function() {
    var sectionName = $(this).val();

    //if value=null  return
    //  show loading
    //clear stories
    $('.placeHolder').empty();
    //make ajax request
    $.ajax({
      method: "GET",
      url:
        "https://api.nytimes.com/svc/topstories/v2/" +
        sectionName +
        ".json?api-key=o64EGq5PWtGS9Lp9oAji4kjH9pA2sNdR",
      dataType: "json"
    })
      .done(function(data) {
        //append all the things
        //1.filter data (12 articles with img)
        //2.creat .each
        
        //3.const for url title link
        //4.make html
        //5.append
        var index;
        for (index in data.results.slice(0,12)) {
        //   $(".sectionContent").append('<p>'+data.results[index].title+'</p>');
          $(".sectionContent").append('<div class="item"><img src="'+data.results[index].multimedia[4].url+'"><p>'+data.results[index].abstract+'</p></div>');
          
        }
      })
      .fail(function() {
        console.log("error");
      })
      .always(function() {
        //hide loader
      });
  });
});
//api key
//o64EGq5PWtGS9Lp9oAji4kjH9pA2sNdR

//Problem : retrieve content from the NYT top stories API and add it our site

//error response

//1.listen for menu change

//1b.show loading

//2.send request to NYT base on menu change

//3.if success, apend to DOM

//4.if unsuccess, show helpful to user

//5.hide the loader
