import MusicKit

@available(iOS 16.0, *)
class UserLibraryManager {
    func getUserLibraryPlaylists() async throws -> MusicLibraryResponse<Playlist> {
        var request = MusicLibraryRequest<Playlist>()
        request.sort(by: \.lastPlayedDate, ascending: false)
        let response = try await request.response()
        return response
    }
    
    func getPlaylist(id: String) async throws -> Playlist? {
        var request = MusicLibraryRequest<Playlist>()
        request.filter(matching: \.id, equalTo: MusicItemID(rawValue: id))
        return try await request.response().items.first
    }
    
    func getPlaylistTracks(id: String) async throws -> MusicItemCollection<Track>? {
        var request = MusicLibraryRequest<Playlist>()
        request.filter(matching: \.id, equalTo: MusicItemID(rawValue: id))
        let playlist = try await request.response().items.first?.with([.tracks])
        let tracks = playlist?.tracks ?? []
        return tracks
    }
}
