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
