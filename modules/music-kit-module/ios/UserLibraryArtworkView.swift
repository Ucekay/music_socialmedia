//
//  UserLibraryArtworkView.swift
//  Pods
//
//  Created by 木村優介 on 9/20/24.
//

import MusicKit
import UIKit
import ExpoModulesCore

@available(iOS 16.0, *)
class UserLibraryPlaylistArtworkView: ExpoView {
    let imageView = UIImageView()
    
    required init(appContext: AppContext? = nil) {
        super.init(appContext: appContext)
        clipsToBounds=true
        addSubview(imageView)
        imageView.contentMode = .scaleAspectFit
    }
    
    override func layoutSubviews() {
        super.layoutSubviews()
        imageView.frame = bounds
    }
    
    func loadImage(from url: URL) {
        URLSession.shared.dataTask(with: url) {
            data, _, error in
            guard let data = data, error == nil else {
                return
            }
            DispatchQueue.main.async {
                self.imageView.image = UIImage(data: data)
            }
        }.resume()
    }
}
