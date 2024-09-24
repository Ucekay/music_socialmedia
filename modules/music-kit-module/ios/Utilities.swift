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
        guard let artwork = artwork else {return [:]}
        return [
            "url": artwork.url(width: 400, height: 400)?.absoluteString ?? "",
            "backgroundColor": artwork.backgroundColor?.toHexString() ?? "",
        ]
    }
    
    static func convertAlbum(_ album: Album) -> [String: Any] {
        var convertedAlbum:[String: Any] = [
            "type": "album",
            "id": album.id.rawValue,
            "title": album.title,
            "artistName": album.artistName,
        ]
        convertedAlbum["artwork"] = convertArtwork(album.artwork)
        
        return convertedAlbum
    }
    
    static func convertPlaylist(_ playlist: Playlist) -> [String: Any] {
        var convertedPlaylist:[String: Any] = [
            "type": "playlist",
            "id": playlist.id.rawValue,
            "name": playlist.name,
            "curatorName": playlist.curatorName ?? "",
            "discription": playlist.description,
        ]
        convertedPlaylist["artwork"] = convertArtwork(playlist.artwork)
        
        return convertedPlaylist
    }
    
    static func convertStation(_ station: Station) -> [String: Any] {
        var convertedStation:[String: Any] = [
            "type": "station",
            "id": station.id.rawValue,
            "name": station.name,
        ]
        convertedStation["artwork"] = convertArtwork(station.artwork)
        
        return convertedStation
    }
    
    static func convertSong(_ song: Song) -> [String: Any] {
        var convertedSong:[String: Any] = [
            "type": "song",
            "id": song.id.rawValue,
            "title": song.title,
            "artistName": song.artistName,
        ]
        convertedSong["artwork"] = convertArtwork(song.artwork)
        return convertedSong
    }
    
    static func convertItem(_ item: MusicPersonalRecommendation.Item) -> [String: Any] {
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
    
    static func convertPlaylistTrack(_ track: Track) -> [String: Any] {
        switch track {
        case .song(let song):
            return convertSong(song)
        case .musicVideo(let musicVideo):
            return [
                "type": "musicVideo",
                "id": musicVideo.id.rawValue
            ]
        @unknown default:
            return [
                "type": "unknown",
                "id": "unknown"
            ]
        }
    }
    
}
