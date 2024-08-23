function main(item) {
    const url=item.url;
    const name = jz.getQuery(url, "ch");
    const date = jz.getQuery(url, "date");
    const code = getChannelCode(name);

    if (code == null) {
        return { "error": "未匹配到名称！" };
    }

    const format1 = "yyyy-MM-dd";
    const format2 = "yyyyMMdd";
    const format3 = "yyyy-MM-dd HH:mm:ss";
    const format4 = "HH:mm";

    const from = jz.formatDateTime(date, format1, format2, -1);//获得日期的前一天
    const to = jz.formatDateTime(date, format1, format2);//把日期转成指定格式

    const res = jz.get("https://content-api.mytvsuper.com/v1/epg?network_code=" + code + "&from=" + from + "&to=" + to);

    if (!jz.isJSONArray(res)) {
        return { "error": "接口返回格式不正确！" };
    }

    const json = JSON.parse(res);
    const programsArray = [...json[0].item[0].epg, ...json[0].item[1].epg];
    
    let programs = [];
    for (var i = 0; i < programsArray.length; i++) {
        const current = programsArray[i];
        const start = current.start_datetime;
        if (date === jz.formatDateTime(start, format3, format1)) {
            const end = programsArray[i + 1].start_datetime;
            programs.push({ title: current.programme_title_tc, start: jz.formatDateTime(start, format3, format4), end: jz.formatDateTime(end, format3, format4) });
        }
    }
    
    if (programs.length == 0) {
        return { "error": "未获取到数据！" };
    } else {
        return { "epg_data": programs };
    }
}

function getChannelCode(name) {
    const channels = [{ name: 'SUPER FREE,SUPER FREE', code: 'CWIN' }, { name: 'myTV SUPER 18台,myTV SUPER 18', code: 'C18' }, { name: '黃金翡翠台,Golden Jade', code: 'TVG' }, { name: '翡翠台,Jade', code: 'J' }, { name: 'TVB Plus,TVB Plus', code: 'B' }, { name: '無綫新聞台,TVB News Channel', code: 'C' }, { name: '明珠台,Pearl', code: 'P' }, { name: '千禧經典台,TVB Classic', code: 'CTVC' }, { name: '亞洲劇台,Asian Drama', code: 'CTVS' }, { name: '華語劇台,Chinese Drama', code: 'CDR3' }, { name: '黃金華劇台,Golden Chinese Drama', code: 'TVO' }, { name: '娛樂新聞台,Entertainment News', code: 'CTVE' }, { name: '戲曲台,Chinese Opera Channel', code: 'CCOC' }, { name: 'SUPER Kids Channel,SUPER Kids Channel', code: 'KID' }, { name: 'ZooMoo,ZooMoo', code: 'ZOO' }, { name: 'Nickelodeon,Nickelodeon', code: 'CNIKO' }, { name: 'Nick Jr,Nick Jr', code: 'CNIJR' }, { name: '粵語片台,Classic Movies', code: 'CCLM' }, { name: '美亞電影台,Mei Ah Movie Channel', code: 'CMAM' }, { name: 'Thrill,Thrill', code: 'CTHR' }, { name: '天映經典頻道,CCM', code: 'CCCM' }, { name: '中國電影頻道,China Movie Channel', code: 'CMC' }, { name: 'ROCK Action,ROCK Action', code: 'CRTX' }, { name: 'PopC,PopC', code: 'POPC' }, { name: 'KIX,KIX', code: 'CKIX' }, { name: 'Love Nature HD,Love Nature HD', code: 'LNH' }, { name: 'Love Nature 4K,Love Nature 4K', code: 'LN4' }, { name: 'Global Trekker,Global Trekker', code: 'SMS' }, { name: 'ROCK綜藝娛樂,ROCK Entertainment', code: 'CRTE' }, { name: 'AXN,AXN', code: 'CAXN' }, { name: 'Animax,Animax', code: 'CANI' }, { name: 'tvN,tvN', code: 'CJTV' }, { name: '無線衛星亞洲台,TVBS Asia', code: 'CTS1' }, { name: '創世電視,Creation TV', code: 'CRE' }, { name: 'FashionBox,FashionBox', code: 'FBX' }, { name: 'Mezzo Live HD,Mezzo Live HD', code: 'CMEZ' }, { name: '中央電視台綜合頻道 (港澳版),CCTV-1', code: 'CC1' }, { name: 'CGTN (中國環球電視網)記錄頻道,CGTN Documentary', code: 'CGD' }, { name: 'CGTN (中國環球電視網)英語頻道,CGTN English', code: 'CGE' }, { name: '東方衛視國際頻道,Dragon TV', code: 'DTV' }, { name: '鳳凰衛視中文台,Phoenix Chinese Channel', code: 'PCC' }, { name: '鳳凰衛視資訊台,Phoenix InfoNews Channel', code: 'PIN' }, { name: '鳳凰衛視香港台,Phoenix Hong Kong Channel', code: 'PHK' }, { name: '神州新聞台,Mainland News', code: 'CMN1' }, { name: '無線衛星新聞台,TVBS News', code: 'CTSN' }, { name: '亞洲新聞台,Channel NewsAsia', code: 'CCNA' }, { name: '半島電視台英語頻道,Al Jazeera English', code: 'CJAZ' }, { name: 'France 24,France 24', code: 'CF24' }, { name: 'DW,DW', code: 'CDW1' }, { name: 'NHK World-Japan,NHK World-Japan', code: 'CNHK' }, { name: 'Arirang TV,Arirang TV', code: 'CARI' }, { name: 'myTV SUPER直播足球1台,myTV SUPER Live Soccer 1', code: 'EVT1' }, { name: 'myTV SUPER直播足球2台,myTV SUPER Live Soccer 2', code: 'EVT2' }, { name: 'myTV SUPER直播足球3台,myTV SUPER Live Soccer 3', code: 'EVT3' }, { name: 'myTV SUPER直播足球4台,myTV SUPER Live Soccer 4', code: 'EVT4' }, { name: 'myTV SUPER直播足球5台,myTV SUPER Live Soccer 5', code: 'EVT5' }, { name: 'myTV SUPER直播足球6台,myTV SUPER Live Soccer 6', code: 'EVT6' }, {name: '奧運新聞台,"Olympic News Channel', code: 'ONC'}, {name: '奧運801台,"Olympic 801', code: 'OL01'}, {name: '奧運802台,"Olympic 802', code: 'OL02'}, {name: '奧運803台,"Olympic 803', code: 'OL03'}, {name: '奧運804台,"Olympic 804', code: 'OL04'}, {name: '奧運805台,"Olympic 805', code: 'OL05'}, {name: '奧運806台,"Olympic 806', code: 'OL06'}, {name: '奧運807台,"Olympic 807', code: 'OL07'}, {name: '奧運808台,"Olympic 808', code: 'OL08'}, {name: '奧運809台,"Olympic 809', code: 'OL09'}, {name: '奧運810台,"Olympic 810', code: 'OL10'}, {name: '奧運811台,"Olympic 811', code: 'OL11'}, {name: '奧運812台,"Olympic 812', code: 'OL12'}, {name: '奧運813台,"Olympic 813', code: 'OL13'}, {name: '奧運814台,"Olympic 814', code: 'OL14'}, {name: '奧運815台,"Olympic 815', code: 'OL15'}, {name: '奧運816台,"Olympic 816', code: 'OL16'}];

    const foundChannel = channels.find(channel => channel.name.split(',').some(n => n.trim() === name.trim()));
    return foundChannel ? foundChannel.code : null;
}
