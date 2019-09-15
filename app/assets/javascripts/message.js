$(function(){
  function buildHTML(message) {
    var html = `<div class="row">
                  <div class="col s12 m6 offset-m3">
                    <div>
                      <div class="card-content white-text">
                        <p>${message.text}</p>
                      </div>
                      <div class="card-action">
                        <ul class="more-list">
                          <a data-method="get" href="/messages/29/edit">編集</a>
                          <a rel="nofollow" data-method="delete" href="/messages/29">削除</a>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>`
    return html;
  }
  $("#new_message").on("submit", function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr("action")
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $(".content").append(html);
      $(".new_message").val("");
      $(".content").animate({scrollTop: $(".content")[0].scrollHeight}, "fast");
      $(".form-submit").attr("disabled,false");
      
    })
    .fail(function(){
      alert("error");
    })
    .always(function(){
      $(".form-submit").removeAttr("disabled");
    })
  })
});