//
//  UserLibraryArtworkView.swift
//  Pods
//
//  Created by 木村優介 on 9/20/24.
//

import SwiftUI
import MusicKit
import ExpoModulesCore

@available(iOS 16.0, *)
class UserLibraryPlaylistArtworkView: ExpoView {
    private var musicItemId: String?
    private var width: CGFloat = 100
    private var refreshCache: Bool?
    private var hostingController: UIHostingController<AnyView>?
    
    private var userLibrary = UserLibraryManager()
    
    required init(appContext: AppContext? = nil) {
        super.init(appContext: appContext)
        setUpInitialView()
    }
    
    private func setUpInitialView() {
        let placeHolderView = AnyView(Color.red.frame(width: self.width, height: self.width))
        let hostingController = UIHostingController(rootView: placeHolderView)
        self.hostingController = hostingController
        addSubview(hostingController.view)
        hostingController.view.frame = bounds
        hostingController.view.autoresizingMask = [.flexibleWidth, .flexibleHeight]
    }
    
    override func layoutSubviews() {
        super.layoutSubviews()
        hostingController?.view.frame = bounds
    }
    
    func setMusicItemId(_ musicItemId: String) {
        self.musicItemId = musicItemId
        Task {
            await renderArtwork()
        }
    }
    
    func setWidth(_ width: CGFloat) {
        self.width = width
        Task {
            await renderArtwork()
        }
    }
    
    func setRefreshCache(_ refreshCache: Bool) {
        self.refreshCache = refreshCache
        Task {
            await renderArtwork()
        }
    }
    
    private func renderArtwork() async {
        if let musicItemId = self.musicItemId, let refreshCachce = self.refreshCache, let appContext {
            do {
                let playlist = try await userLibrary.getPlaylist(id: musicItemId, refreshCache: refreshCache!)
                let artworkImage = AnyView(ArtworkImage((playlist?.artwork)!, width: self.width))
                hostingController?.rootView = artworkImage
                setNeedsLayout()
            } catch {
                let placeHolderView = AnyView(Text("Artwork not available."))
                hostingController?.rootView = placeHolderView
                setNeedsLayout()
            }
        } else {
            let placeHolderView = AnyView(Color.clear)
            hostingController?.rootView = placeHolderView
            setNeedsLayout()
        }
    }
}
