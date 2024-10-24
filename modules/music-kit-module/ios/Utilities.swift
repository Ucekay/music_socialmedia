//
//  Utilities.swift
//  Pods
//
//  Created by 木村優介 on 9/17/24.
//
import MusicKit

@available(iOS 16.0, *)
class Utilities {
    // MARK: - Protocols

    protocol ConvertibleToDict {
        func toDict() -> [String: Any]
    }

    // MARK: - Enums

    enum MediaItem {
        case artist(Artist)
        case album(Album)
        case curator(Curator)
        case musicVideo(MusicVideo)
        case playlist(Playlist)
        case radioShow(RadioShow)
        case recordLabel(RecordLabel)
        case song(Song)
        case station(Station)
        case unknown

        func toDict() -> [String: Any] {
            switch self {
            case .artist(let artist): return artist.toDict()
            case .album(let album): return album.toDict()
            case .curator(let curator): return curator.toDict()
            case .musicVideo(let musicVideo): return musicVideo.toDict()
            case .playlist(let playlist): return playlist.toDict()
            case .radioShow(let radioShow): return radioShow.toDict()
            case .recordLabel(let recordLabel): return recordLabel.toDict()
            case .song(let song): return song.toDict()
            case .station(let station): return station.toDict()
            case .unknown: return ["id": "unknown", "type": "unknown"]
            }
        }
    }

    // MARK: - Static Methods
    static func convertArtwork(_ artwork: Artwork?) -> [String: Any] {
        guard let artwork = artwork else { return [:] }
        return [
            "backgroundColor": artwork.backgroundColor?.toHexString() ?? "",
            "url": artwork.url(width: 400, height: 400)?.absoluteString ?? "",
        ]
    }

    static func convertSuggestion(
        _ suggestion: MusicCatalogSearchSuggestionsResponse.Suggestion
    ) -> [String: Any] {
        return [
            "displayTerm": suggestion.displayTerm,
            "id": suggestion.id,
            "searchTerm": suggestion.searchTerm,
        ]
    }

    static func convertItem(_ item: MusicPersonalRecommendation.Item)
        -> [String: Any]
    {
        switch item {
        case .album(let album): return MediaItem.album(album).toDict()
        case .playlist(let playlist):
            return MediaItem.playlist(playlist).toDict()
        case .station(let station): return MediaItem.station(station).toDict()
        @unknown default: return MediaItem.unknown.toDict()
        }
    }

    static func convertRecommendation(
        _ recommendation: MusicPersonalRecommendation
    ) -> [String: Any] {
        var convertedRecommendation: [String: Any] = [
            "id": recommendation.id.rawValue,
            "title": recommendation.title ?? "Untitled Recommendations",
        ]
        if !recommendation.types.isEmpty {
            convertedRecommendation["types"] = recommendation.types.map {
                String(describing: $0)
            }
            if recommendation.types.count == 1 {
                switch recommendation.types.first {
                case is Album.Type:
                    convertedRecommendation["items"] = recommendation.albums
                        .map { MediaItem.album($0).toDict() }
                case is Playlist.Type:
                    convertedRecommendation["items"] = recommendation.playlists
                        .map { MediaItem.playlist($0).toDict() }

                case is Station.Type:
                    convertedRecommendation["items"] = recommendation.stations
                        .map { MediaItem.station($0).toDict() }

                default:
                    break
                }
            } else {
                convertedRecommendation["items"] = recommendation.items.map(
                    convertItem)
            }
        }
        return convertedRecommendation
    }

    static func convertTopSearchResult(
        _ topResult: MusicCatalogSearchResponse.TopResult
    ) -> [String: Any] {
        switch topResult {
        case .album(let album): return MediaItem.album(album).toDict()
        case .artist(let artist): return MediaItem.artist(artist).toDict()
        case .curator(let curator): return MediaItem.curator(curator).toDict()
        case .musicVideo(let musicVideo):
            return MediaItem.musicVideo(musicVideo).toDict()
        case .playlist(let playlist):
            return MediaItem.playlist(playlist).toDict()
        case .radioShow(let radioShow):
            return MediaItem.radioShow(radioShow).toDict()
        case .recordLabel(let recordLabel):
            return MediaItem.recordLabel(recordLabel).toDict()
        case .song(let song): return MediaItem.song(song).toDict()
        case .station(let station): return MediaItem.station(station).toDict()
        @unknown default: return MediaItem.unknown.toDict()
        }
    }

    static func convertPlaylistTrack(_ track: Track) -> [String: Any] {
        switch track {
        case .song(let song): return MediaItem.song(song).toDict()
        case .musicVideo(let musicVideo):
            return MediaItem.musicVideo(musicVideo).toDict()
        @unknown default: return MediaItem.unknown.toDict()
        }
    }
}

// MARK: - ConvertibleToDict Implementations

@available(iOS 16.0, *)
extension Artist: Utilities.ConvertibleToDict {
    func toDict() -> [String: Any] {
        return [
            "artwork": Utilities.convertArtwork(artwork),
            "id": id.rawValue,
            "name": name,
            "type": "artist",
        ]
    }
}

@available(iOS 16.0, *)
extension Album: Utilities.ConvertibleToDict {
    func toDict() -> [String: Any] {
        return [
            "artistName": artistName,
            "artwork": Utilities.convertArtwork(artwork),
            "id": id.rawValue,
            "title": title,
            "type": "album",
        ]
    }
}

@available(iOS 16.0, *)
extension Curator: Utilities.ConvertibleToDict {
    func toDict() -> [String: Any] {
        return [
            "artwork": Utilities.convertArtwork(artwork),
            "id": id.rawValue,
            "kind": kind,
            "name": name,
            "type": "curator",
        ]
    }
}

@available(iOS 16.0, *)
extension MusicVideo: Utilities.ConvertibleToDict {
    func toDict() -> [String: Any] {
        return [
            "albumTitle": albumTitle ?? "",
            "artistName": artistName,
            "artwork": Utilities.convertArtwork(artwork),
            "id": id.rawValue,
            "title": title,
            "type": "musicVideo",
        ]
    }
}

@available(iOS 16.0, *)
extension Playlist: Utilities.ConvertibleToDict {
    func toDict() -> [String: Any] {
        return [
            "artwork": Utilities.convertArtwork(artwork),
            "curatorName": curatorName ?? "",
            "description": standardDescription ?? "",
            "id": id.rawValue,
            "name": name,
            "type": "playlist",
        ]
    }
}

@available(iOS 16.0, *)
extension RadioShow: Utilities.ConvertibleToDict {
    func toDict() -> [String: Any] {
        return [
            "artwork": Utilities.convertArtwork(artwork),
            "id": id.rawValue,
            "name": name,
            "type": "radioShow",
        ]
    }
}

@available(iOS 16.0, *)
extension RecordLabel: Utilities.ConvertibleToDict {
    func toDict() -> [String: Any] {
        return [
            "artwork": Utilities.convertArtwork(artwork),
            "description": standardDescription ?? "",
            "id": id.rawValue,
            "name": name,
            "type": "recordLabel",
        ]
    }
}

@available(iOS 16.0, *)
extension Song: Utilities.ConvertibleToDict {
    func toDict() -> [String: Any] {
        return [
            "artistName": artistName,
            "artwork": Utilities.convertArtwork(artwork),
            "id": id.rawValue,
            "title": title,
            "type": "song",
        ]
    }
}

@available(iOS 16.0, *)
extension Station: Utilities.ConvertibleToDict {
    func toDict() -> [String: Any] {
        return [
            "artwork": Utilities.convertArtwork(artwork),
            "id": id.rawValue,
            "name": name,
            "type": "station",
        ]
    }
}

extension CGColor {
    func toHexString() -> String {
        guard let components = components, components.count == 4 else {
            return ""
        }

        let r = Int(components[0] * 255.0)
        let g = Int(components[1] * 255.0)
        let b = Int(components[2] * 255.0)
        return String(format: "#%02X%02X%02X", r, g, b)
    }
}
