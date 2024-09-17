import MusicKit
import SwiftUI
import ExpoModulesCore

@available(iOS 16.0, *)
class UserLibraryManager {
    private var playlisyCache: MusicLibraryResponse<Playlist>?
    private var lastFetchTime: Date?
    private let cacheDuration: TimeInterval = 300
    
    func getUserLibraryPlaylists(forceRefresh: Bool) async throws -> MusicLibraryResponse<Playlist> {
        if !forceRefresh,
           let cache = playlisyCache,
           let lastFetch = lastFetchTime,
           Date().timeIntervalSince(lastFetch) < cacheDuration {
            return cache
        }
        let request = MusicLibraryRequest<Playlist>()
        let response = try await request.response()
        
        playlisyCache = response
        lastFetchTime = Date()
        
        return response
    }
    
    func getPlaylist(id: String, forceRefresh: Bool = false) async throws -> Playlist? {
        let playlists = try await getUserLibraryPlaylists(forceRefresh: forceRefresh)
        return playlists.items.first {$0.id.rawValue == id}
    }
    
}

@available(iOS 16.0, *)
class LibraryPlaylistArtworkView: ExpoView {
    private var hostingController: UIHostingController<LibraryPlaylistArtwork>?
    private(set) var playlistId: String?
    private var height: CGFloat = 100
    private let userLibrary = UserLibraryManager()
    
    required init(appContext: AppContext? = nil) {
        super.init(appContext: appContext)
        clipsToBounds = true
    }
    
    func loadArtwork(for playlistId: String, forceRefresh: Bool = false) {
        self.playlistId = playlistId
        Task {
            await updateArtwork(forceRefresh: forceRefresh)
        }
    }
    
    func updateHeight(_ newHeight: CGFloat) {
        height = newHeight
        Task {
            await updateArtwork()
        }
    }
    
    private func updateArtwork(forceRefresh: Bool = false) async {
        guard let playlistId = playlistId else { return }
        do {
            if let playlist = try await userLibrary.getPlaylist(id: playlistId, forceRefresh: forceRefresh),
               let artwork = playlist.artwork {
                let artworkView = LibraryPlaylistArtwork(artwork: artwork, height: height)
                DispatchQueue.main.async { [weak self] in
                    guard let self = self else { return }
                    if let hostingController = self.hostingController {
                        hostingController.rootView = artworkView
                    } else {
                        let newHostingController = UIHostingController(rootView: artworkView)
                        self.hostingController = newHostingController
                        self.addSubview(newHostingController.view)
                        newHostingController.view.frame = self.bounds
                        newHostingController.view.autoresizingMask = [.flexibleWidth, .flexibleHeight]
                    }
                }
            }
        } catch {
            print("Error loading playlist artwork: \(error)")
        }
    }
}

@available(iOS 16.0, *)
struct LibraryPlaylistArtwork: View {
    let artwork: Artwork
    let height: CGFloat
    
    var body: some View {
        ArtworkImage(artwork, height: height)
    }
}
