import MusicKit

@available(iOS 16.0, *)
class UserLibraryManager {
    private var playlistCache: MusicLibraryResponse<Playlist>?
    private var lastFetchTime: Date?
    private let cacheDuration: TimeInterval = 300
    
    func getUserLibraryPlaylists(forceRefresh: Bool) async throws -> MusicLibraryResponse<Playlist> {
        if !forceRefresh,
           let cache = playlistCache,
           let lastFetch = lastFetchTime,
           Date().timeIntervalSince(lastFetch) < cacheDuration {
            return cache
        }
        let request = MusicLibraryRequest<Playlist>()
        let response = try await request.response()
        
        playlistCache = response
        lastFetchTime = Date()
        
        return response
    }
    
    func getPlaylist(id: String, forceRefresh: Bool = false) async throws -> Playlist? {
        let playlists = try await getUserLibraryPlaylists(forceRefresh: forceRefresh)
        return playlists.items.first {$0.id.rawValue == id}
    }
}
