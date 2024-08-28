function main(item) {
    const id = jz.getQuery(item.url, "id");
    const object = { url: 'http://iptv.52sw.top:678/p3p.php' };
    const port = jz.get(object);
    const url = 'p3p://108.181.20.' + port.slice(0,9) + '/' + id
    return JSON.stringify( url: url );
    }


//    http://iptv.52sw.top:678/iptv.txt
//    http://iptv.52sw.top:678/p3p.php