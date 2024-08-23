function main(item) {

    const url=item.url;  
    var l = 3; //請輸入 1 ~ 11 中的一個數字
//    var i = Math.floor(Math.random()*5);

    var ip = [
'http://198.16.80.178:8278/',
'http://67.159.6.34:8278/',
'http://50.7.92.106:8278/',
'http://50.7.234.10:8278/',
'http://198.16.100.186:8278/',
'http://198.16.100.90:8278/',
'http://50.7.238.114:8278',
'http://91.149.203.179:8488/',
'http://91.149.203.179:8588/',
'http://50.7.234.10:8278/',
'http://50.7.220.170:8278/',
'http://50.7.216.178:8278/',
'http://gwtv.cnv8.tv:8097/',
'http://xiptv.top:8278/',
];

    var id = jz.getQuery( url, "id" );

    var headers = { 'Accept': '*/*', 'CLIENT-IP': '127.0.0.1', 'X-FORWARDED-FOR': '127.0.0.1', 'User-Agent': 'Dalvik/2.1.0 (Linux; U; Android 12; 22101316C Build/SP1A.210812.016)' };

    var sid = 'Smart-' + id +'-'+ ip[l-1];
    var cache = jz.getCache(sid);

    if (cache != null) {
       return { url: cache, headers: headers };
    }

    var seed = "tvata nginx auth module";
    var uid = '/'+id+'/playlist.m3u8';
    var tid = 'mc42afe745533';
    var ct = Math.round(Date.now()/150000);
    var tsum = jz.md5(seed+uid+tid+ct);
    var url1 = ip[l-1] + id + '/playlist.m3u8?tid=' + tid + '&ct=' + ct + '&tsum=' + tsum;

    jz.setCache(sid, url1, 3600000);

    return { url: url1, headers: headers };

}
