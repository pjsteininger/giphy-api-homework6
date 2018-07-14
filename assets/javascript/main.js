
let apiKey = "yqPpOj1TU0OCngbVMgFVRRdsnSyudrpx";
let searchTerm = "";

let appendGifs = function (gifs) {
    gifs.data.forEach(function (e, i) {
        let imgURL = e.images.original.url;
        let gif = $("<img>").attr({
            src: imgURL,
            class: "giphy-gif",
        });
        $("#giphy-gifs-div").append(gif);
    });
};


$(document).ready(function () {



    $(document.body).on("click", ".gif-button", function (e, i) {
        searchTerm = e.target.dataset.animal;
        console.log(searchTerm);
        let queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + searchTerm + "&limit=10";
        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (response) {
            appendGifs(response);
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






