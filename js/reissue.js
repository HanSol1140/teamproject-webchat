// 토큰 재발급
function refreshToken(){
	$.ajax({
		type: "GET",
		url: "http://localhost:8080/account/reissue",
		timeout: 0,
		contentType: "application/json",
		headers: {
			// "Authorization": getCookie('accessToken'),
			"Authorization": getCookie('refreshToken'),
			// "RTK": getCookie('refreshToken'),
		},
		success: function(){
			alert("토큰재발급완료")
		}

// 
	})
}