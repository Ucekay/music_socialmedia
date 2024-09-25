//
//  Utilities.swift
//  Pods
//
//  Created by 木村優介 on 9/17/24.
//
import MusicKit
import _MusicKit_SwiftUI

@available(iOS 16.0, *)
class Utilities {
    static func convertArtwork(_ artwork: Artwork?) -> [String: Any] {
        guard let artwork = artwork else { return [:] }
        return [
            "backgroundColor": artwork.backgroundColor?.toHexString() ?? "",
            "url": artwork.url(width: 400, height: 400)?.absoluteString ?? "",
        ]
    }

    static func convertArtist(_ artist: Artist) -> [String: Any] {
        let convertedArtist: [String: Any] = [
            "artwork": convertArtwork(artist.artwork),
            "id": artist.id.rawValue,
            "name": artist.name,
            "type": "artist",
        ]
        return convertedArtist
    }

    static func convertAlbum(_ album: Album) -> [String: Any] {
        let convertedAlbum: [String: Any] = [
            "artistName": album.artistName,
            "artwork": convertArtwork(album.artwork),
            "id": album.id.rawValue,
            "title": album.title,
            "type": "album",
        ]
        return convertedAlbum
    }
    
    static func convertCurator(_ curator: Curator) -> [String: Any] {
        let convertedCurator: [String: Any] = [
            "artwork": convertArtwork(curator.artwork),
            "id": curator.id.rawValue,
            "kind": curator.kind,
            "name": curator.name,
            "type": "curator",
        ]
        return convertedCurator
    }

    static func convertMusicVideo(_ musicVideo: MusicVideo) -> [String: Any] {
        let convertedMusicVideo: [String: Any] = [
            "albumTitle": musicVideo.albumTitle ?? "",
            "artistName": musicVideo.artistName,
            "artwork": convertArtwork(musicVideo.artwork),
            "id": musicVideo.id.rawValue,
            "title": musicVideo.title,
            "type": "musicVideo",
        ]
        return convertedMusicVideo
    }

    static func convertPlaylist(_ playlist: Playlist) -> [String: Any] {
        let convertedPlaylist: [String: Any] = [
            "artwork": convertArtwork(playlist.artwork),
            "curatorName": playlist.curatorName ?? "",
            "description": playlist.standardDescription ?? "",
            "id": playlist.id.rawValue,
            "name": playlist.name,
            "type": "playlist",
        ]
        return convertedPlaylist
    }

    static func convertRadioShow(_ radioShow: RadioShow) -> [String: Any] {
        let convertedRadioShow: [String: Any] = [
            "artwork": convertArtwork(radioShow.artwork),
            "id": radioShow.id.rawValue,
            "name": radioShow.name,
            "type": "radioShow",
        ]
        return convertedRadioShow
    }
    
    static func convertRecordLabel(_ recordLabel: RecordLabel) -> [String: Any] {
        let convertedRecordLabel: [String: Any] = [
            "artwork": convertArtwork(recordLabel.artwork),
            "description": recordLabel.standardDescription ?? "",
            "id": recordLabel.id.rawValue,
            "name": recordLabel.name,
            "type": "recordLabel",
        ]
        return convertedRecordLabel
    }

    static func convertSong(_ song: Song) -> [String: Any] {
        let convertedSong: [String: Any] = [
            "artistName": song.artistName,
            "artwork": convertArtwork(song.artwork),
            "id": song.id.rawValue,
            "title": song.title,
            "type": "song",
        ]
        return convertedSong
    }

    static func convertStation(_ station: Station) -> [String: Any] {
        let convertedStation: [String: Any] = [
            "artwork": convertArtwork(station.artwork),
            "id": station.id.rawValue,
            "name": station.name,
            "type": "station",
        ]
        return convertedStation
    }

    static func convertItem(_ item: MusicPersonalRecommendation.Item)
        -> [String: Any]
    {
        switch item {
        case .album(let album):
            return convertAlbum(album)
        case .playlist(let playlist):
            return convertPlaylist(playlist)
        case .station(let station):
            return convertStation(station)
        @unknown default:
            return [
                "id": "unknown",
                "type": "unknown",
            ]
        }
    }
    
    static func converTopSeatchResult(_ topResult: MusicCatalogSearchResponse.TopResult) -> [String: Any] {
        switch topResult {
        case .album(let album):
            return convertAlbum(album)
        case .artist(let artist):
            return convertArtist(artist)
        case .curator(let curator):
            return convertCurator(curator)
        case .musicVideo(let musicVideo):
            return convertMusicVideo(musicVideo)
        case .playlist(let playlist):
            return convertPlaylist(playlist)
        case .radioShow(let radioShow):
            return convertRadioShow(radioShow)
        case .recordLabel(let recordLabel):
            return convertRecordLabel(recordLabel)
        case .song(let song):
            return convertSong(song)
        case .station(let station):
            return convertStation(station)
        @unknown default:
            return [
                "id": "unknown",
                "type": "unknown",
            ]
        }
    }

    static func convertPlaylistTrack(_ track: Track) -> [String: Any] {
        switch track {
        case .song(let song):
            return convertSong(song)
        case .musicVideo(let musicVideo):
            return convertMusicVideo(musicVideo)
        @unknown default:
            return [
                "id": "unknown",
                "type": "unknown",
            ]
        }
    }

}
