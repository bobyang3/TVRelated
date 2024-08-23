function main(item) {
    const url=item.url;
  const id = jz.getQuery(url, "id");

  const cache = jz.getCache(url);
  if (cache != null) {
    return { "url": cache, headers: { 'X-Forwarded-For': '210.6.4.148' }, "cache": true };
  }

const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJib3NzX2lkIjoiODUwNDY0NTgwIiwiZGV2aWNlX3Rva2VuIjoiWHp6anMzYTVKTms2TFpnZmJQeFZHR2QzIiwiZGV2aWNlX2lkIjoiTldGalptSmxNREF0TkRJNU5TMDBaakV3TFRrNFl6QXRNbUkwT0RCbFpXRTJaVEV3IiwiZGV2aWNlX3R5cGUiOiJ3ZWIiLCJkZXZpY2Vfb3MiOiJicm93c2VyIiwiZHJtX2lkIjoiTldGalptSmxNREF0TkRJNU5TMDBaakV3TFRrNFl6QXRNbUkwT0RCbFpXRTJaVEV3IiwiZXh0cmEiOnsicHJvZmlsZV9pZCI6MX0sImlhdCI6MTcwOTgwNTA3NywiZXhwIjoxNzA5ODA4Njc3fQ.XG-C6gWxLgbBRQ3ttKn68AKMQLOg6SxTpbmHxXl_qI2dbjd1eFFmwB9kD1yd2N_X8HxLPBwJukD4lygIKxbBGrQQDY_1vNd76TldllaeE2BC3fUtc-kAFOU4JwbUkfFYsWVm3v2JP-YGM2GGlhFqN_3170WDAi2Gq-R0tZckeFNWk7jOSShqkE0E7L3eqJ09sDG76R-PCbdpnCIxaY_NXtoYRfIoVQZA9QysExUyO6hQGUxLaTvJDtflX_ZM3OiqTMndHp1p0cDsINnpFokD6Yby5XS18RjQ-Dn1XJznj7-sRjlaGgyIIBoJjxsR2oD5S8teA5S6x7w3Dv6uTO3bWVV9J60E6jguGVqKnSYJ4Rx8A1TgyUTT_g57key6UFIiEhkHYqk7s3H01V-lHffNp5zDo9UrCdaO6maW_ZeA85ohR6P1PMh9EakQ5A-vok60s2oqyokKHfyrQvcodsI-MTC9mKegjJzgV2-HBgyylyj6B2ewvE4icDD25UdspWgbc33NrRpe_kgPxgVKF4cgKCD-S1AT3WrOaqKnPfPvhqmlciwlpZrUqZg09BqcazWPoyWAp2nqf93H6tlDqMrtAQgvft3Nd8-cM7jYx-WvzqRrCRpZ8vRSv11UdezKzR2Jm4H64KTWbs3GxB5vboZaeypdEzQW6PipPpftqRnNMQU';

  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`,
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5.2 Safari/605.1.15',
    'Referer': 'https://www.mytvsuper.com/',
    'X-Forwarded-For': '210.6.4.148',  //香港原生IP
  }

  const res = jz.get('https://user-api.mytvsuper.com/v1/channel/checkout?platform=android_tv&network_code=' + id, headers);

  if (!jz.isJSONObject(res)) {
    return { "error": "接口返回格式不正确！" };
  }

  const json = JSON.parse(res);

  if (json.hasOwnProperty('error_code')) {
    return { error: json.error_message };
  } else {
    const stream = json.profiles[0].streaming_path;
    jz.setCache(url, stream, 43200000);
    return { url: stream, headers: { 'X-Forwarded-For': '210.6.4.148' }, cache: false };
  }
}
