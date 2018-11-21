$(document).ready(function (voting) {
    var counter = 0;
    $("#plus").click(function () {
        counter++;
        $("#count").text(counter);

    });
    $("#minus").click(function () {
        counter--;
        $("#count").text(counter);
    });
    console.log(counter);
    // rating.on('click', ajaxRating);
    var vote = $("#count").text(counter);
    var btn = $('btn');

    function voting() {
        $.ajax({
            type: 'post',
            url: '/voting',
            data: {
                vote: vote.val(),
            },
            success: function (data) {

                console.log("Vote done")

            }
        })

    }
    btn.click(function (e) {

        voting();
    })



});

$(document).ready(function () {

    var modal = document.getElementById('myModal');

    // Get the button that opens the modal
    var btn = document.getElementById("add_btn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 
    btn.onclick = function () {
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});