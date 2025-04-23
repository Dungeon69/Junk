import 'dart:convert';
import 'dart:typed_data';
import 'package:crypto/crypto.dart';
import 'package:dio/dio.dart';
import 'package:encrypt/encrypt.dart' as encrypt;

Map<String, String> headers = {
  "Referer": "https://vidsrc.cc/",
  "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
};

Future<dynamic> _fetchJson(String url, {Map<String, dynamic>? headers}) async {
  final response = await Dio().get(url, options: Options(headers: headers));
  if (response.statusCode != 200) {
    throw Exception('Failed to load page: $url');
  }
  return (response.data);
}

Future<String> generateVRF(String id, String userId) async {
  final keyData = sha256.convert(utf8.encode(userId)).bytes;

  // Step 2: Create AES-CBC key
  final key = encrypt.Key(Uint8List.fromList(keyData));
  final iv = encrypt.IV.fromLength(16); // 16 zero bytes

  // Step 3: Encrypt the id
  final encrypter =
      encrypt.Encrypter(encrypt.AES(key, mode: encrypt.AESMode.cbc));
  final encrypted = encrypter.encrypt(id, iv: iv);

  // Step 4: Transform the output
  final base64 = base64UrlEncode(encrypted.bytes)
      .replaceAll('+', '-')
      .replaceAll('/', '_')
      .replaceAll(RegExp(r'=+$'), '');

  return base64;
}

void main() async {
  var data = await _fetchJson(
      "https://vidsrc.cc/v2/embed/movie/385687?autoPlay=false",
      headers: headers);
  RegExp regExp = RegExp(r'''userId\s*=\s*['"](.*?)['"]''');
  var userId = regExp.firstMatch(data)?.group(1);
  var vrf = await generateVRF("385687", userId!);
  print("vrf: $vrf \nactualVRF: kvbGSDQETb4lX8cD46_CAA \nuserId: $userId");
}
