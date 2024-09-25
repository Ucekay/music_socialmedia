//
//  MusicCatalogSearch.swift
//  Pods
//
//  Created by 木村優介 on 9/25/24.
//

import MusicKit

@available(iOS 16.0, *)
class MusicCatalogSearchManager {
    func search(term: String) async throws {
        let request = MusicCatalogSearchRequest(term: term, types: [Artist.self, Album.self, MusicVideo.self, Playlist.self, Song.self, Station.self])
        let response = try await request.response()
        print(response)
    }
}
