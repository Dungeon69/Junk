import 'dart:convert';

import 'package:dio/dio.dart';

class Catflix {
  final String baseUrl = "https://catflix.su/";
  final String juiceUrl = "https://turbovid.eu/api/cucked/juice_key";
  final Dio dio = Dio();

  String decryptHexWithKey(String hex, String key) {
    final binary = hexToBinary(hex);
    return xorDecrypt(binary, key);
  }

  String hexToBinary(String hex) {
    String binary = '';
    for (int i = 0; i < hex.length; i += 2) {
      binary +=
          String.fromCharCode(int.parse(hex.substring(i, i + 2), radix: 16));
    }
    return binary;
  }

  String xorDecrypt(String binary, String key) {
    return String.fromCharCodes(
      List.generate(binary.length, (i) {
        return binary.codeUnitAt(i) ^ key.codeUnitAt(i % key.length);
      }),
    );
  }

  Future<void> getSource() async {
    final iframeResponse =
        await dio.get('${baseUrl}/episodes/the-originals-1x3');
    final String iframeUrl = RegExp(r'<iframe.*?src\s*=\s*"(.*?)"')
        .firstMatch(iframeResponse.data)!
        .group(1)!;

    final options = Options(headers: {'Referer': iframeUrl});

    final multipleResp = await Future.wait([
      dio.get(juiceUrl, options: options),
      dio.get(iframeUrl, options: options)
    ]);

    final String apkey = RegExp(r'apkey\s*=\s*"(.*?)"')
        .firstMatch(multipleResp[1].data)!
        .group(1)!;
    final String xxid = RegExp(r'xxid\s*=\s*"(.*?)"')
        .firstMatch(multipleResp[1].data)!
        .group(1)!;

    final theJuiceResponse = await dio.get(
      'https://turbovid.eu/api/cucked/the_juice/?$apkey=$xxid',
      options: options,
    );

    final source = {
      'url': decryptHexWithKey(jsonDecode(theJuiceResponse.data)["data"],
          jsonDecode(multipleResp[0].data)["juice"]),
      'provider': 'Catflix',
      'headers': {'Referer': iframeUrl.split('embed')[0], "Origin": baseUrl},
    };

    print(source);
  }
}

void main() {
  final catflix = Catflix();
  catflix.getSource();
}
