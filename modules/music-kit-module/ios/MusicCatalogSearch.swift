//
//  MusicCatalogSearch.swift
//  Pods
//
//  Created by 木村優介 on 9/25/24.
//

import MusicKit

@available(iOS 16.0, *)
class MusicCatalogSearchManager {
    func getSearchSuggestions(term: String) async throws
        -> MusicCatalogSearchSuggestionsResponse
    {
        var request = MusicCatalogSearchSuggestionsRequest(
            term: term,
            includingTopResultsOfTypes: [
                Album.self, Artist.self, MusicVideo.self, Playlist.self,
                Song.self,
            ])
        request.limit = 10
        let response = try await request.response()
        return response
    }
    func getTopSearchResults(term: String, offset: Int = 0) async throws
        -> MusicItemCollection<MusicCatalogSearchResponse.TopResult>
    {
        var request = MusicCatalogSearchRequest(term: term, types: [])
        request.includeTopResults = true
        request.limit = 10
        request.offset = offset
        let response = try await request.response()
        return response.topResults
    }
    func serachCatalog(term: String,types: [String],includeTopResults: Bool = false, offset: Int = 0)async throws -> MusicCatalogSearchResponse{
        let typeMap:[String: MusicCatalogSearchable.Type] = [
            "album": Album.self,
            "artist": Artist.self ,
            "musicVideo": MusicVideo.self,
            "playlist": Playlist.self,
            "song": Song.self ,
        ]
        var request = MusicCatalogSearchRequest(term: term, types: types.compactMap{typeMap[$0]})
        request.includeTopResults = includeTopResults
        request.limit = 10
        request.offset = offset
        let response = try await request.response()
        return response
    }
}
