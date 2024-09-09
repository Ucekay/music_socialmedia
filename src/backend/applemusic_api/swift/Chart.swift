import ExpoModulesCore
import MusicKit

public class ChartModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ChartModule")

    // Apple Music のプレイリストを作成する関数
    @ExpoMethod
    Function("fetchTopCharts"){(_ genre: String, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        Task {
            do {
                guard let genre = Genre(name: genre) else {
                    reject("Invalid genre", "The provided genre is not valid", nil)
                    return
                }
                let request = MusicCatalogChartsRequest(genre: genre, kinds: [.songs], types: [Song.self])
                let response = try await request.response()
                let topSongs = response.songs.map { $0.id.rawValue }
                resolve(topSongs)
            } catch {
                reject("Failed to fetch top charts", error.localizedDescription, error)
            }
        }
    }
    }

    @ExpoMethod
    Function("fetchPersonalizedRecommendations"){(_ resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        Task {
            do {
                let request = MusicPersonalRecommendationsRequest()
                let response = try await request.response()
                let recommendations = response.items.map { $0.id.rawValue }
                resolve(recommendations)
            } catch {
                reject("Failed to fetch personalized recommendations", error.localizedDescription, error)
            }
        }
    }
    }
  }
}