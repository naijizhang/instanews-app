$(function() {
  const articleRequired = 12; // number of article required on each page

  $("loader").hide();
  $("#sections").on("change", function() {
    const sectionName = $(this).val();
    $("body").addClass("resetBody");
    $(".site-header").addClass("sectionHeader");
    //if value=null  return
    if (sectionName === "") {
      return console.log("null");
    }
    //  show loading
    $("loader").show();
    //clear stories
    $(".sectionContent").empty();
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
        //change body
        // display: flex;
        // flex-flow: column nowrap;
        // justify-content: space-between;

        var numberOfArticles = 0;
        //creat for loop
        for (var index = 0; index < data.results.length; index++) {
          //filter data (12 articles with img)
          if (isImageEmpty(data.results[index].multimedia)) {
            continue;
          } else {
            numberOfArticles++; //count for articles which has img
            //const for url title link
            const title = data.results[index].title,
              abstract = data.results[index].abstract,
              url = data.results[index].multimedia[4].url,
              link = data.results[index].url;
            //make html
            const html =
              "<div onclick=\"window.open('" +
              link +
              "','mywindow');\" class=\"item\" style='background-image:url(" +
              url +
              ")'><p>" +
              abstract +
              "</p></div>";
            //append all the things
            $(".sectionContent").append(html);
            //check if the number of article fit the requirement break the loop(stop loading new articles)
            if (numberOfArticles == articleRequired) {
              break;
            }
          }
        }
      })
      .fail(function() {
        console.log("error");
      })
      .always(function() {
        //hide loader
        $("loader").hide();
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

function isImageEmpty(media) {
  if (media.length == 0) {
    return 1;
  } else {
    return 0;
  }
}
