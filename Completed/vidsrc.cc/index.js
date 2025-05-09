async function generateVRF(id, userId) {
  const encoder = new TextEncoder();
  const keyData = await crypto.subtle.digest("SHA-256", encoder.encode(userId));

  const key = await crypto.subtle.importKey(
    "raw",
    keyData,
    {
      name: "AES-CBC",
    },
    false,
    ["encrypt"]
  );
  const algo = {
    name: "AES-CBC",
    iv: new Uint8Array(16),
  };
  const buffer = await crypto.subtle.encrypt(algo, key, encoder.encode(id));
  function transform(buffer) {
    const n = String.fromCharCode(...new Uint8Array(buffer));
    return btoa(n).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }
  return transform(buffer);
}

const vrf = await generateVRF("385687", "Bx0IPAQjGHwFIyowBSMMMQQI");
console.log(vrf);

// const resp = await (
//   await fetch(
//     `https://vidsrc.cc/api/385687/servers?id=385687&type=movie&v=RmFzdCBYXzIwMjNfbnVsbA==&vrf=${vrf}`,
//     {
//       headers: {
//         Referer: "https://vidsrc.cc/v2/embed/movie/385687?autoPlay=false",
//         "User-Agent":
//           "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/244.178.44.111 Safari/537.36",
//       },
//     }
//   )
// ).text();
// console.log(resp);
