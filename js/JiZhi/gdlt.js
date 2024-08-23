function main(item) {
    let play_id = jz.getQuery(item.url, "id");
    let url = 'http://gdcucc-livod.dispatcher.gitv.tv/gitv_live/' + play_id + '/' + play_id + '.m3u8?p=GITV&area=GD_CUCC&gMac';
      
    // 获取网络数据
    let headers = [];
    let res = jz.get(url, headers);
    
    jz.release(1); // 恢复网络请求配置到默认设置

    // 判断返回的数据并处理
    if (jz.isJSONObject(res)) {
        let output = JSON.parse(res);
        let play_url = output.data[0].url;

        // 返回播放地址给播放器
        return { url: play_url };
    } else {
        // 返回错误信息
        return { error: "Invalid response data" };
    }
}
