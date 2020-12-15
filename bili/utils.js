// let cookie = 'LIVE_BUVID=AUTO4515451435298818; buvid3=7DF1AC5D-5C22-4FBF-B628-057713D9D3DB189471infoc; rpdid=wdospsopkxpw; fts=1546953353; INTVER=1; _uuid=E838AC91-E4EF-E340-E6B7-A8A1599F3E0582780infoc; CURRENT_FNVAL=80; blackside_state=1; sid=ag65t37s; DedeUserID=268457698; DedeUserID__ckMd5=b4a3d60cb0c342d6; SESSDATA=965b1cf4%2C1622376222%2C592eb*c1; bili_jct=f2a118fc95fb9c9a0320bb4b579ff9d5; CURRENT_QUALITY=80; PVID=1; bsource=search_baidu'
let cookie = 'DedeUserID=268457698;SESSDATA=965b1cf4%2C1622376222%2C592eb*c1;bili_jct=f2a118fc95fb9c9a0320bb4b579ff9d5'

module.exports = {
  headers: {
    'Content-Type': 'application/json',
    'Connection': 'keep-alive',
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
    'Cookie': cookie,
    'Referer': 'https://www.bilibili.com/',
    'origin': 'https://m.bilibili.com',
  },
  postHeaders: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Connection': 'keep-alive',
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
    'Cookie': cookie,
    'Referer': 'https://www.bilibili.com/',
    'origin': 'https://m.bilibili.com',
  },
}