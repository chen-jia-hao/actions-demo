const axios = require('axios')
const qs = require('qs')
const {random} = require('lodash')
const {headers, postHeaders, apiUrl, csrf} = require('./utils')
const {format, isToday, parseISO} = require('date-fns')

let userInfo
let dailyLog = ''
let topVideoList = []

function log(step, content) {
  let sc = `[${step}]-${content}`
  dailyLog += (sc + '\n')
  console.log(sc)
}

function logEnd() {
  let s = `${'-'.repeat(5)} 任务结束 ${'-'.repeat(5)}`;
  dailyLog += (s + '\n')
  console.log(s)
}

async function serverLogPush() {
  let data = {
    text: 'bili任务日志',
    desp: `${dailyLog}`
  }
  try {
    let res = await axios.post(apiUrl.serverPush, qs.stringify(data))
    console.log(res.data)
  } catch (e) {
    console.log('sever酱推送失败，请检查sckey的配置是否有误 url:' + apiUrl.serverPush, e)
  }
}

async function loginCheck() {
  try {
    const response = await axios.get(apiUrl.loginNav, {headers});
    console.log(response.data);
    userInfo = response.data.data
    return apiUrl.validateCode(response.data) && response.data.data.isLogin
  } catch (e) {
    console.log('登陆异常, Cookies可能失效了, 请检查配置\n' + e.toString())
    return false
  }
}

async function getTopVideoList(ps = 20, pn = 1) {
  try {
    let response = await axios.get('https://api.bilibili.com/x/web-interface/popular', {
      params: {
        ps: ps,
        pn: pn,
      },
      headers,
    });
    if (apiUrl.validateCode(response.data.code)) {
      console.log(response.data);
      topVideoList = response.data.data.list
      return response.data.data.list
    }
  } catch (e) {
    log('获取排行视频失败' + e.toString())
    return []
  }
}

async function watchVideo(bvid) {
  let params = {
    bvid: bvid,
    played_time: random(20, 60),
  }
  let response = await axios.post(apiUrl.watchVideo,
    qs.stringify(params),
    {headers: postHeaders},
  );
  if (!apiUrl.validateCode(response.data)) {
    console.log('观看视频失败')
  }
  // share video
  let params2 = {
    bvid: bvid,
    csrf: csrf,
  }
  let response2 = await axios.post('https://api.bilibili.com/x/web-interface/share/add',
    qs.stringify(params2),
    {headers: postHeaders},
  );
  if (!apiUrl.validateCode(response2.data)) {
    console.log('分享视频失败')
  }
}

async function liveSignIn() {
  let response = await axios.get(apiUrl.liveSignIn, {headers});
  if (apiUrl.validateCode(response.data)) {
    console.log('直播签到成功', response.data)
  } else {
    console.log('直播签到失败', response.data)
  }
}

async function animeSignIn() {
  let params = {
    platform: 'ios',
  }
  try {
    let response = await axios.post(apiUrl.animeSignIn,
      qs.stringify(params),
      {headers: postHeaders},
    );
    if (apiUrl.validateCode(response.data)) {
      console.log('哔哩哔哩漫画签到成功');
    }
  } catch (e) {
    console.log('签到出错', e.toString(), '哔哩哔哩漫画已经签到过了');
  }
}

async function ifCoin(bvid) {
  let response = await axios.get(apiUrl.archiveCoins, {
    params: {
      bvid: bvid
    },
    headers
  });
  if (apiUrl.validateCode(response.data)) {
    return response.data.data.multiply === 0
  }
}

async function coinAdd(bvid) {
  let b = await ifCoin(bvid);
  if (b) {
    let params = {
      bvid: bvid,
      multiply: 1,
      select_like: 1,
      cross_domain: true,
      csrf: csrf,
    }
    let response = await axios.post(apiUrl.coinOperate,
      qs.stringify(params),
      {headers: postHeaders},
    );
    if (apiUrl.validateCode(response.data)) {
      console.log(`add ${bvid} cion ok`)
      return true
    }
  } else {
    console.log(`已经给 ${bvid} 投过币了`)
    return false
  }
}

async function coinOps(videoList = []) {
  let ids = videoList.map(value => value.bvid);
  let successTotal = 0
  for (let i = 0; i < 10; i++) {
    let b = await coinAdd(ids.shift());
    let todayCoinExp = await getTodayCoinExp();
    if (b) {
      successTotal++
    }
    //投币数量大于等于5或者今日投币获取的经验大于等于50就退出
    if (successTotal >= 5 || todayCoinExp >= 50) {
      console.log('投币完成')
      break
    }
  }
}

async function getTodayCoinExp() {
  let response = await axios.get(apiUrl.getTodayCoinExp, {headers});
  if (apiUrl.validateCode(response.data)) {
    return response.data.data
  }
}

async function summary() {
  try {
    let response = await axios.get(apiUrl.expLog, {
      params: {
        jsonp: 'jsonp'
      },
      headers,
    });
    if (apiUrl.validateCode(response.data)) {
      return response.data.data.list
    }
  } catch (e) {
    console.log(e);
  }
}

async function dailyJob() {
  let step = 1
  log(step, '登陆操作')
  const isLogin = await loginCheck();
  logEnd()
  //获取视频
  let videoList = await getTopVideoList();
  console.log(videoList);
  if (isLogin) {
    console.log('登陆操作成功')
    step++
    log(step, '观看及分享视频')
    await watchVideo(videoList[random(0, videoList.length - 1)].bvid)
    logEnd()

    step++
    log(step, '直播每日签到')
    await liveSignIn()
    logEnd()

    step++
    log(step, '漫画签到')
    await animeSignIn()
    logEnd()

    step++
    log(step, '投币任务')
    await coinOps(videoList)
    logEnd()

    step++
    log(step, '获取今日任务情况')
    const expLogs = await summary();
    let todayExpList = expLogs.filter(v => isToday(parseISO(v.time)));
    console.log(todayExpList);
    let todayExpTotal = todayExpList.map(v => v.delta)
      .reduce((v1, v2) => v1 + v2, 0);
    log(step, todayExpTotal);
    logEnd()

    await serverLogPush()

  } else {
    console.log('登陆操作失败')
  }

  return dailyLog
}

// dailyJob().then(console.log)

module.exports = {
  dailyJob
}
