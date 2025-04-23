//! https://hydrahd.me/
//? "https://vidsrc.vip/hydrax.php?id=" + id ==> iframe
const hydrogen = (id) => {
  let C = id
    .toString()
    .split("")
    .map((digit) => "abcdefghij"[parseInt(digit)])
    .join("");
  return btoa(btoa(C.split("").reverse().join("")));
};
const getSource = async (id) => {
  const relieovo = hydrogen(id);
  const urlovo = `https://api2.vidsrc.vip/movie/${relieovo}`;

  const response = await Promise.all([
    (await fetch("https://vid3c.site/subfetch.php?id=" + id)).json(),
    (
      await fetch(urlovo, {
        headers: {
          Referer: "https://vidsrc.vip/",
        },
      })
    ).json(),
  ]);
  const sources = Object.entries(response[1])
    .filter(
      ([key, value]) => value && value.url && value.url.startsWith("https")
    )
    .map(([key, value]) => ({
      label: key,
      file: value.url,
      language: value.language,
      flag: value.flag,
    }));
  console.log({
    sources,
    subtitles: response[0],
  });
};

getSource("912649");
