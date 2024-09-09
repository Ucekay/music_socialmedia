import ExpoModulesCore
import MusicKit
import Foundation

@objc(MusicKitModule)
public class MusicKitDataAccess: NSObject, ExpoModule {
  // Expo Modules にモジュールを登録
  public func definition() -> ModuleDefinition {
    Name("MusicKitDataAccess")

  // 検索タブでの検索
  @ExpoMethod
  Function("SearchAll"){(term: String, resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) -> Void in
    Task {
        var request = MusicCatalogSearchRequest(term: term, types: [Song.self, Album.self, Artist.self])
        request.limit = 20
      do{
        let response = try await request.response()
        var orderedResults: [String] = []
        
        for item in response.results {
            switch item {
            case let song as Song:
                orderedResults.append(
                  [song.id, song.title, song.albumTitle, song.artistName, song.artwork])
            case let album as Album:
                orderedResults.append(album.id, album.title, album.artistName ,album.artwork)
            case let artist as Artist:
                orderedResults.append(artist.id, artist.name, artist.artwork)
            default:
                break
            }
        }
         resolver(searchResults) 
      } catch {
        rejecter("SEARCH_ERROR", "楽曲検索に失敗しました", error)
      }
    }
  }
  


  //検索歌だけver
  @ExpoMethod
  Function("SearchMusic"){(term: String, resolver: @escaping ExpoMethodResolver, rejecter: @escaping ExpoMethodReject) -> Void in
    Task {
        var request = MusicCatalogSearchRequest(term: term, types: [Song.self])
        request.limit = 20
      do{
        let response = try await request.response()
        let searchResults: [String: Any] = [
                "songs": response.songs,
                "albums": response.albums,
                "artists": response.artists
            ]
         resolver(searchResults) 
      } catch {
        rejecter("SEARCH_ERROR", "楽曲検索に失敗しました", error)
      }
    }
  }


  // 楽曲のIDから詳細情報を取得
  @ExpoMethod
  Function("GetInformationDetails"){(id: String, resolver: @escaping ExpoMethodResolver, rejecter: @escaping ExpoMethodReject) -> Void in
    Task {
        let songId = MusicItemID(id)
        var request = MusicCatalogResourceRequest<Song>(matching: \.id, equalTo: songId)
         songRequest.properties = [
            .artwork,       // ジャケット写真
            .artistName,    // アーティスト名
            .artistURL,     //アーティストのURL
            .albumName,     // アルバム名
            .title          //楽曲名
            // ... その他必要なプロパティ
        ]
      do {
         let response = try await songRequest.response()
            guard let song = response.items.first else {
                rejecter("SONG_NOT_FOUND", "楽曲が見つかりませんでした", nil)
                return
            }

            // 詳細情報を辞書に格納
            var songDetails: [String: String] = [
                "title": song.title,
                "artistName": song.artistName,
                "albumName": song.albumName,
                // ... その他必要なプロパティ
            ]

            // ジャケット写真があればURLを追加
            if let artwork = song.artwork {
                songDetails["artworkUrl"] = artwork.url(width: 300, height: 300)?.absoluteString
            }

            // 辞書をJavaScript側に返す
            resolver(songDetails)          
        }
      } catch {
        rejecter("FETCH_ERROR", "楽曲情報の取得に失敗しました", error)
      }
    }
  }
}
