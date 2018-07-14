
let apiKey = "yqPpOj1TU0OCngbVMgFVRRdsnSyudrpx";
let searchTerm = "";
let searchTermArray = ["Apple",
    "Bannana",
    "Coconut",
    "Durian",]

let addButton = function (text) {
    if (text) {
        console.log(text);
        let newButton = $("<div>").attr({
            "data-searchTerm": text,
            "data-offset": "0",
            class: "btn btn-info gif-button",
        });
        newButton.text(text);
        $("#gif-buttons-div").append(newButton);
    }
};

let appendGifs = function (gifs) {
    gifs.data.forEach(function (e, i) {
        console.log(e);
        let imgURL = e.images.fixed_height_still.url;
        let gif = $("<img>").attr({
            "data-still": e.images.fixed_height_still.url,
            "data-animated": e.images.fixed_height.url,
            src: imgURL,
            class: "giphy-gif",
        });
        $("#giphy-gifs-div").append(gif);
    });
};
let clickableGifs = function () {
    $(".giphy-gif").off("click");
    $(".giphy-gif").click(function () {
        if (this.src == this.dataset.still) {
            this.src = this.dataset.animated;
        } else {
            this.src = this.dataset.still;
        }

    });
}


$(document).ready(function () {
    searchTermArray.forEach(function(e) {addButton(e)});
    $("#clear-button").click(function () {
        $("#giphy-gifs-div").empty();
        $(".gif-button").attr("data-offset", 0);
    });
    $("#add-buttons-button").click(function () {
        event.preventDefault();
        addButton($("#button-text").val());
    });


    $(document.body).on("click", ".gif-button", function (e) {
        offset = e.target.dataset.offset;
        e.target.dataset.offset = parseInt(e.target.dataset.offset) + 10;
        searchTerm = e.target.dataset.searchterm;
        console.log(searchTerm);
        let queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + searchTerm + "&limit=10&offset=" + offset;
        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (response) {
            appendGifs(response);
            clickableGifs();
        });











    });
});
//https://api.giphy.com/v1/gifs/search?api_key=yqPpOj1TU0OCngbVMgFVRRdsnSyudrpx&q=cat&limit=10&offset=0&rating=R&lang=en
//appendGifs(response));
// window.onload = function() {
//     console.log("hello");
//     document.body.addEventListener("click", function () {
//         console.log("hello");
//     });
// };






