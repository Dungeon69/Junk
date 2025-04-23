const baseUrl = "https://embed.warezcdn.link/";
const makeRequest = async (url) => {
  const response = await fetch(url, {
    headers: {
      Referer: baseUrl,
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
    },
  });
  const data = await response.text();
  return data;
};
const makePost = async (getPlay) => {
  let url = new URL(getPlay);
  const hash = url.pathname.split("/").pop();
  const postUrl = `${url.protocol}//${url.hostname}/player/index.php?data=${hash}&do=getVideo`;
  const data = await (
    await fetch(postUrl, {
      body: `hash=${hash}&r=${baseUrl}`,
      method: "POST",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
    })
  ).json();
  return data;
};

const main = async () => {
  const getEmbed = await makeRequest(
    baseUrl + "getEmbed.php?id=242794&sv=warezcdn&lang=1"
  ).then((resp) => resp);

  console.log(getEmbed);

  const getPlay = await makeRequest(
    getEmbed.startsWith("http") ? getEmbed : baseUrl + getEmbed
  ).then((resp) => resp.match(/window.location.href\s*=\s*['"](.*?)['"];/)[1]);

  const data = await makePost(getPlay);
  console.log(data);
};
main();
