function main(item) {
	if (!item.hasOwnProperty("url") || !jz.rc4Decrypt || !jz.setTask) {
		return { error: "程序版本过低，请安装最新版本！！" };
	}

	if (item.hasOwnProperty('proxy')) {
		jz.setRequest({ proxy: item.proxy });
	}

	const headers = { "User-Agent": "okhttp/4.12.0" };

	if (jz.mode == 3) {
		return playlist(item);
	} else if (jz.mode == 2) {
		return play(item);
	} else {
		return { url: jz.m3u8, headers: headers };
	}
}

function play(item) {
	const headers = { "User-Agent": "okhttp/4.12.0" };
	const url = item.url;
	let response = null;
	const cacheKey = "302-"+url;
	const lastPlayUrl = jz.getCache("LAST_PLAY_URL");
	if (url != lastPlayUrl){
		response = jz.get(url, headers, true);
	} else {		
		const url_302 = jz.getCache(cacheKey);
		if (url_302 != null){
			try{
				response = jz.get(url_302, headers, true);
			}catch(e){
				response = jz.get(url, headers, true);
			}	
		} else {
			response = jz.get(url, headers, true);
		}	
	}		
	
	const aes_key = jz.decodeBase64(response.ReturnHeaders["x-key"]);
	const aes_iv = jz.decodeBase64(response.ReturnHeaders["x-iv"]);
	let m3u8 = "";
	let baseUrl = response.General.RequestURL.replace("index.m3u8", "");
	jz.setCache(cacheKey, response.General.RequestURL, 1000 * 3600 * 24);
	jz.opensslDecrypt(response.ReturnResponse, "AES-128-CBC", aes_key, 0, aes_iv).split('\n').forEach(function (line) {
		if (line.endsWith(".ts")) {
			m3u8 += baseUrl + line;
		} else {
			m3u8 += line;
		}
		m3u8 += "\n"
	});
	jz.setCache("LAST_PLAY_URL",url, 0);
	return { m3u8: m3u8 };
}

function playlist(item) {
	jz.setCache("LAST_PLAY_URL", "1", 1);
	const url = item.url;
	let mac = jz.getQuery(url, "mac");
	if (mac == null) {
		mac = jz.getCache("ethtv.mac");
		if (mac == null) {
			mac = 'xxxxxxxx-xxxxxxxx-xxxxxxxx-xxxxxxxx-xx'.replace(/[xy]/g, function (c) {
				var r = Math.random() * 16 | 0,
					v = c == 'x' ? r : (r & 0x3 | 0x8);
				return v.toString(16);
			}).replace(/-/g, "");
			jz.setCache("ethtv.mac", mac, 0);
		}
	}

	let uuid = jz.getQuery(url, "uuid");
	if (uuid == null) {
		uuid = jz.getCache("ethtv.uuid");
		if (uuid == null) {
			uuid = 'xxxxxxxx-xxxxxxxx-xxxxxxxx-xxxxxxxx-xxxxxxxx-xxxxxxxx-xxxxxxxx-xxxxxxxx'.replace(/[xy]/g, function (c) {
				var r = Math.random() * 16 | 0,
					v = c == 'x' ? r : (r & 0x3 | 0x8);
				return v.toString(16);
			}).replace(/-/g, "");
			jz.setCache("ethtv.uuid", uuid, 0);
		}
	}

	let etoken = jz.getQuery(url, "etoken");
	if (etoken == null) {
		etoken = "1c8c47becf333f1a2e51404bd5ed3fcb805ae7eef235a1b8d9ea5fda872b7c78";
	}

	let version = jz.getQuery(url, "version");
	if (version == null) {
		version = "20240818";
	}

	const headers = { "User-Agent": "okhttp/4.12.0" };
	const config_url = `http://newapp.tv6868.com/${etoken}/${mac}/${uuid}/` + new Date().getTime() + `/${version}/config`;
	const tvbox_live_url = JSON.parse(jz.get(config_url, headers)).lives[0].url.replace("{uuid}", uuid).replace('{mac}', mac).replace('{etoken}', etoken);
	const tvbox_playlist = JSON.parse(jz.get(tvbox_live_url, headers));

	const groups = [];
	tvbox_playlist.forEach((tvbox_group) => {
		let group = {};
		group.name = tvbox_group.name;
		group.channels = [];
		tvbox_group.channel.forEach((tvbox_channel) => {
			let channel = {};
			channel.name = tvbox_channel.name;
			channel.sources = [{ url: tvbox_channel.urls[0], js: jz.path }];
			group.channels.push(channel);
		})
		groups.push(group);
	});
	return { groups: groups };
}
