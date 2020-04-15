$(function(){
  function buildHTML(message){
    if (message.image) {
      var html = ` <div class="content">
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
      var html = ` <div class="content">
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
});