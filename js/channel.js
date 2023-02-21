
const urlParams = new URL(location.href).searchParams;
const channelid = urlParams.get('channelId');
const userid = urlParams.get('userId');
const usernickname = urlParams.get('userNickname');
console.log(channelid + " = 채널아이디");
console.log(userid + " = 유저아이디");
console.log(usernickname + " = 유저닉네임");
/*---------------------------------------------------*/
getChannelList();
getThreads();
/*---------------------------------------------------*/


// 채널목록




// 채널 조회
function getChannelList(){
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
			html += '<ul class="channellist">채널목록';
			for (var i = 0; i < response.length; i++) {	
				html += '<li class="joinchannelbtn">';
				html += `<a href="./channel.html?userId=${userid}&userNickname=${usernickname}&channelId=${response[i].id}">`;
				html += '<div>';
				html += '<p>#</p>';
				html += '<p class="channelname">' + response[i].channelName + '</p>';
				html += '</div>';
				html += '</a>';
				html += '</li>';
			}
			html += '</ul>';
			document.querySelector('.channelroom').innerHTML += html;
		},

		error: function() {
			console.log("에러");
		}

	});
}




// 쓰레드쓰기
function createThread() {
	$.ajax({
		type: "POST",
		url: "http://localhost:8080/api/channels/"+channelid+"/threads",
		timeout: 0,
		contentType: "application/json",
		headers: {
			Authorization: getCookie("accessToken")
		},
		data: JSON.stringify({
			"content": $('.writebox').val(),
		}),
		success: function(response) {
			console.log(response);
			// alert("스레드생성완료"); 
			location.reload();
		}
	});
}


//  게시한 스레드 읽기
function getThreads() {
	$.ajax({
		// "url": "http://localhost:8080/api/channels/"+channelid+"/threads",
		// url: "http://localhost:8080/api/channels/" + channelid + "/threads?currentPage=1&size=5&sortBy=createdAt",
		url: "http://localhost:8080/api/channels/" + channelid + "/threads?currentPage=1&size=5&sortBy=createdAt&order=desc",
		method: "GET",
		contentType: "application/json",
		headers: {
			"Authorization": getCookie('accessToken'),
		},
		success: function(response){
			console.log("채팅내역");
			console.log(response);
			console.log(response.content);
			// console.log(response.content[0].userId);
			// console.log(response.content[0].userNickname);
			// console.log(response.content[0].content);
			// console.log(response.content[0].createdAt);
			// for (var i = 0; i < response.content.length; i++) {	
			// for(var i = response.content.length - 1; i >= 0; i--) {	
			var messagebox = '';
			for(var i = response.content.length - 1; i >= 0; i--) {	
				var messagewriter = response.content[i].userNickname;
				var messagecontent = response.content[i].content;
				var createdAt = response.content[i].createdAt;
				var time = createdAt.slice(11, 16);
				// 타인의 메세지
				if (messagewriter !== usernickname) {
					messagebox += '<div class=othersmessagebox>';
					messagebox += '<p class="othersmessagename">' + messagewriter + '</p>';
					messagebox += '<p class="othersmessage">' + messagecontent + '</p>';
					messagebox += '<p>' + time + '</p>'
					messagebox += '</div>';
				
				  } else {
					messagebox += '<div class="mymessagebox">';
					messagebox += '<p class="mymessagename">' + messagewriter + '</p>';
					messagebox += '<p class="mymessage">' + messagecontent + '</p>';
					messagebox += '<p>' + time + '</p>';
					messagebox += '</div>';
				  }
				}
				document.querySelector('.messagelist').innerHTML += messagebox;
				$('.messagelist').scrollTop($('.messagelist')[0].scrollHeight);
			}
	});
}


// 채널에 유저 초대하기
function inviteUser() {
	$.ajax({
		type: "POST",
		url: "http://localhost:8080/api/channels/" + channelid + "/users",
		timeout: 0,
		contentType: "application/json",
		headers: {
			"Authorization": getCookie('accessToken'),
		},
		data: JSON.stringify({
			"email": $('.invitename').val()
		}),

		success: function(response){
			console.log(response);
			alert("초대완료"); 
			location.reload();
		},
	});
}



function deleteChannel() {
	$.ajax({
		type: "DELETE",
		url: "http://localhost:8080/api/channels/" + channelid,
		timeout: 0,
		contentType: "application/json",
		headers: {
			"Authorization": getCookie('accessToken'),
		},
		// data: JSON.stringify({}),

		success: function(response){
			console.log(response);
			alert("채널삭제완료"); 
			location.href="./index.html"
		},
		error: function(response){
			if(response.status === 401) {
				refreshToken();
			}else if(response.status === 403){
				alaer("토큰 유효기간 만료, 다시 로그인해주세요")
				logoutMember();
			}else {
				alert("알수없는 오류, 관리자에게 문의하세요");
				logoutMember();
			}
		}
	});
}
















// 채널 검색// 채널 눌럿을때 채팅방에 로그인하기위함
// function SearchChannelList(){
// 	var settings = {
// 		"url": "http://localhost:8080/api/channels/"+채널아이디,
// 		"method": "GET",
// 		"timeout": 0,
// 		"headers": {
//       		"Content-Type": "application/json",
// 			"Authorization": localStorage.getItem('accessToken'),
// 			},
// 			"data": JSON.stringify({
// 				"currentpage": $('.writebox').val(),
// 			})
// 		};
// 		$.ajax(settings).done(function (response) {
// 		console.log(response);
// 	});
// }


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