import MusicKit

@available(iOS 16.0, *)
class UserLibraryManager {
    private var playlistCache: MusicLibraryResponse<Playlist>?
    private var lastFetchTime: Date?
    private let cacheDuration: TimeInterval = 300
    
    func getUserLibraryPlaylists(refreshCache: Bool) async throws -> MusicLibraryResponse<Playlist> {
        if !refreshCache,
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
    
    func getPlaylist(id: String, refreshCache: Bool = false) async throws -> Playlist? {
        let playlists = try await getUserLibraryPlaylists(refreshCache: refreshCache)
        return playlists.items.first {$0.id.rawValue == id}
    }
}
