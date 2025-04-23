function rc4(key, input) {
  let s = [],
    j = 0,
    x,
    res = "";
  for (let i = 0; i < 256; i++) s[i] = i;
  for (let i = 0; i < 256; i++) {
    j = (j + s[i] + key.charCodeAt(i % key.length)) % 256;
    [s[i], s[j]] = [s[j], s[i]];
  }
  i = j = 0;
  for (let y = 0; y < input.length; y++) {
    i = (i + 1) % 256;
    j = (j + s[i]) % 256;
    [s[i], s[j]] = [s[j], s[i]];
    res += String.fromCharCode(input.charCodeAt(y) ^ s[(s[i] + s[j]) % 256]);
  }
  return res;
}

function encodeBase64URL(str) {
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function decodeBase64URL(str) {
  str += "===".slice((str.length + 3) % 4);
  return atob(str.replace(/-/g, "+").replace(/_/g, "/"));
}

const encodeTransforms = [
  (n) => (n + 111) % 256,
  (n) => (n + 212) % 256,
  (n) => n ^ 217,
  (n) => (n + 214) % 256,
  (n) => (n + 151) % 256,
  (n) => ~n & 255,
  (n) => ~n & 255,
  (n) => ~n & 255,
  (n) => (n - 1 + 256) % 256,
  (n) => (n - 96 + 256) % 256,
  (n) => ~n & 255,
  (n) => ~n & 255,
  (n) => (n - 206 + 256) % 256,
  (n) => ~n & 255,
  (n) => (n + 116) % 256,
  (n) => n ^ 70,
  (n) => n ^ 147,
  (n) => (n + 190) % 256,
  (n) => n ^ 222,
  (n) => (n - 118 + 256) % 256,
  (n) => (n - 227 + 256) % 256,
  (n) => ~n & 255,
  (n) => ((n << 4) | (n >>> 4)) & 255,
  (n) => (n + 22) % 256,
  (n) => ~n & 255,
  (n) => (n + 94) % 256,
  (n) => (n + 146) % 256,
  (n) => ~n & 255,
  (n) => (n - 206 + 256) % 256,
  (n) => (n - 62 + 256) % 256,
];

const decodeTransforms = [
  (n) => (n - 111 + 256) % 256,
  (n) => (n - 212 + 256) % 256,
  (n) => n ^ 217,
  (n) => (n - 214 + 256) % 256,
  (n) => (n - 151 + 256) % 256,
  (n) => ~n & 255,
  (n) => ~n & 255,
  (n) => ~n & 255,
  (n) => (n + 1) % 256,
  (n) => (n + 96) % 256,
  (n) => ~n & 255,
  (n) => ~n & 255,
  (n) => (n + 206) % 256,
  (n) => ~n & 255,
  (n) => (n - 116 + 256) % 256,
  (n) => n ^ 70,
  (n) => n ^ 147,
  (n) => (n - 190 + 256) % 256,
  (n) => n ^ 222,
  (n) => (n + 118) % 256,
  (n) => (n + 227) % 256,
  (n) => ~n & 255,
  (n) => ((n >>> 4) | (n << 4)) & 255,
  (n) => (n - 22 + 256) % 256,
  (n) => ~n & 255,
  (n) => (n - 94 + 256) % 256,
  (n) => (n - 146 + 256) % 256,
  (n) => ~n & 255,
  (n) => (n + 206) % 256,
  (n) => (n + 62) % 256,
];

function encode(input) {
  const encoded = encodeURIComponent(input);
  const bytes = Array.from(encoded).map(
    (c, i) =>
      encodeTransforms[i % encodeTransforms.length](c.charCodeAt(0)) & 255
  );
  return encodeBase64URL(String.fromCharCode(...bytes));
}

function decode(input) {
  const decoded = decodeBase64URL(input);
  const bytes = Array.from(decoded).map(
    (c, i) =>
      decodeTransforms[i % decodeTransforms.length](c.charCodeAt(0)) & 255
  );
  return decodeURIComponent(String.fromCharCode(...bytes));
}

console.log(encode("cIu_9A")); // Encoded output
console.log(decode(encode("cIu_9A"))); // Should return original
