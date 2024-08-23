function main(item) {

    const url=item.url; 
    const arr = [
//'jaztv.hoatv.top:14028',
    //'fdzhdx.yeyuaihao.club:6868',
    //'118.170.49.112:6868',
     // '61.224.69.212:9478',
     // '36.239.185.137:7088',
    	//'61.224.110.66:9088',
    'jaz9.my.to:4022',
     //'twzh.chunfengyun.top:7878',
//'114.33.206.188:4040',
//'59.127.60.39:4040',
    ];
    const ip = arr[Math.floor(Math.random() * arr.length)];
    var id = jz.getQuery(url, "id");
    var res = 'http://' + ip + '/udp/' + id;
return {url: res};
}
