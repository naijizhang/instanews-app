"use strict";

$(function () {
  // number of article required on each page
  var articleRequired = 12;
  $("loader").hide();
  $("#sections").on("change", function () {
    var sectionName = $(this).val(); //set body display to block

    $("body").addClass("resetBody"); //add new style to header

    $(".site-header").addClass("sectionHeader"); //if value=null  return 

    if (sectionName === "") {
      return console.log("null");
    } //  show loading


    $("loader").show(); //clear stories

    $(".sectionContent").empty(); //make ajax request

    $.ajax({
      method: "GET",
      url: "https://api.nytimes.com/svc/topstories/v2/" + sectionName + ".json?api-key=o64EGq5PWtGS9Lp9oAji4kjH9pA2sNdR",
      dataType: "json" //api key
      //o64EGq5PWtGS9Lp9oAji4kjH9pA2sNdR

    }).done(function (data) {
      //count for articles
      var numberOfArticles = 0; //creat for loop

      for (var index = 0; index < data.results.length; index++) {
        //filter data (12 articles with img)
        if (isImageEmpty(data.results[index].multimedia)) {
          continue;
        } else {
          numberOfArticles++; //count for articles which has img
          //const for url,title,link,abstract

          var _data$results$index = data.results[index],
              title = _data$results$index.title,
              abstract = _data$results$index.abstract,
              multimedia = _data$results$index.multimedia,
              link = _data$results$index.link; // const title= data.results[index].title,
          //   abstract = data.results[index].abstract,
          //   url = data.results[index].multimedia[4].url,
          //   link = data.results[index].url;
          // //make html
          // const html =
          //   "<div onclick=\"window.open('" +
          //   link +
          //   "','mywindow');\" class=\"item\" style='background-image:url(" +
          //   url +
          //   ")'><p>" +
          //   abstract +
          //   "</p></div>";
          //ES2015 style

          var html = "<div onclick=\"window.open('".concat(link, "','mywindow');\" class=\"item\" style=\"background-image:url(").concat(multimedia[4].url, ")\"><p>").concat(abstract, "</p></div>"); //append all the things

          $(".sectionContent").append(html); //check if the number of article fit the requirement break the loop(stop loading new articles)

          if (numberOfArticles === articleRequired) {
            break;
          }
        }
      }
    }).fail(function () {
      console.log("error");
    }).always(function () {
      //hide loader
      $("loader").hide();
    }); //check if the article has image.  (Empty --- 1; Has image --- 0)

    var isImageEmpty = function isImageEmpty(media) {
      if (media.length === 0) {
        return 1;
      } else {
        return 0;
      }
    };
  });
});