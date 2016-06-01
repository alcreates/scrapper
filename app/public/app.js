var i = 0



$("#showContent").on('click', function() {
    $.get('/articles', function(data) {
        

            $('.card-content').html('<p id="articleContent" data-id="' + data[i]._id + '">' + '<b>' +data[i].title + '</b>' +'<br />' + data[i].content + '</p>');
            // we also need to populate notes if they are attached	

            i += 1
    });
    console.log(i)

});

// creates note application when notes button is pressed. 

$('#notesButton').on( "click",function() {
  var thisId = $("#articleContent").attr('data-id');
  $('#notes').empty();
 $.ajax({
    method: "GET",
    url: "/articles/" + thisId,
  })
    .done(function( data ) {
      console.log(data);
      $('#notes').append('<h2>' + data.title + '</h2>');
      $('#notes').append('<input id="titleinput" name="title" >');
      $('#notes').append('<textarea id="bodyinput" name="body"></textarea>');
      $('#notes').append('<button data-id="' + data._id + '" id="savenote">Save Note</button>');

      if(data.note){
        $('#titleinput').val(data.note.title);
        $('#bodyinput').val(data.note.body);
      }
    });



  //   $.ajax({
  //   method: "POST",
  //   url: "/articles/" + thisId,
  //   data: {
      
  //     body: $('#textarea1').val(),
  //   }
  // })
  //   .done(function( data ) {
  //     console.log(data);
  //     $('#textarea1').empty();
  //   });


  
  // $('#textarea1').val("");
});







// $("#submitNotes").on('click', function() {

//     var notes = $("#textarea1").val()
//     alert(notes);
// });

$("#deleteButton").on('click', function() {


});
