//! sorry pal.
import crypto from "crypto-js";
const main = async () => {
  const e = await (
    await fetch("https://vidjoy.pro/server/fastFetch/597?fl=")
  ).text();
  console.log(e);

  console.log(
    JSON.parse(crypto.AES.decrypt(e, "key").toString(crypto.enc.Utf8))
  );
};
main();
