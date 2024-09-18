import MusicKit
import SwiftUI
import ExpoModulesCore

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

@available(iOS 16.0, *)
class LibraryPlaylistArtworkView: ExpoView {
    private var hostingController: UIHostingController<AnyView>?
    private(set) var playlistId: String?
    private var height: CGFloat = 100
    private let userLibrary = UserLibraryManager()
    
    required init(appContext: AppContext? = nil) {
        super.init(appContext: appContext)
        clipsToBounds = true
        setupInitialView()
    }
    
    private func setupInitialView() {
        let placeholderView = AnyView(Color.clear.frame(width: height, height: height))
        let hostingController = UIHostingController(rootView: placeholderView)
        self.hostingController = hostingController
        addSubview(hostingController.view)
        hostingController.view.frame = bounds
        hostingController.view.autoresizingMask = [.flexibleWidth, .flexibleHeight]
    }
    
    override func layoutSubviews() {
        super.layoutSubviews()
        hostingController?.view.frame = bounds
    }
    
    func loadArtwork(for playlistId: String, forceRefresh: Bool = false) {
        self.playlistId = playlistId
        Task {
            await updateArtwork(forceRefresh: forceRefresh)
        }
    }
    
    func updateHeight(_ newHeight: CGFloat) {
        height = newHeight
        updateArtworkView()
    }
    
    private func updateArtwork(forceRefresh: Bool = false) async {
         guard let playlistId = playlistId else { return }
         do {
             if let playlist = try await userLibrary.getPlaylist(id: playlistId, forceRefresh: forceRefresh),
                let artwork = playlist.artwork {
                 DispatchQueue.main.async { [weak self] in
                     self?.updateArtworkView(with: artwork)
                 }
             }
         } catch {
             print("Error loading playlist artwork: \(error)")
         }
     }
     
     private func updateArtworkView(with artwork: Artwork? = nil) {
         let artworkView: AnyView
         if let artwork = artwork {
             artworkView = AnyView(
                 ArtworkImage(artwork, width: height)
                     .frame(width: height, height: height)
             )
         } else {
             artworkView = AnyView(Color.clear.frame(width: height, height: height))
         }
         
         if let hostingController = hostingController {
             hostingController.rootView = artworkView
         } else {
             let newHostingController = UIHostingController(rootView: artworkView)
             hostingController = newHostingController
             addSubview(newHostingController.view)
             newHostingController.view.frame = bounds
             newHostingController.view.autoresizingMask = [.flexibleWidth, .flexibleHeight]
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
