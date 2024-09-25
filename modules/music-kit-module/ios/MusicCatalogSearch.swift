//
//  MusicCatalogSearch.swift
//  Pods
//
//  Created by 木村優介 on 9/25/24.
//

import MusicKit

@available(iOS 16.0, *)
class MusicCatalogSearchManager {
    func getTopSearchResults(term: String, offset: Int) async throws -> MusicItemCollection<MusicCatalogSearchResponse.TopResult> {
        var request = MusicCatalogSearchRequest(term: term, types: [])
        request.includeTopResults = true
        request.limit = 10
        request.offset = offset
        let response = try await request.response()
        return response.topResults
    }
}
