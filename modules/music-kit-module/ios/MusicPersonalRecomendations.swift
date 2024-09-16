//
//  Muisc.swift
//  Pods
//
//  Created by 木村優介 on 9/12/24.
//
import MusicKit

@available(iOS 16.0, *)
class MusicPersonalRecommendationsManager {
    
    func getMusicPersonalRecommendations() async -> Result<[[String: Any]], Error> {
        let request = MusicPersonalRecommendationsRequest()
        do {
            let response = try await request.response()
            return .success(response.recommendations.map(convertRecommendation))
        } catch {
            return .failure(error)
        }
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
                    convertedRecommendation["items"] = recommendation.albums.map(convertAlbum)
                case is Playlist.Type:
                    convertedRecommendation["items"] = recommendation.playlists.map(convertPlaylist)
                case is Station.Type:
                    convertedRecommendation["items"] = recommendation.stations.map(convertStation)
                default :
                    break
                }
            } else {
                convertedRecommendation["items"] = recommendation.items.map(convertItem)
            }
        }
        return convertedRecommendation
    }
    
    private func convertArtwork(_ artwork: Artwork?) -> [String: Any] {
        guard let artwork = artwork else {return [:]}
        return [
            "url": artwork.url(width: 400, height: 400)?.absoluteString ?? "",
            "backgroundColor": artwork.backgroundColor?.toHexString() ?? ""
        ]
    }
    
    private func convertAlbum(_ album: Album) -> [String: Any] {
        var convertedAlbum:[String: Any] = [
            "type": "album",
            "id": album.id.rawValue,
            "title": album.title,
            "artistName": album.artistName,
        ]
        convertedAlbum["artwork"] = convertArtwork(album.artwork)
        
        return convertedAlbum
    }
    
    private func convertPlaylist(_ playlist: Playlist) -> [String: Any] {
        var convertedPlaylist:[String: Any] = [
            "type": "playlist",
            "id": playlist.id.rawValue,
            "name": playlist.name,
            "curatorName": playlist.curatorName ?? "",
        ]
        convertedPlaylist["artwork"] = convertArtwork(playlist.artwork)
        
        return convertedPlaylist
    }
    
    private func convertStation(_ station: Station) -> [String: Any] {
        var convertedStation:[String: Any] = [
            "type": "station",
            "id": station.id.rawValue,
            "name": station.name,
        ]
        convertedStation["artwork"] = convertArtwork(station.artwork)
        
        return convertedStation
    }
    
    private func convertItem(_ item: MusicPersonalRecommendation.Item) -> [String: Any] {
        switch item {
        case .album(let album):
            return convertAlbum(album)
        case .playlist(let playlist):
            return convertPlaylist(playlist)
        case .station(let station):
            return convertStation(station)
        @unknown default:
            return [
                "type": "unknown",
                "id": "unknown"
            ]
        }
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
