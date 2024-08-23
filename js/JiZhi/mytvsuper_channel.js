function main(item) {
    const url=item.url;
    const res = jz.get("https://content-api.mytvsuper.com/v1/channel/list?platform=android");

    if (!jz.isJSONObject(res)) {
        return { "error": "接口返回格式不正确！" };
    }

    const json = JSON.parse(res);

    let channels = [];
    for (const channel of json.channels) {
        const code = channel.network_code;
        channels.push({ name: channel.name_tc, logo: channel.landscape_poster, tvg: code, sources: [{ url: "http://?code=" + code, license_type: "clearkey", license_key: getKey(code), js: "mytvsuper" }] });

        if (code === "J") {
            channels.push({ name: "翡翠台4K", logo: channel.landscape_poster, tvg: "JUHD", sources: [{ url: "http://?code=JUHD", license_type: "clearkey", license_key: getKey("JUHD"), js: "mytvsuper" }] });
        }
    }

    if (channels.length === 0) {
        return { "error": "未获取到频道列表数据！" };
    } else {
        return { groups: [{ name: "mytvsuper", channels: channels }] };
    }
}

function getKey(code) {
    const json = [
        { code: 'CWIN', key: '0737b75ee8906c00bb7bb8f666da72a0:15f515458cdb5107452f943a111cbe89' },
        { code: 'C18', key: '72de7d0a1850c8d40c5bdf9747a4ca7c:4967537ff0bc8209277160759de4adef' },
        { code: 'TVG', key: '8fe3db1a24969694ae3447f26473eb9f:5cce95833568b9e322f17c61387b306f' },
        { code: 'JUHD', key: '2c045f5adb26d391cc41cd01f00416fa:fc146771a9b096fc4cb57ffe769861be' },
        { code: 'J', key: '0958b9c657622c465a6205eb2252b8ed:2d2fd7b1661b1e28de38268872b48480' },
        { code: 'B', key: '56603b65fa1d7383b6ef0e73b9ae69fa:5d9d8e957d2e45d8189a56fe8665aaaa' },
        { code: 'C', key: '90a0bd01d9f6cbb39839cd9b68fc26bc:51546d1f2af0547f0e961995b60a32a1' },
        { code: 'P', key: 'e04facdd91354deee318c674993b74c1:8f97a629de680af93a652c3102b65898' },
        { code: 'A', key: '91db728a2806d0a0bbb9d92e608f5498:6e96ea66f51b2b9c16c5d6c5b3314a86' },
        { code: 'CTVC', key: '6c308490b3198b62a988917253653692:660578b8966fe8012ad51b9aae7a5d78' },
        { code: 'CTVS', key: 'df5c0e617dffc3e3c44cb733dccb33c0:7d00ec9cd4f54d5baf94c03edc8cfe25' },
        { code: 'CDR3', key: 'baae227b5fc06e2545868d4a1c9ced14:8cd460458b0bdecca5c12791b6409278' },
        { code: 'TVO', key: 'acd93a5f665efd4feadb26f5ed48fd96:c6ce58ef9cce30638e0c2e9fc45a6dbd' },
        { code: 'CTVE', key: '6fa0e47750b5e2fb6adf9b9a0ac431a3:a256220e6c2beaa82f4ca5fba4ec1f95' },
        { code: 'CCOC', key: 'c91c296ef6c46b3f2af1da257553bd17:d6e92d5e594f6f8e494a6e1c9df75298' },
        { code: 'KID', key: '42527ca90ad525ba2eac9979c93d3bca:b730006ad1da48b412ceb1f9e36a833d' },
        { code: 'ZOO', key: '9c302eb50bef5a9589d97cb90982b05e:2603e646caafe22bc4e8a17b5a2dd55b' },
        { code: 'CNIKO', key: '0e69430290ed7b00af4db78419dcad8b:e4769b57a66e8e9737d6d86f317600c0' },
        { code: 'CNIJR', key: '9f1385d2a12a67b572b9d968eb850337:3086bcd49a909606a8686858c05c7e33' },
        { code: 'CCLM', key: '5b90da7fd2f018bf85a757241075626f:75c0897b4cf5ce154ddae86eddb79cd3' },
        { code: 'CMAM', key: 'c5d6f2afbd6b276312b0471a653828e1:ecbbb4a3ffa2200ae69058e20e71e91b' },
        { code: 'CTHR', key: 'b22355363ab2b09a6def54be0c89b9f2:4b196c2bf24b37e82a81031246de6efe' },
        { code: 'CCCM', key: '627b6ca150887912bec47ae4a9b85269:2bf49b2105d20544a6db89c0577b9802' },
        { code: 'CMC', key: 'cabb16d20e71b512f24e9ece0cb09396:2d43505980a22014ee1a476880982308' },
        { code: 'CRTX', key: '358eacad1f06e8e375493dabee96d865:461a02b2eb1232c6c100b95bd0bf40f8' },
        { code: 'CKIX', key: '3b4a44c5ef3217c55a357ad976d328b2:f3355e5a30722e631031b851642c27f1' },
        { code: 'LNH', key: '03fb0f439f942f50d06bf23a511bf4f8:bae7115da07195263e50ae5fc8bbe4f3' },
        { code: 'LN4', key: '037c644cb92137ac5c8d653e952e4c8f:b3b2fcbe576a63cf3bbb9425da3de4cf' },
        { code: 'SMS', key: 'a8f381c2a3114cc6c55f50b6ff0c78f3:86922e5993788488e1eca857c00d4fab' },
        { code: 'CRTE', key: '002d034731b6ac938ea7ba85bc3dc759:6694258c023d73492a10acb860bc6161' },
        { code: 'CAXN', key: '20bea0e14af0d3dcb63d4126e8b50172:07382de357a2b0cceabe82e0b37cb8de' },
        { code: 'GEM', key: '5ff464c783f3a30b3cacab585a3ed42f:2325cbea6cd3ebe9c09d733426bfde7c' },
        { code: 'CANI', key: 'b1a073dbd8272b0c99940db624ce8d74:9fec26ff4c6774a8bde881e5cb0fe82e' },
        { code: 'CJTV', key: 'adcab9e8e5644ff35f04e4035cc6ad3b:d8e879e108a96fde6537c1b679c369b5' },
        { code: 'CTS1', key: 'ad7b06658e8a36a06def6b3550bde35c:b672f89570a630abb1d2abb5030e6303' },
        { code: 'CRE', key: 'adef00c5ba927d01642b1e6f3cedc9fb:b45d912fec43b5bbd418ea7ea1fbcb60' },
        { code: 'FBX', key: '4df52671ef55d2a7ac03db75e9bba2f7:4a3c16e8098c5021f32c7d4f66122477' },
        { code: 'CMEZ', key: 'e46f2747a9cf6822a608786bbc21d400:d8778fcf92c949e949a6700828f5f67e' },
        { code: 'DTV', key: '9d6a139158dd1fcd807d1cfc8667e965:f643ba9204ebba7a5ffd3970cfbc794c' },
        { code: 'PCC', key: '7bca0771ba9205edb5d467ce2fdf0162:eb19c7e3cea34dc90645e33f983b15ab' },
        { code: 'PIN', key: '83f7d313adfc0a5b978b9efa0421ce25:ecdc8065a46287bfb58e9f765e4eec2b' },
        { code: 'PHK', key: 'cde62e1056eb3615dab7a3efd83f5eb4:b8685fbecf772e64154630829cf330a3' },
        { code: 'POPC', key: '221591babff135a71961d09399d2c922:c80ca4c7b801a76a07179dfb7debb57d' },
        { code: 'CC1', key: 'e50b18fee7cab76b9f2822e2ade8773a:2e2e8602b6d835ccf10ee56a9a7d91a2' },
        { code: 'CGD', key: 'b570ae67cb063428b158eb2f91c6d77c:c573dabca79a17f81755c0d4b33384bc' },
        { code: 'CGE', key: '4331903278b673916cc6940a8b8d9e7e:02a409115819de9acd9e907b053e3aa8' },
        { code: 'CMN1', key: '7ee6ed08925f4716c8d0943e7bdb3e5f:6f3c1e31b30ccac36d466f41489ceb27' },
        { code: 'CTSN', key: '73aaeb9e84db423627018017059e0f9d:34148a56250459383f7ef7369073bf39' },
        { code: 'CCNA', key: 'ddc7bb2603628134334919a0d7327d1d:a5fcd8bb852371faedd13b684f5adede' },
        { code: 'CJAZ', key: '80c76105d3ae35dfe25f939d1fb83383:6d76e7ba039773bced47d78e6de4fcf0' },
        { code: 'CF24', key: '2d4f6b8755a918d2126a2ee78791cf0b:c392acc1a1a070d2bcdf518d99d88406' },
        { code: 'CDW1', key: '2bb557c09dfc01a27ab81778913f2a10:d00ca6eb9a83ffde846324109fb445ba' },
        { code: 'CNHK', key: '9c2ecde1c31185ab61ed4689b87ae332:54895a656e053a73b39882e7a56d642b' },
        { code: 'CARI', key: 'f3ae14e72f585eaf14b18d8d9515d43f:ce0e375c3966263877078aadd815742e' },
        { code: 'EVT1', key: 'e8ca7903e25450d85cb32b3057948522:d5db5c03608f5f6c8a382c6abcb829e4' },
        { code: 'EVT2', key: '024f2733fb9afad23490149c601ce47c:034db34d56263c79c7f41448f2a6cfc1' },
        { code: 'EVT3', key: '84f456002b780253dab5534e9713323c:65aeb769264f41037cec607813e91bae' },
        { code: 'EVT4', key: '848d6d82c14ffd12adf4a7b49afdc978:3221125831a2f980139c34b35def3b0d' },
        { code: 'EVT5', key: '54700d7a381b80ae395a312e03a9abeb:7c68d289628867bf691b42e90a50d349' }
    ];
    const data = json.find(item => item.code === code);
    return data ? data.key : null;
}
