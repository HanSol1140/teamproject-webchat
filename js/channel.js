// 채널생성
function createChannel(){
	var settings = {
		"url": "http://localhost:8080/api/channels",
		"method": "POST",
		"timeout": 0,
		"headers": {
      		"Content-Type": "application/json",
			"Authorization": localStorage.getItem('accessToken'),
		},
    "data": JSON.stringify({
      "channelName": $('.createchannelname').val()
    })
	  };
	$.ajax(settings).done(function (response) {
	console.log(response);
	location.reload()
  });
}


// 전체 채널 조회
function getChannelList(loginuserid2){
	var settings = {
		"url": "http://localhost:8080/api/users/channels",
		"method": "GET",
		"timeout": 0,
		"headers": {
      		"Content-Type": "application/json",
			"Authorization": getCookie('accessToken')
			},
		};
		$.ajax(settings).done(function (response) {
		console.log(response);
			var html = '';
			for (var i = 0; i < response.length; i++) {	
				html += '<li class="joinchannelbtn">';
				// html += '<a href="./channel.html?channelId=' + response[i].channelId + '"><div>';
				html += `<a href="./channel.html?userId=${loginuserid2}&channelId=${response[i].channelId}"><div>`;
				html += '<p>#</p>';
				html += '<p class="channelname">' + response[i].channelName + '</p>';
				html += '</div></a>';
				html += '</li>';
			
			}
		document.querySelector('.joinchannellist').innerHTML += html;
	});
}


// 채널 검색// 채널 눌럿을때 채팅방에 로그인하기위함
function SearchChannelList(){
	var settings = {
		"url": "http://localhost:8080/api/channels/"+채널아이디,
		"method": "GET",
		"timeout": 0,
		"headers": {
      		"Content-Type": "application/json",
			"Authorization": localStorage.getItem('accessToken'),
			},
			"data": JSON.stringify({
				"currentpage": $('.writebox').val(),
			})
		};
		$.ajax(settings).done(function (response) {
		console.log(response);
	});
}

// 스레드쓰기
function createThread(createid) {
	var settings = {
	//   "url": "http://localhost:8080/api/channels/8/threads",
	  "url": "http://localhost:8080/api/channels/"+createid+"/threads",
	  "method": "POST",
	  "timeout": 0,
	  "headers": {
		"Content-Type":"application/json",
		"Authorization": localStorage.getItem('accessToken'),
	  },
	  "data": JSON.stringify({
		  "content": $('.writebox').val(),
	  })
	};
	$.ajax(settings).done(function (response) {
		console.log(response);
	  	alert("스레드생성완료"); 
		location.reload();
	});
  }


//  게시한 스레드 읽기
function getThreads(getlistid) {
	var settings = {
		"url": "http://localhost:8080/api/channels/" + getlistid + "/threads?currentPage=1&size=10&sortBy=createdAt",
		"method": "GET",
		"headers": {
			"Content-Type":"application/json",
			"Authorization": localStorage.getItem('accessToken'),
		},
	};
	$.ajax(settings).done(function (response) {
	console.log(response);
	const urlParams = new URL(location.href).searchParams;
    const username = urlParams.get('userId');
    const channelid = urlParams.get('channelId');
	var messagebox = '';
	// for (var i = 0; i < response.length; i++) {	
	for (var i = response.length - 1; i >= 0; i--) {	
		// 내 메세지내역이랑 남의 메세지내역 분리해야함
		var messagewriter = response[i].userNickname;
		var messagecontent = response[i].content;
		// 타인의 메세지
		if(response[i].userNickname != username){ 
			messagebox += '<div class=othersmessagebox>';
			messagebox += '<p class="othersmessagename">' + messagewriter + '</p>';
			messagebox += '<p class="othersmessage">'+messagecontent+'</p>';
			messagebox += '</div>';
		}else {// 본인 메세지인경우
			messagebox += '<div class="mymessagebox">';
			messagebox += '<p class="mymessagename">' + messagewriter + '</p>';
			messagebox += '<p class="mymessage">'+messagecontent+'</p>';
			messagebox += '</div>';
		}
	}
	document.querySelector('.messagelist').innerHTML += messagebox;
	$('.messagelist').scrollTop($('.messagelist')[0].scrollHeight);
});
}


// 채널에 유저 초대하기
function inviteUser() {
	const urlParams = new URL(location.href).searchParams;
	const channelid = urlParams.get('channelId');
	var settings = {
		"url": "http://localhost:8080/api/channels/" + channelid + "/users",
		"method": "POST",
		"timeout": 0,
		"headers": {
		"Content-Type":"application/json",
		"Authorization": localStorage.getItem('accessToken'),
		},
		"data": JSON.stringify({
			"email": $('.invitename').val()
		})
	};
	$.ajax(settings).done(function (response) {
		console.log(response);
		alert("초대완료"); 
		location.reload();
	});
}

// 채널삭제
function deleteChannel() {
    const urlParams = new URL(location.href).searchParams;
    const channelid = urlParams.get('channelId');
    var settings = {
        "url": `http://localhost:8080/api/channels/${channelid}`,
        "method": "DELETE",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem('accessToken'),
        },
    };
    $.ajax(settings).done(function (response) {
        console.log(response);
        alert("채널삭제완료");
        location.href = "./index.html"
    });
}
