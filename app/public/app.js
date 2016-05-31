$("#showContent").on('click', function() {
    $.get('/articles', function(data) {
        console.log(data[0].title);
        for (var i = 0; i < data.length; i++) {
        	console.log("in the for loop");

            $('.card-content').append('<p data-id="' + data[i]._id + '">' + data[i].title + '<br />' + data[i].content + '</p>');
        }
    });


});








$("#submitNotes").on('click', function() {

    var notes = $("#textarea1").val()
    alert(notes);
});

$("#deleteButton").on('click', function() {


});
