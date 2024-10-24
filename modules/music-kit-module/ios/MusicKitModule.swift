import ExpoModulesCore
import MusicKit

@available(iOS 16.0, *)
public class MusicKitModule: Module {
    // Each module class must implement the definition function. The definition consists of components
    // that describes the module's functionality and behavior.
    // See https://docs.expo.dev/modules/module-api for more details about available components.
    private let musicAuth = MusicAuthManager()
    private let musicPersonalRecommendations =
        MusicPersonalRecommendationsManager()
    private let musicUserLibrary = UserLibraryManager()
    private let musicCatalogSearch = MusicCatalogSearchManager()

    public func definition() -> ModuleDefinition {
        // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
        // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
        // The module will be accessible from `requireNativeModule('MusicKitModule')` in JavaScript.
        Name("MusicKitModule")

        AsyncFunction("requestMusicAuthorization") { () -> String in
            let currentAuthStatus = MusicAuthorization.currentStatus
            if currentAuthStatus == .authorized {
                return "authorized"
            } else {
                return await musicAuth.requestAuthorization()
            }
        }

        Function("getCurrentMusicAuthStatus") { () -> String in
            return MusicAuthorization.currentStatus.rawValue
        }

        AsyncFunction("getPersonalizedRecommendations") {
            () async throws -> [[String: Any]] in
            return
                try await musicPersonalRecommendations
                .getMusicPersonalRecommendations()
        }

        AsyncFunction("getUserLibraryPlaylists") {
            () async throws -> [[String: Any]] in
            let userLibraryPlaylists =
                try await musicUserLibrary.getUserLibraryPlaylists()
            return userLibraryPlaylists.items.map { Utilities.MediaItem.playlist($0).toDict() }
        }

        AsyncFunction("getUserLibraryPlaylist") {
            (playlistId: String) async throws -> [String: Any] in
            let userLibraryPlaylist = try await musicUserLibrary.getPlaylist(
                id: playlistId)
            return Utilities.MediaItem.playlist(userLibraryPlaylist!).toDict()
        }

        AsyncFunction("getPlaylistTracks") {
            (playlistId: String) async throws -> [[String: Any]] in
            let playlistTracks = try await musicUserLibrary.getPlaylistTracks(
                id: playlistId)
            return playlistTracks!.compactMap(Utilities.convertPlaylistTrack)
        }

        AsyncFunction("getTopSearchResults") {
            (term: String, offset: Int?) async throws -> [[String: Any]] in
            let topResults = try await musicCatalogSearch.getTopSearchResults(
                term: term, offset: offset ?? 0)
            return topResults.map { Utilities.convertTopSearchResult($0) }
        }

        AsyncFunction("getSearchSuggestions") {
            (term: String) async throws
                -> [String : [[String : Any]]] in
            let searchSuggestions =
                try await musicCatalogSearch.getSearchSuggestions(
                    term: term)
            return [
                "suggestions": searchSuggestions.suggestions.map(Utilities.convertSuggestion),
                "topResults": searchSuggestions.topResults.map(
                    Utilities.convertTopSearchResult),
            ]
        }
        
        AsyncFunction("searchCatalog"){(term:String,types:[String],includeTopResults:Bool?, offset:Int?) async throws in
            let result = try await musicCatalogSearch.serachCatalog(term: term, types: types,includeTopResults: includeTopResults ?? false, offset: offset ?? 0)
            print(result)
        }

        View(UserLibraryPlaylistArtworkView.self) {
            Prop("artworkUrl") { (view, artworkUrl: URL) in
                view.loadImage(from: artworkUrl)
            }
        }
    }
}
