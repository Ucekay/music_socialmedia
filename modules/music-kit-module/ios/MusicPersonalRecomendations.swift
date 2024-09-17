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
        return response.recommendations.map(convertRecommendation)
    }
    
    private func convertRecommendation(_ recommendation: MusicPersonalRecommendation) -> [String: Any] {
        var convertedRecommendation: [String: Any] = [
            "id": recommendation.id.rawValue,
            "title": recommendation.title ?? "Untitled Recommendations",
        ]
        if !recommendation.types.isEmpty {
            convertedRecommendation["types"] = recommendation.types.map{
                String(describing: $0)
            }
            if recommendation.types.count == 1 {
                switch recommendation.types.first {
                case is Album.Type:
                    convertedRecommendation["items"] = recommendation.albums.map(Utilities.convertAlbum)
                case is Playlist.Type:
                    convertedRecommendation["items"] = recommendation.playlists.map(Utilities.convertPlaylist)
                case is Station.Type:
                    convertedRecommendation["items"] = recommendation.stations.map(Utilities.convertStation)
                default :
                    break
                }
            } else {
                convertedRecommendation["items"] = recommendation.items.map(Utilities.convertItem)
            }
        }
        return convertedRecommendation
    }
}

extension CGColor {
    func toHexString() -> String {
        guard let components = components, components.count == 4 else { return "" }
        
        let r = Int(components[0] * 255.0)
        let g = Int(components[1] * 255.0)
        let b = Int(components[2] * 255.0)
        return String(format: "#%02X%02X%02X", r, g, b)
    }
}
