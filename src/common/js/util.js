/**
	* 解析url参数
	* @example ?id="1234&a=b"
	* @return Object { id: 1234, a: b }
	*/
export function urlParam () {
	let url = window.location.search;
	console.log(url);
	let obj = {};
	let reg = /[?&][^?&]+=[^?&]+/g;
	let arr = url.match(reg);
	// ['?id=1234', '&a=b'];
	if (arr) {
		arr.forEach((item) => {
			let tempArr = item.substring(1).split('=');
			let key = decodeURIComponent(tempArr[0]);
			let value = decodeURIComponent(tempArr[1]);
			obj[key] = value;
		});
	}
	return obj;
};

