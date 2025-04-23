// import 'dart:convert';
// import 'dart:async';
// import 'package:dio/dio.dart';
// import 'package:html/parser.dart';

// import '../opensubtiles.com/final.dart';
// import 'clean/extractor.dart';

// class AnimekaiApi {
//   final headers = {
//     "User-Agent":
//         "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:134.0) Gecko/20100101 Firefox/134.0",
//     "Accept": "text/html, */*; q=0.01",
//     "Accept-Language": "en-US,en;q=0.5",
//     "Sec-GPC": "1",
//     "Sec-Fetch-Dest": "empty",
//     "Sec-Fetch-Mode": "cors",
//     "Sec-Fetch-Site": "same-origin",
//     "Priority": "u=0",
//     "Pragma": "no-cache",
//     "Cache-Control": "no-cache",
//     "referer": "https://animekai.to/",
//     "Cookie":
//         "usertype=guest; session=hxYne0BNXguMc8zK1FHqQKXPmmoANzBBOuNPM64a; cf_clearance=WfGWV1bKGAaNySbh.yzCyuobBOtjg0ncfPwMhtsvsrs-1737611098-1.2.1.1-zWHcaytuokjFTKbCAxnSPDc_BWAeubpf9TAAVfuJ2vZuyYXByqZBXAZDl_VILwkO5NOLck8N0C4uQr4yGLbXRcZ_7jfWUvfPGayTADQLuh.SH.7bvhC7DmxrMGZ8SW.hGKEQzRJf8N7h6ZZ27GMyqOfz1zfrOiu9W30DhEtW2N7FAXUPrdolyKjCsP1AK3DqsDtYOiiPNLnu47l.zxK80XogfBRQkiGecCBaeDOJHenjn._Zgykkr.F_2bj2C3AS3A5mCpZSlWK5lqhV6jQSQLF9wKWitHye39V.6NoE3RE",
//   };

//   final AnimekaiDecoder decoder = AnimekaiDecoder();
//   final String proxy = "https://slave.nopile6577.workers.dev/cors?url=";

//   Future<List<Map<String, dynamic>>> getEpisodes(String id) async {
//     final response = await dio.get("https://animekai.to/watch/$id",
//         options: Options(headers: headers));
//     final RegExp regExp =
//         RegExp(r'''class="rate-box".*?data-id\s*=\s*["\'](.*?)["\']''');
//     final dataId = regExp.firstMatch(response.data)?.group(1);
//     if (dataId == null) {
//       throw Exception("Failed to get data-id");
//     }
//     final episodeResponse = await dio.get(
//       'https://animekai.to/ajax/episodes/list?ani_id=$dataId&_=${decoder.generateToken(dataId)}',
//       options: Options(headers: headers),
//     );
//     final episodeHtml = episodeResponse.data['result'];
//     var doc = parse(episodeHtml);

//     final episodes = doc
//         .querySelectorAll('a')
//         .map((ele) => {
//               'number': ele.attributes["num"],
//               'slug': ele.attributes['slug'],
//               'title': ele.querySelector("span")?.text,
//               'id': ele.attributes['token'],
//             })
//         .toList();
//     return episodes;
//   }

//   Future<dynamic> getServers(String id) async {
//     final response = await dio.get(
//         'https://animekai.to/ajax/links/list?token=$id&_=${decoder.generateToken(id)}',
//         options: Options(headers: {
//           ...headers,
//           "X-Requested-With": "XMLHttpRequest",
//         }));
//     final resp = response.data['result'];
//     var doc = parse(resp);
//     final servers = doc.querySelectorAll(".server-items").map((ele) {
//       var type = ele.attributes["data-id"];
//       var servers = ele
//           .querySelectorAll("span")
//           .map((server) => ({
//                 "server": server.text,
//                 "id": server.attributes["data-lid"],
//               }))
//           .toList();

//       return {
//         type: servers,
//       };
//     }).toList();

//     return servers;
//   }

//   Future<Map<String, dynamic>> getSources(String id) async {
//     final response = await dio.get(
//         'https://animekai.to/ajax/links/view?id=$id&_=${decoder.generateToken(id)}',
//         options: Options(headers: {
//           ...headers,
//           "X-Requested-With": "XMLHttpRequest",
//         }));
//     final result = response.data['result'];
//     String url = decoder.decodeIframeData(result).replaceAll(RegExp(r"\\"), "");
//     url = url.replaceAll(RegExp(r'/(e|e2)/'), '/media/');
//     var iframe = jsonDecode(url);

//     final sourcesResponse =
//         await dio.get(iframe["url"], options: Options(headers: headers));
//     final sourcesDecoded = decoder.decode(sourcesResponse.data["result"]);
//     return jsonDecode(sourcesDecoded);
//   }
// }

// void main(List<String> args) async {
//   final stopwatch = Stopwatch();
//   stopwatch.start();
//   var animekai = new AnimekaiApi();
//   var a = await animekai.getSources("mxefmE7zAQ");
//   stopwatch.stop();
//   print(stopwatch.elapsedMilliseconds);
//   print(a);
// }
