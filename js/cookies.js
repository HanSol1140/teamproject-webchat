// 쿠키 가져오기
function getCookie(name) {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop().split(';').shift();
}


// 쿠키 삭제 
// 토큰 값 ''으로 덮어쓰기
function clearCookie(key) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + 0);
	document.cookie =
    // key + '=' + '' + '; expires=' + exdate.toUTCString();
		`${key}=''; expires=${exdate.toUTCString()}`
}