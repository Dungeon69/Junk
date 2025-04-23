function f(p) {
  var vLS = "";
  for (var vLN0 = 0; vLN0 < p.length; vLN0++) {
    var v = p.charCodeAt(vLN0);
    if (v >= 65 && v <= 90) {
      v = ((v - 65 + 13) % 26) + 65;
    } else if (v >= 97 && v <= 122) {
      v = ((v - 97 + 13) % 26) + 97;
    }
    vLS += String.fromCharCode(v);
  }
  return vLS;
}
function f2(p2) {
  var vA = ["@$", "^^", "~@", "%?", "*~", "!!", "#&"];
  var vP2 = p2;
  for (var vLN02 = 0; vLN02 < vA.length; vLN02++) {
    var v2 = vA[vLN02];
    var v3 = new RegExp(v2.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g");
    vP2 = vP2.replace(v3, "_");
  }
  return vP2;
}
function f3(p3) {
  return p3.split("_").join("");
}
function f4(p4) {
  return atob(p4);
}
function f5(p5, p6) {
  var vA2 = [];
  for (var vLN03 = 0; vLN03 < p5.length; vLN03++) {
    vA2.push(String.fromCharCode(p5.charCodeAt(vLN03) - p6));
  }
  return vA2.join("");
}
function f6(p7) {
  return p7.split("").reverse().join("");
}
function f7(p8) {
  var vF = f(p8);
  var vF2 = f2(vF);
  var vF3 = f3(vF2);
  var vF4 = f4(vF3);
  var vF5 = f5(vF4, 3);
  var vF6 = f6(vF5);
  var vAtob = atob(vF6);
  var v4;
  try {
    v4 = JSON.parse(vAtob);
  } catch (e) {
    console.error("JSON parse error:", e);
    v4 = {};
  }
  return v4;
}
const main = async () => {
  const resp = await fetch("https://richardsignfish.com/e/ueof3kkmzcal");
  const text = await resp.text();
  const MKGMa = text.match(/MKGMa="(.*?)";/s);
  console.log(f7(MKGMa[1]));
};

await main();
