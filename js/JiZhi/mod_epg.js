function main(item) {
    const url=item.url;
    const pk = jz.getQuery(url, "ch");
    const date = jz.getQuery(url, "date");

    const headers = {
        'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/114.0',
        'Content-Type': 'x-www-form-urlencoded',
    };

    const body = 'contentPk=' + pk + '&date=' + date;
    const res = jz.post("https://mod.cht.com.tw/channel/epg.do", headers, body);

    if (!jz.isJSONArray(res)) {
        return { "error": "接口返回格式不正确！"};
    }

    const json = JSON.parse(res);

    const format1 = "yyyy-MM-dd HH:mm:ss";
    const format2 = "HH:mm";

    let programs = [];
    for (const item of json) {
        programs.push({ title: item.programName, start: item.startTimeVal, end: item.endTimeVal });
    }

    if (programs.length == 0) {
        return { "error": "未获取到数据！" };
    } else {
        return { "epg_data": programs };
    }
}