//! doesn't have latest data compared to vidsrc

class Catflix {
  baseUrl = "https://catflix.su/";
  juiceUrl = "https://turbovid.eu/api/cucked/juice_key";

  decryptHexWithKey = (hex, key) => {
    const binary = this.hexToBinary(hex);
    return this.xorDecrypt(binary, key);
  };

  hexToBinary = (hex) => {
    let binary = "";
    for (let i = 0; i < hex.length; i += 2) {
      binary += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    return binary;
  };

  xorDecrypt = (binary, key) => {
    return [...binary]
      .map((char, i) =>
        String.fromCharCode(char.charCodeAt(0) ^ key.charCodeAt(i % key.length))
      )
      .join("");
  };

  getSource = async () => {
    try {
      //add required headers. They prolly have cookies.
      /*
      {
        headers: {
          Referer: this.baseUrl,
          Cookie:
            "__ddg8_=AYXNmO5weGv62ktG; __ddg9_=74.197.133.28; __ddg10_=1735889466; __ddg1_=M6o3PosmHClJErrMg2bt; PHPSESSID=1ed9fds7o83i9o1lf0hifat2sn; theme=light",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:133.0) Gecko/20100101 Firefox/133.0",
        },
      }
      */
      const iframe = await fetch(`${this.baseUrl}movie/choke-1299562`)
        .then((resp) => resp.text())
        .then((data) =>
          atob(data.match(/main_origin\s*=\s*['"](.*?)['"];/)[1])
        );
      console.log(iframe);

      const options = { headers: { Referer: iframe } };
      const [juiceData, iframeData] = await Promise.all([
        fetch(this.juiceUrl, options).then((resp) => resp.json()),
        fetch(iframe).then((resp) => resp.text()),
      ]);

      const [apkey, xxid] = [
        iframeData.match(/apkey\s*=\s*['"](.*?)["']/)[1],
        iframeData.match(/xxid\s*=\s*['"](.*?)["']/)[1],
      ];

      const theJuiceData = await fetch(
        `https://turbovid.eu/api/cucked/the_juice/?${apkey}=${xxid}`,
        options
      ).then((resp) => resp.json());

      const source = {
        url: this.decryptHexWithKey(theJuiceData.data, juiceData.juice),
        provider: "Catflix",
        headers: { referer: iframe.split("embed")[0], origin: this.baseUrl },
      };
      //! Requires cors proxy
      //? use my proxy if you want. https://github.com/toasty360/Roxy
      console.log(source);
    } catch (error) {
      console.log(error);
    }
  };
}

const catflix = new Catflix();
catflix.getSource();
