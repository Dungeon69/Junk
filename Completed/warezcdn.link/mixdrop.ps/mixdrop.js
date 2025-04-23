//? mixdrop.ps

const getSource = async (id) => {
  const resp = await fetch("https://mixdrop.ps/e/" + id);
  var cookie = resp.headers.getSetCookie()[0];
  const [csrf, evalFun] = await resp
    .text()
    .then((r) => [
      r.match(/['"]csrf['"]\s*content=['"](.*?)['"]/)[1],
      eval(
        /(eval)(\(function[\s\S]*?)(<\/script>)/s.exec(r)[2].replace("eval", "")
      ),
    ]);

  let url = evalFun.match(/MDCore.wurl=['"](.*?)['"]/)[1];
  let referer = evalFun.match(/MDCore.referrer=['"](.*?)['"]/)[1].trim();

  //! maybe this is not needed
  // const r2 = await fetch("https://mixdrop.ps/e/" + id, {
  //   method: "POST",
  //   body: `referrer=&adblock=0&csrf=${csrf}&a=count`,
  //   headers: {
  //     "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
  //     "X-Requested-With": "XMLHttpRequest",
  //     cookie: cookie,
  //     Referer: "https://mixdrop.ps/e/" + id,
  //     "User-Agent":
  //       "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
  //   },
  // });
  // const json = await r2.json();
  // console.log(json);

  const data = {
    url: url.startsWith("http") ? url : "http:" + url,
    headers: {
      cookie: cookie,
      Referer: referer.length > 0 ? referer : "https://mixdrop.ps/",
    },
  };
  console.log(data);

  // let final =
  //   "https://slave.nopile6577.workers.dev/proxy?url=" +
  //   btoa(data.url) +
  //   "&headers=" +
  //   btoa(JSON.stringify(data.headers));
  // console.log(final);
  // const resp2 = await (
  //   await fetch(data.url, {
  //     headers: data.headers,
  //   })
  // ).blob();
  // console.log(resp2);
};
getSource("wljv9jxoip86d7");
// getSource("mkvj7d9quv0now");
