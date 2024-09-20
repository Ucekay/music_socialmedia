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
class UserLibararyPlaylistArtworkView: ExpoView {
    private var musicItemId: String?
    private var width: CGFloat = 100
    private var forceRefresh: Bool = true
    private var hostingController: UIHostingController<AnyView>?
    
    required init(appContext: AppContext? = nil) {
        super.init(appContext: appContext)
        setUpInitialView()
    }
    
    private func setUpInitialView() {
        let placeHolderView = AnyView(Color.clear.frame(width: width, height: width))
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
    
    private func setMusicItemId(_ musicItemId: String) {
        self.musicItemId = musicItemId
    }
}
