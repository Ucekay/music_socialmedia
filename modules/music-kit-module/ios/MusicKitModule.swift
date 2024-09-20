import ExpoModulesCore
import MusicKit

@available(iOS 16.0, *)
public class MusicKitModule: Module {
  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
    private let musicAuth = MusicAuthManager()
    private let musicPersonalRecommendations = MusicPersonalRecommendationsManager()
    private let musicUserLibrary = UserLibraryManager()
    
    public func definition() -> ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('MusicKitModule')` in JavaScript.
        Name("MusicKitModule")
        
        AsyncFunction("requestMusicAuthorization") {() -> String in
            let currentAuthStatus = MusicAuthorization.currentStatus
            if currentAuthStatus == .authorized {
                return "authorized"
            } else {
                return await musicAuth.requestAuthorization()
            }
        }
        
        Function("getCurrentMusicAuthStatus") {() -> String in
            return MusicAuthorization.currentStatus.rawValue
        }
        
        AsyncFunction("getPersonalizedRecommendations") {() async throws -> [[String: Any]] in
            return try await musicPersonalRecommendations.getMusicPersonalRecommendations()
        }
          
        AsyncFunction("getUserLibraryPlaylists") {(forceRefresh:Bool) async throws -> [[String: Any]] in
            let userLibraryPlaylists = try await musicUserLibrary.getUserLibraryPlaylists(forceRefresh: forceRefresh)
            let convertedPlaylists = userLibraryPlaylists.items.map{Utilities.convertPlaylist($0)}
            return convertedPlaylists
        }
        
        View(UserLibararyPlaylistArtworkView.self) {
            
        }
    }
}

