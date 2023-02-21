//회원가입 //
function signUp() {
    $.ajax({
      type: "POST",
      url: "http://localhost:8080/api/users/sign-up",
      timeout: 0,
      contentType: "application/json",
      // headers: {}
      data: JSON.stringify({
        "email": $('#signUpEmail').val(),
        "password":$('#signUpPassword').val(),
        "nickname": $('#signUpNickname').val()
      }),
      success: function(response) {
        document.cookie = "accessToken=" + JSON.stringify(response.atk);
        document.cookie = "refreshToken=" + JSON.stringify(response.rtk);
        console.log(response);
        alert("회원가입 완료");
        location.href= "./login.html";
      },
      error: function(response) {
        if (response.status === 400) {
          alert("이메일형식이 아니거나 중복된 이메일입니다. 혹은 비밀번호를 확인하여주세요.");
        }else {
          alert("알수없는 에러입니다. 관리자에게 문의해주세요.")
        }

      },
    })
}

//로그인
function signIn() {
    $.ajax({
        type: "POST",
		url: "http://localhost:8080/api/users/login",
        timeout: 0,
		contentType: "application/json",
        headers: {
            
        },
        data: JSON.stringify({
            "email": $('#signInEmail').val(),
            "password": $('#signInPassword').val()
        }),
		success: function (response) {
      document.cookie = "accessToken=" + JSON.stringify(response.atk);
      document.cookie = "refreshToken=" + JSON.stringify(response.rtk);
			console.log(response);
			alert("로그인 완료");
            location.href="index.html"
		},
        error: function (response) {
            alert("로그인 실패");
            location.reload();
        }
    })
}