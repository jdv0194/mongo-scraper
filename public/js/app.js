$(document).on('click', '#article-comment', function() {
  $('#comments').empty();
  let thisId = $(this).attr('data-id');

  $.ajax({
    method: 'GET',
    url: '/articles/' + thisId
  }).then(function(data) {
    $('#comments').append("<h2 id='comment-title'>" + data.title + '</h2>');
    $('#comments').append(
      "<input type='text' class='form-control' placeholder='Comment Title' id='input-title' name='title'><br><br>"
    );
    $('#comments').append(
      "<textarea class='form-control' rows='3' placeholder='Comment Text' id='input-body' name='body'></textarea><br><br>"
    );
    if (location.pathname == '/') {
      $('#comments').append(
        "<button data-id='" + data._id + "' id='save-comment'>Submit</button>"
      );
    } else {
      $('#comments').append(
        "<button data-id='" + data._id + "' id='save-comment'>Delete</button>"
      );
    }

    if (data.comment) {
      $('#input-title').val(data.comment.title);
      $('#input-body').val(data.comment.body);
    }

    $('html, body').animate(
      {
        scrollTop: $('.article-section').offset().top
      },
      800
    );
  });
});

$(document).on('click', '#save-article', function() {
  let thisId = $(this).attr('data-id');
  let favorited = $(this).attr('data-favorited');

  if (favorited === 'false') {
    $.ajax({
      method: 'PUT',
      url: '/articles/' + thisId,
      data: {
        favorited: true
      }
    }).then(function(data) {
      console.log(data);
    });
  }
});

$(document).on('click', '#delete-comment', function() {
  let thisId = $(this).attr('data-id');
  let favorited = $(this).attr('data-favorited');

  if (favorited === 'true') {
    $.ajax({
      method: 'PUT',
      url: '/articles/' + thisId,
      data: {
        favorited: false
      }
    }).then(function(data) {
      console.log(data);
      location.reload();
    });
  }
});

$(document).on('click', '#remove-comment', function() {
  let thisId = $(this).attr('data-id');
  db.Comment.remove({ _id: thisId });
});

$(document).on('click', '#save-comment', function() {
  let thisId = $(this).attr('data-id');

  $.ajax({
    method: 'POST',
    url: '/articles/' + thisId,
    data: {
      title: $('#input-title').val(),
      body: $('#input-body').val()
    }
  }).then(function(data) {
    console.log(data);
    $('#comments').empty();
  });

  $('#input-title').val('');
  $('#input-body').val('');
});
