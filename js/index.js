getUserMe();

/*---------------------------------------- */

// 로그인 유저 조회
function getUserMe(){
	$.ajax({
		type: "GET",
		url: "http://localhost:8080/api/users/my-page",
		timeout: 0,
		contentType: "application/json",
		headers: {
			"Authorization": getCookie('accessToken'),
	  	},
		// data:JSonstringify({}),

		success: function(response) {
			console.log("회원정보조회");	
			console.log(response);
			// --------------------------채널 조회--------------------------
			getChannelList(response.userId,response.nickname);
			// --------------------------채널 조회--------------------------

		},

		error: function (response) {
            if (response.status === 401) {
				alert("401에러! 토큰재발급시도!");
			  } else if (response.status === 403) {
				alert("403에러e! 다시 로그인해주세요!");
			  } else {
				alert("정보조회 실패, 확인해주세요");
			  }
        }

	})
}

// 채널 조회
function getChannelList(id,nickname){
	$.ajax({
		type: "GET",
		url: "http://localhost:8080/api/users/channels",
		timeout: 0,
		contentType: "application/json",
		headers: {
			"Authorization": getCookie('accessToken')
		},
		// data: JSON.stringify({}),

		success: function(response) {
			console.log("채널목록");
			console.log(response);
			var html = '';
			for (var i = 0; i < response.length; i++) {	
				html += '<li class="joinchannelbtn">';
				html += `<a href="./channel.html?userId=${id}&userNickname=${nickname}&channelId=${response[i].id}"><div>`;
				html += '<div>';
				html += '<p>#</p>';
				html += '<p class="channelname">' + response[i].channelName + '</p>';
				html += '</div>';
				html += '</a>';
				html += '</li>';
			}
			document.querySelector('.joinchannellist').innerHTML += html;
		},

		error: function() {
			console.log("에러");
		}

	});
}


// 채널생성
function createChannel(){
	$.ajax({
		type: "POST",
		url: "http://localhost:8080/api/channels",
		timeout: 0,
		contentType: "application/json",
		headers: {
			"Authorization": getCookie('accessToken')
		},
		data: JSON.stringify({
			"channelName": $('.createchannelname').val()
		}),
		success: function(response) {
			console.log(response);
			alert("채널생성성공");
			location.reload();
		},
		error: function() {

		}

	})
}


// 회원정보 수정(업데이트)
function updateMember(){
	$.ajax({
		type: "PUT",
		url: "http://localhost:8080/api/users",
		timeout: 0,
		contentType: "application/json",
		headers: {
			"Authorization": getCookie('accessToken')
		},
		data: JSON.stringify({
			"nickname": $('#updateNickname').val(),
			"password": $('#updatePassword').val()
		}),

		success: function(response){
			console.log(response);
			alert("정보수정완료");
			location.href="./index.html";
		},

	})
}











/*--------------------------------------------------------------------------------*/

// 로그아웃
function logoutMember(){
	var settings = {
		"url": "http://localhost:8080/api/users/logout",
		"method": "POST",
		"timeout": 0,
		"headers": {
      	"Authorization": getCookie('accessToken'),
     	// "RTK": getCookie('refreshToken')
		},
	  };
	  $.ajax(settings).done(function (response) {
		console.log(response);
    alert("로그아웃완료");
		clearCookie('accessToken');
		clearCookie('refreshToken');
    location.href="./login.html";
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