function main(item) {
    const url=item.url;
    const id = jz.getQuery(url, "ch");
    const date = jz.getQuery(url, "date");

    const res = jz.get("https://contenthub-api.eco.astro.com.my/channel/" + id + ".json");
    if (!jz.isJSONObject(res)) {
        return { "error": "接口返回格式不正确！" };
    }

    const json = JSON.parse(res);

    if (json.responseCode !== 200) {
        return { "error": "请求错误！" };
    }

    const format1 = "yyyy-MM-dd HH:mm:ss.S";
    const format2 = "HH:mm";

    let programs = [];
    const data = json.response.schedule;

    for (var key in data) {
        if (key === date) {
            data[key].forEach(item => {
                const start = item.datetime;
                const end = jz.toDate(jz.toTimestamp(start, format1) + timeStringToMilliseconds(item.duration), format2);
                programs.push({ title: item.title, start: jz.formatDateTime(start, format1, format2), end: end });
            });
            break;
        }
    }

    if (programs.length == 0) {
        return { "error": "未获取到数据！" };
    } else {
        return { "epg_data": programs };
    }

}

function timeStringToMilliseconds(timeString) {
    var parts = timeString.split(':');
    return (parseInt(parts[0], 10) * 60 * 60 + parseInt(parts[1], 10) * 60 + parseInt(parts[2], 10)) * 1000;
}