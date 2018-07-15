let apiKey = "yqPpOj1TU0OCngbVMgFVRRdsnSyudrpx";
let searchTerm = "";
let searchTermArray = ["Apple",
    "Bannana",
    "Coconut",
    "Durian",]

let addButton = function (text) {
    if (text) {
        let newButton = $("<div>");
        newButton.addClass("card d-inline-block pr-5");
        let searchButton = $("<div>")
        searchButton.attr({
            "data-searchTerm": text,
            "data-offset": "0",
            class: "btn btn-info gif-button",
        });
        searchButton.text(text);
        let closeButton = $("<div>");
        closeButton.addClass("btn btn-light text-dark float-right close-button");
        closeButton.text("X");
        newButton.append(searchButton, closeButton);
        $("#gif-buttons-div").append(newButton);
    }
};

let appendGifs = function (gifs) {
    gifs.data.forEach(function (e) {
        let imgURL = e.images.fixed_height_still.url;
        let gif = $("<img>").attr({
            "data-still": e.images.fixed_height_still.url,
            "data-animated": e.images.fixed_height.url,
            "data-rating": e.rating,
            src: imgURL,
            class: "giphy-gif",
        });
        let imageDiv = $("<div>");
        imageDiv.addClass("d-inline-block");
        let closeButton = $("<div>");
        closeButton.addClass("btn btn-light text-dark float-right close-button");
        closeButton.text("X");
        let rating = $("<div>");
        rating.text("Rating: " + e.rating);
        rating.addClass("text-left");
        imageDiv.append(rating, closeButton, gif);
        imageDiv.addClass("card p-4");
        $("#giphy-gifs-div").prepend(imageDiv);
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
    searchTermArray.forEach(function (e) { addButton(e) });
    $("#clear-gifs-button").click(function () {
        $("#giphy-gifs-div").empty();
        $(".gif-button").attr("data-offset", 0);
    });
    $("#clear-buttons-button").click(function () {
        $("#gif-buttons-div").empty();
    });
    $("#add-buttons-button").click(function () {
        event.preventDefault();
        addButton($("#button-text").val());
    });


    $(document.body).on("click", ".gif-button", function (e) {
        offset = e.target.dataset.offset;
        e.target.dataset.offset = parseInt(e.target.dataset.offset) + 10;
        searchTerm = e.target.dataset.searchterm;
        let queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + searchTerm + "&limit=10&offset=" + offset;
        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (response) {
            appendGifs(response);
            clickableGifs();
        });
    });

    $(document.body).on("click", ".close-button", function (e) {
        $(this).parent().remove();
    });
});





