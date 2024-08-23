function main(item) {

    const url=item.url; 
    const id = jz.getQuery(url, "id");
    const c = jz.getQuery(url, "c");

    const headers = {
        "User-Agent": "cctv_app_tv",
        "Referer": "api.cctv.cn",
        "UID": "1234123122"
    };

    const cache = jz.getCache(id);
    if (cache !== null) {
        return { url: cache, headers: headers, cache: true };
    }

    const body = 'appcommon={ "ap": "cctv_app_tv", "an": "央视投屏助手", "adid": "1234123122", "av": "1.1.7" }&url=' + 'http://live-' + c + '.cctv.cn/live/' + id;
    const res = jz.post("https://ytpvdn.cctv.cn/cctvmobileinf/rest/cctv/videoliveUrl/getstream", headers, body);

    if (!jz.isJSONObject(res)) {
        return { error: '接口返回格式不正确！' };
    }

    const json = JSON.parse(res);

    if (json.error_code == 0) {
        jz.setCache(id, json.url, 3600000);
        return { url: json.url, headers: headers, cache: false };
    } else {
        return { error: json.error_desc };
    }
}
