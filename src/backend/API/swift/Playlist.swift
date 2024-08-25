import ExpoModulesCore
import MusicKit

public class PlaylistModule: Module {
  public func definition() -> ModuleDefinition {
    Name("PlaylistModule")

    // Apple Music のプレイリストを作成する関数
    @ExpoMethod
    Function("createPlaylist"){(name: String, description: String, items:[MusicItemID], resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) -> Void in
        // ユーザーの認証状態を確認
        guard MusicAuthorization.currentStatus == .authorized else {
            rejecter("Music authorization required.", nil, nil)
            return
        }

        Task{
            do{
                // MusicLibraryのインスタンスを取得
                let musicLibrary = MusicLibrary.shared
                // プレイリストを作成
                let playlist = try await musicLibrary.createPlaylist(name: name, description: description, items: playlistItems)
                // 成功時にプレイリスト情報を返す
                resolver(["name": playlist.name, "id": playlist.id])
            } catch {
                // エラー時にエラーメッセージを返す
                rejecter("CREATE_PLAYLIST_ERROR", "プレイリストの作成中にエラーが発生しました", error)

            }
        }
    }

    // Apple Music からプレイリストを読み込む関数
    @ExpoMethod
    Function("getPlaylists"){(resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) -> Void in
        // ユーザーの認証状態を確認
        guard MusicAuthorization.currentStatus == .authorized else {
            rejecter("Music authorization required.", nil, nil)
            return
        }
        Task {
            do {
                // MusicLibraryのインスタンスを取得
                var request = MusicLibraryRequest<Playlist>()

                // リクエストを実行してプレイリストを取得
                let response = try await request.response()

                // プレイリスト情報を配列に変換
                let playlistArray = response.items.map { playlist in
                    return ["name": playlist.name, "id": playlist.id]
                }

                // 成功時にプレイリスト情報を返す
                resolver(playlistArray)
            } catch {
                // エラー時にエラーメッセージを返す
                rejecter("GET_PLAYLISTS_ERROR", "プレイリストの取得中にエラーが発生しました", error)
            }
        }
    }


       

    // プレイリストに曲を追加する関数
    @ExpoMethod
    Function("addMusicToPlaylist"){(playlistId: MusicItemID, musicIds: [MusicItemID], resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) -> Void in
        
        Task {
            do{ 
                // プレイリストを取得するリクエストを作成
                var request = MusicLibraryRequest<Playlist>()
                request.filter(matching: \.id, equalTo: playlistID)

                // リクエストを実行してプレイリストを取得
                let response = try await request.response()

                // プレイリストが存在するか確認
                guard let playlist = response.items.first else {
                    throw NSError(domain: "PlaylistNotFound", code: 404, userInfo: nil)
                }
                
                var updatedPlaylist = playlist
                for item in musicIds {
                // アイテムをプレイリストに追加
                let updatedPlaylist = try await musicLibrary.add(item, to: updatedPlaylist)   
                }

                // 成功時に更新されたプレイリスト情報を返す
                resolver(["name": updatedPlaylist.name, "id": updatedPlaylist.id])
            } catch {
                // エラー時にエラーメッセージを返す
                rejecter("ADD_ITEM_ERROR", "プレイリストにアイテムを追加中にエラーが発生しました", error)
            }
        }
    }


    //プレイリストを編集する関数
    @ExpoMethod
    Function("editPlaylist"){(playlistID: MusicItemID, name: String?, description: String?, authorDisplayName: String?, items: [MusicItemID], resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) -> Void in
        Task {
            do {
                // プレイリストを取得するリクエストを作成
                var request = MusicLibraryRequest<Playlist>()
                request.filter(matching: \.id, equalTo: playlistID)

                // リクエストを実行してプレイリストを取得
                let response = try await request.response()

                // プレイリストが存在するか確認
                guard let playlist = response.items.first else {
                    throw NSError(domain: "PlaylistNotFound", code: 404, userInfo: nil)
                }

                // プレイリストを編集
                let updatedPlaylist = try await musicLibrary.edit(playlist, name: name, description: description, authorDisplayName: authorDisplayName, items: items)

                // 成功時に更新されたプレイリスト情報を返す
                resolver(["name": updatedPlaylist.name, "id": updatedPlaylist.id])
            } catch {
                // エラー時にエラーメッセージを返す
                rejecter("EDIT_PLAYLIST_ERROR", "プレイリストの編集中にエラーが発生しました", error)
            }
        }
    }
  }
}
