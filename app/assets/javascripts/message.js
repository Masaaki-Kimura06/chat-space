$(function(){

  function buildHTML(message){
    if (message.image) {
      var html = ` <div class="content" data-message-id=${message.id}>
                      <span class="chat-main__message-list__name">
                      ${message.user_name}
                      </span>
                      <span class="chat-main__message-list__date">
                      ${message.created_at}
                      </span>
                      <p class="chat-main__message-list__text">
                      ${message.body}
                      </p>
                      <img src=${message.image}>
                    </div>`
    } else {
      var html = ` <div class="content" data-message-id=${message.id}>
                      <span class="chat-main__message-list__name">
                      ${message.user_name}
                      </span>
                      <span class="chat-main__message-list__date">
                      ${message.created_at}
                      </span>
                      <p class="chat-main__message-list__text">
                      ${message.body}
                      </p>
                    </div>`
    }
    return html
  } 

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main__message-list').append(html);
      $('form')[0].reset();
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      $('.chat-main__message-form__submit-btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      $('.chat-main__message-form__submit-btn').prop('disabled', false);
  });
  });
    
  var reloadMessages = function() {
    var last_message_id = $('.content:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.chat-main__message-list').append(insertHTML);
        $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('エラー');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});