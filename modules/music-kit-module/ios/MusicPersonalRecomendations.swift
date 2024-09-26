//
//  Muisc.swift
//  Pods
//
//  Created by 木村優介 on 9/12/24.
//
import MusicKit

@available(iOS 16.0, *)
class MusicPersonalRecommendationsManager {

    func getMusicPersonalRecommendations() async throws -> [[String: Any]] {
        let request = MusicPersonalRecommendationsRequest()

        let response = try await request.response()
        return response.recommendations.map(Utilities.convertRecommendation)
    }

}
