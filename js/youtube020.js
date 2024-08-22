function main(url) {

    var y = 3;
    var i = 1;
    var cache_on = 1;

    var line = [
'https://pipedapi.kavin.rocks',
'https://pipedapi.r4fo.com',
'https://pipedapi.adminforge.de',
'https://pipedapi.smnz.de',
'https://pipedapi.us.projectsegfau.lt',
'https://pipedapi.astartes.nl',
'https://piapi.ggtyler.dev',
'https://piped-backend.seitan-ayoub.lol',
'https://pipedapi-libre.kavin.rocks',
'https://api.piped.privacydev.net',
'https://api.piped.privacydev.net/',
'https://piped-api.lunar.icu',
];

//    var url_0 = url;

    var v = jz.getQuery(url, "v");
    var ln = jz.getQuery(url, "ln");

    var headers = { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36 Edg/113.0.1774.50' };

    if (url.match(/data=normal/)) {
       url=url.replace('&data=normal','');
       var cache = jz.getCache(url);
       if(cache) {
          return { url: cache, headers: headers };
       }
       if (url.match(/youtube_d.php/)) {
          var url2 = jz.get(url, headers);
          if (url2.match(/expire\/(.*?)\//)) {
             var t = url2.match(/expire\/(.*?)\//)[1]*1000-Date.now()-1000;
          } else {
             return { error: '非該頻道直播時間！' };
          }
          jz.setCache(url, url2, t)
          return { url: url2, headers: headers };
       } else if (url.match(/douyu/)) {
          var url0 = 'https://wxapp.douyucdn.cn/api/nc/stream/roomPlayer';
          var id = url.match(/\/douyu\/(.+)/)[1];
          var body = 'room_id='+id+'&big_ct=cpn-androidfapp&token=fastapp&rate=3';
          var res = JSON.parse(jz.post(url0, headers, body));
          if (!res.data.live_url) {
             return { error: '非該頻道直播時間！' };
          } else {
             var url2 = res.data.live_url;
             jz.setCache(url, url2, 7200000);
             return { url: url2, headers: headers };
          }
       } else if (url.match(/huya/)) {
          var uid = jz.getCache('huya-uid');
          if(!uid) {
             var body = { "appId": 5002, "byPass": 3, "context": "", "version": "2.4", "data": {} };
             var uid = JSON.parse(jz.post("https://udblgn.huya.com/web/anonymousLogin", headers, body)).data.uid;
             jz.setCache('huya-uid', uid, 0);
          }
          var id = url.match(/\/huya\/(.+)/)[1];
          var url0 = 'https://mp.huya.com/cache.php?m=Live&do=profileRoom&roomid=' + id;

          var res = jz.get(url0, headers);
          if (!res.match(/fm=(.*?)&/)) {
             return { error: '非該頻道直播時間！' };
          }
          var data = JSON.parse(res.match(/"baseSteamInfoList":(.*?)\}\],/)[1]+'}]');
          var fm = res.match(/fm=(.*?)&/)[1];
          fm = jz.decodeBase64(decodeURIComponent(fm));
          var date = new Date();
          var uuid = Math.floor((date.getTime() % 10000000000 * 1000 + Math.floor(Math.random() * 1000)) % 4294967295)
          var sv = date.getFullYear()+('0' + (date.getMonth() + 1)).slice(-2)+('0' + date.getDate()).slice(-2)+('0' + date.getHours()).slice(-2);
          var seqid = (parseInt(uid) + Date.now()).toString();
          var ss = jz.md5(seqid+'|tars_mp|102');
          var wsTime = (Math.floor(Date.now() / 1000) + 21600).toString(16);
          var s= res.match(/"sStreamName":"(.*?)"/)[1];
          fm = fm.replace('$0',uid.toString()).replace('$1',s).replace('$2',ss).replace('$3',wsTime);
          var wsSecret = jz.md5(fm);

    var url2 = data[i].sFlvUrl + '/' + data[i].sStreamName + '.' + data[i].sFlvUrlSuffix + '?wsSecret=' + wsSecret + '&wsTime=' + wsTime + '&ctype=tars_mp&fs=bgct&&t=102&ver=1&sv=' +sv + '&seqid=' + seqid + '&uid=' + uid + '&uuid=' + uuid;
          jz.setCache(url, url2, 7200000);
          return { url: url2, headers: headers };
       } else if (url.match(/\/yy\//)) {
          var headers2 = { 'Referer': 'https://wap.yy.com', 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36 Edg/113.0.1774.50' };
          var time = Date.now();
          var cid = url.match(/\/yy\/(.+)/)[1];
          var url0 = 'https://stream-manager.yy.com/v3/channel/streams?uid=0&cid='+cid+'&sid='+cid+'&appid=0&sequence='+time+'&encode=json';
          var body = '{"head":{"seq":'+time+',"appidstr":"0","bidstr":"121","cidstr":"'+cid+'","sidstr":"'+cid+'","uid64":0,"client_type":108,"client_ver":"5.17.0","stream_sys_ver":1,"app":"yylive_web","playersdk_ver":"5.17.0","thundersdk_ver":"0","streamsdk_ver":"5.17.0"},"client_attribute":{"client":"web","model":"web0","cpu":"","graphics_card":"","os":"chrome","osversion":"119.0.0.0","vsdk_version":"","app_identify":"","app_version":"","business":"","width":"1536","height":"864","scale":"","client_type":8,"h265":0},"avp_parameter":{"version":1,"client_type":8,"service_type":0,"imsi":0,"send_time":'+Math.floor(time/1000)+',"line_seq":-1,"gear":4,"ssl":1,"stream_format":0}}';
          var res = jz.post(url0, headers2, body);
          if (res.match(/"url":"(.*?)"/)) {
             url2 = res.match(/url":"(.*?)"/)[1].replaceAll('\\u0026','&');
             jz.setCache(url, url2, 7200000);
             return { url: url2, headers: headers };
          } else {
             return { error: '非該頻道直播時間！' };
          }
       } else if (url.match(/\/ddkanqiu./)) {
          var res = jz.get(url, headers);
          if (res.match(/pull.opsnowflake/)||res.match(/pull.opsnowflake/)) {
          var url2 = res.match(/li onclick="bofang\('(.*?)'/)[1].replace('amp;','');
             jz.setCache(url, url2, 3600000);
             return { url: url2, headers: headers };
          } else {
             return { error: '非比賽時間...\n待比賽時間再來！' };
          }
       }
       return { url: url, headers: headers };
    }

    if ( cache_on == 1 ) {
       var cache = jz.getCache(url);
       if (cache) {
          return { url: cache, headers: headers };
       }
    }

    if ( y == 1 || y == 3 ) {
       if ( url.match(/streams/) ) {
          url1 = url.replace('/m.','/www.').replace(/streams\/\d+/,'streams')+'?app=desktop';
          var res = jz.get( url1, headers );
          if (res.match(/次"\}\}\}/)) {
             var live = res.match(/次"\}\}\},"(.*?)","webPageType"/g);
          } else if (res.match(/views"\}\}\}/)) {
             var live = res.match(/views"\}\}\},"(.*?)","webPageType"/g);
          }

          if (live) {
             var l = live.length;
             if ( url.match(/streams\/(.+)/)[1] <= l ) {
                l = l-url.match(/streams\/(.+)/)[1];
                live = live[l].match(/v=(.*?)"/)[1];

             } else {
                return { error: '該頻道目前無直播！' };
             }
          } else {

          var res1 = res.split( /"viewCountText":\{"runs":\[\{"text":"[0-9,]+"\},\{"text":/ );
             var l = res1.length-1;
             if ( url.match(/streams\/(.+)/)[1] <= l ) {
                l = l-url.match(/streams\/(.+)/)[1];
                live = res1[l+1].match(/watch\?v=(.*?)"/)[1];
             } else {
                return { error: '該頻道目前無直播！\n（或因地區限制無法播放，請更換台灣或香港節點！)' };
             }
          }
       } else if (jz.getQuery(url, 'v')) {

          var live = jz.getQuery(url, 'v');

       } 

       if (live) {
          url0 = 'https://m.youtube.com/watch?v='+live;
          url0 = url0.replace('/m.','/www.')+'&app=desktop';
       } else {
          url0 = url;
       }

          var res = jz.get(url0, headers);
          if ( res.match(/hlsManifestUrl":"(.*m3u8)/) ) {
             var url2 = res.match(/hlsManifestUrl":"(.*m3u8)/)[1];

             var t = url2.match(/expire\/(.*?)\//)[1]*1000-Date.now()-1000;
             jz.setCache(url, url2, t);
             return { url: url2, headers: headers };
          }

       var url0 = 'https://youtubei.googleapis.com/youtubei/v1/player';

       var body = { "videoId": live, "context": { "client": { "hl": "en", "gl": "US", "clientName": "ANDROID_TESTSUITE", "clientVersion": "1.9", "androidSdkVersion": 31 } } };

       var res = jz.post(url0, headers, body);
/*       if ( res.match(/hlsManifestUrl/) ) {
          var url2 = res.match(/"hlsManifestUrl": "(.*?)"/)[1];
          var t = url2.match(/expire\/(.*?)\//)[1]*1000-Date.now()-1000;
          jz.setCache(url, url2, t);
          return { url: url2, headers: headers };
//       return { url: , headers: headers };
       } else */if (res.match(/formats/)) {
          var formats = JSON.parse(res).streamingData.formats;
          var url2 = formats[(formats.length)-1].url;
          var t = url2.match(/expire=(.*?)&/)[1]*1000-Date.now()-1000;
          jz.setCache(url, url2, t);
          return { url: url2, headers: headers };

          } else if ( v=='uDqQo8a7Xmk'||v=='oV_i3Hsl_zg'||v=='OKvWtVoDR8I' ){
             return { error: '本頻道需台灣節點！)' };
          }
    }

    if ( y == 2 || y == 3 ) {
       var url0 = line[i-1] + '/streams/'+ v;
       var res = jz.get(url0, headers);

       if ( res.match(/"hls":"(.*?)"/) ) {
          url2 = res.match(/"hls":"(.*?)"/)[1];
       } else {
          i=2;
          var url0 = line[i-1] + '/streams/'+ v;
          var res = jz.get(url0, headers);
          if ( res.match(/"hls":"(.*?)"/) != null ) {
             url2 = res.match(/"hls":"(.*?)"/)[1];
          } else {
             return { error: '該頻道目前無直播！*' };
          }
       }

       if ( cache_on == 1 && i!='2' && !(( v=='YvdcZ_jpLXE'||v=='2mCSYvcfhtc' )&&url2.match(/ip\/23.26.221.4/)) ) {
          var t = url2.match(/expire\/(.*?)\//)[1]*1000-Date.now()-1000;
          jz.setCache(url, url2, t);
       }

    }
       return { url: url2, headers: headers };
 
}
