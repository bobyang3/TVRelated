function main(item) {
  const url = item.url;
  const field = { url };
  const fieldMaps = {
    '.4gtv.tv': { contains: 'cdn.hinet.net/live/' },
    'mjv003.com': { verify: 'Eighteen_declaration_2023.png' },
    'yeslivetv.com': {
      container: '#iframe,.video-container,iframe',
      contains: '.m3u8,.googlevideo.com/videoplayback',
      filter: 'static-mozai.4gtv.tv'
    },
    'www.ofiii.com': { container: '.player_fixed_section' },
    'www.gdtv.cn': { index: 2 },
    'www.chaojidianshi.net': { filter: 'www.google.com' },
    'huya.com': { contains: '.flv' },
    'douyin.com': { contains: '.flv' },
    'iptv345.com': { contains: 'iptv200.com/play.php?token=' }
  };

  for (const [key, value] of Object.entries(fieldMaps)) {
    if (url.includes(key)) {
      Object.assign(field, value);
      break;
    }
  }

  return jz.getVideo(field);
}