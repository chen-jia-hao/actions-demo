const cookie = require('cookie')

const SCKEY = process.env.SCKEY
const biliCookie = process.env.COOKIE

// let cookie = 'LIVE_BUVID=AUTO4515451435298818; buvid3=7DF1AC5D-5C22-4FBF-B628-057713D9D3DB189471infoc; rpdid=wdospsopkxpw; fts=1546953353; INTVER=1; _uuid=E838AC91-E4EF-E340-E6B7-A8A1599F3E0582780infoc; CURRENT_FNVAL=80; blackside_state=1; sid=ag65t37s; DedeUserID=268457698; DedeUserID__ckMd5=b4a3d60cb0c342d6; SESSDATA=965b1cf4%2C1622376222%2C592eb*c1; bili_jct=f2a118fc95fb9c9a0320bb4b579ff9d5; CURRENT_QUALITY=80; PVID=1; bsource=search_baidu'
// let biliCookie = 'DedeUserID=268457698;SESSDATA=965b1cf4%2C1622376222%2C592eb*c1;bili_jct=f2a118fc95fb9c9a0320bb4b579ff9d5'
const biliCookieObj = cookie.parse(biliCookie)

biliCookieObj.bili_jct || console.log('cookie 有误，请重新设置')


/**
 * bili及server酱推送的各个api接口地址
 */
class ApiUrl{
  /**
   * @POST
   * server酱 推送地址
   * @type {string}
   */
  static serverPush = `https://sc.ftqq.com/${SCKEY}.send`
  /**
   * @GET
   * 获取登录情况信息
   * @type {string}
   */
  static loginNav = 'https://api.bilibili.com/x/web-interface/nav'
  /**
   * @POST
   * 视频分享
   * @type {string}
   */
  static videoShare = 'https://api.bilibili.com/x/web-interface/share/add'
  /**
   * @POST
   * 投币操作
   * @type {string}
   */
  static coinOperate = 'https://api.bilibili.com/x/web-interface/coin/add'
  /**
   * @GET
   * 获取投币档案信息
   * @type {string}
   */
  static archiveCoins = 'https://api.bilibili.com/x/web-interface/archive/coins'
  /**
   * @GET
   * 获取排行上最受欢迎的视频
   * @type {string}
   */
  static topPopular = 'https://api.bilibili.com/x/web-interface/popular'
  /**
   * @GET
   * 查询当日投币获取的经验数(不包含签到及播放视频的经验)
   * @type {string}
   */
  static getTodayCoinExp = 'https://api.bilibili.com/x/web-interface/coin/today/exp'
  /**
   * @GET
   * 查询经验日志
   * @type {string}
   */
  static expLog = 'https://api.bilibili.com/x/member/web/exp/log'
  /**
   * @GET
   * 查询主站硬币余额
   * @type {string}
   */
  static getCoin = 'https://account.bilibili.com/site/getCoin'
  /**
   * 观看视频
   * @type {string}
   */
  static viewVideo = 'https://api.bilibili.com/x/web-interface/view'
  /**
   * @GET
   * 获取今日奖励情况
   * @type {string}
   */
  static todayReward = 'https://api.bilibili.com/x/member/web/exp/reward'
  /**
   * @POST
   * 上报视频心跳，发送观看进度
   * @type {string}
   */
  static watchVideo = 'https://api.bilibili.com/x/click-interface/web/heartbeat'
  /**
   * @GET
   * 直播签到
   * @type {string}
   */
  static liveSignIn = 'https://api.live.bilibili.com/xlive/web-ucenter/v1/sign/DoSign'
  /**
   * @GET
   * 直播签到
   * @type {string}
   */
  static animeSignIn = 'https://manga.bilibili.com/twirp/activity.v1.Activity/ClockIn'

  /**
   * 校验返回结果是否成功
   * @param jsonRes
   * @returns {boolean}
   */
  static validateCode(jsonRes) {
    return jsonRes.code === 0
  }
}

module.exports = {
  headers: {
    'Content-Type': 'application/json',
    'Connection': 'keep-alive',
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
    'Cookie': biliCookie,
    'Referer': 'https://www.bilibili.com/',
    'origin': 'https://m.bilibili.com',
  },
  postHeaders: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Connection': 'keep-alive',
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
    'Cookie': biliCookie,
    'Referer': 'https://www.bilibili.com/',
    'origin': 'https://m.bilibili.com',
  },
  apiUrl: ApiUrl,
  csrf: biliCookieObj.bili_jct
}
