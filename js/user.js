// 쿠키받기
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

// 쿠키삭제 
function deleteCookie() {
  document.cookie = '"refreshToken"=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}

// 토큰 재발급
function refreshToken(){
	var settings = {
		"url": "http://localhost:8080/account/reissue",
		"method": "GET",
		"timeout": 0,
		"headers": {
      "Authorization": localStorage.getItem('refreshToken')
      // "Authorization": getCookie('refreshToken')
		},
	  };
	  $.ajax(settings).done(function (response) {
		console.log(response);
    alert("재발급완료");
    
  });
}







//회원가입 //
function signUp() {
  var settings = {
    "url": "http://localhost:8080/api/users/sign-up",
    "method": "POST",
    "timeout": 0,
    "headers": {
      "Content-Type":"application/json",
    },
    "data": JSON.stringify({
      "email": $('#signUpEmail').val(),
      "password":$('#signUpPassword').val(),
      "nickname": $('#signUpNickname').val()
    })
  }
  $.ajax(settings).done(function(response){
    console.log(response);
    alert("회원가입완료");
    location.href="./login.html";
  });
}



//로그인 //
function signIn() {
  var settings = {
    "url": "http://localhost:8080/api/users/login",
    "method": "POST",
    "timeout": 0,
    "headers": {
      "Content-Type":"application/json"
    },
    "data": JSON.stringify({
      "Authorization": localStorage.getItem('accessToken'),
      "email": $('#signInEmail').val(),
      "password": $('#signInPassword').val()
    })
  };
  $.ajax(settings).done(function (response, status, xhr) {
    localStorage.setItem('accessToken', JSON.stringify(response.atk));
    localStorage.setItem('refreshToken', JSON.stringify(response.rtk));
    document.cookie = "accessToken=" + JSON.stringify(response.atk);
    document.cookie = "refreshToken=" + JSON.stringify(response.rtk);
    alert("로그인 완료!"); 
    location.href="./index.html";
  });
}



// 로그인 회원 정보조회
function getUserMe(){
	var settings = {
		"url": "http://localhost:8080/api/users/my-page",
		"method": "GET",
		"timeout": 0,
		"headers": {
      "Authorization": localStorage.getItem('accessToken')
      // "Authorization": getCookie('accessToken')
		},
	  };
	  $.ajax(settings).done(function (response) {
		console.log("회원정보조회");	
		console.log(response);
    
    $('.login-name p:first-child').html(response.nickname)
    $('.username').html(response.nickname)
    loginnickname = response.nickname;
    getChannelList(loginnickname);
    // allMember();
  });
}


// 전체 회원 조회
// function allMember(){
// 	var settings = {
// 		"url": "http://localhost:8080/api/users",
// 		"method": "GET",
// 		"timeout": 0,
// 		"headers": {
//       "Content-Type": "application/json",
// 		  // "Authorization": localStorage.getItem('accessToken')
//       "Authorization": getCookie('accessToken')
// 		}
// 	  };
// 	  $.ajax(settings).done(function (response) {
// 		console.log(response);
// 		var html = '';
//     for (var i = 0; i < response.length; i++) {	
//         html += '<li>';
//         html += '<div class="memberimg" style="font-size: 12px;">'+'img'+'</div>';
//         html += '<p class="username">' + response[i].nickname + '</p>';
//         html += '</li>';
//     }
//     document.querySelector('.memberbox').innerHTML += html;
// 	});
// }



// 회원정보 수정(업데이트)
function updateMember() {
  var settings = {
    "url": "http://localhost:8080/api/users",
    "method": "PUT",
    "timeout": 0,
    "headers": {
      "Content-Type": "application/json",
      // "Authorization": localStorage.getItem('accessToken')
      "Authorization": getCookie('accessToken')
    },
    "data": JSON.stringify({
      "nickname": $('#updateNickname').val(),
      "password": $('#updatePassword').val()
    })
  }
  $.ajax(settings).done(function(response){
    console.log(response);
    alert("정보수정완료");
    location.href="./index.html";
  });
}

// 로그아웃
function logoutMember(){
	var settings = {
		"url": "http://localhost:8080/api/users/logout",
		"method": "POST",
		"timeout": 0,
		"headers": {
      "Authorization": localStorage.getItem('accessToken'),
      // "Authorization": getCookie('accessToken')
		},
	  };
	  $.ajax(settings).done(function (response) {
		console.log(response);
    alert("로그아웃완료");
    location.href="./login.html";
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

  });
}

//회원 정보 탈퇴
function deleteMember(){
	var settings = {
		"url": "http://localhost:8080/api/users",
		"method": "DELETE",
		"timeout": 0,
		"headers": {
      "Content-Type": "application/json",
		  // "Authorization": localStorage.getItem('accessToken')
      "Authorization": getCookie('accessToken')
		},
	  };
	  $.ajax(settings).done(function (response) {
		console.log(response);
    alert("회원탈퇴완료");
    location.href="./login.html";
  });
}


