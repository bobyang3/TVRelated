function main(item) {
    const url=item.url;
    const name = jz.getQuery(url, "ch");
    const date = jz.getQuery(url, "date");

    const res = jz.get("https://www.4gtv.tv/proglist/" + name + ".txt");

    if (!jz.isJSONArray(res)) {
        return { "error": "接口返回格式不正确！" };
    }

    const json = JSON.parse(res);

    const format1 = "yyyy-MM-dd HH:mm:ss";
    const format2 = "HH:mm";

    let programs = [];
    for (const item of json) {
        if (date === item.sdate) {
            programs.push({ title: item.title, start: jz.formatDateTime(item.sdate + " " + item.stime, format1, format2), end: jz.formatDateTime(item.edate + " " + item.etime, format1, format2) });
        }
    }

    if (programs.length == 0) {
        return { "error": "未获取到数据！" };
    } else {
        return { "epg_data": programs };
    }
}