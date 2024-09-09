import Foundation
import MusicKit
import ExpoModulesCore

// 音楽再生機能を実装するクラス
@objc(MusicPlayerModule)
public class MusicPlayerModule: NSObject, ExpoModule {
    public func definition() -> ModuleDefinition {
        Name("PlaylistModule")
    
        // 音楽再生を開始する関数
        @ExpoMethod
        Function("play"){(id: String, resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) -> Void in
        // MusicItemID を作成
        guard let musicItemID = MusicItemID(id) else {
            rejecter("Invalid music item ID", nil, nil)
            return 
        }

        // SystemMusicPlayer を取得
        let player = SystemMusicPlayer.shared

        // MusicItemID をもとに音楽アイテムを再生
        player.play(musicItemID, parameters: PlayParameters()) { [weak self] error in // weak self を追加
            guard let self = self else { return }  // 循環参照を防ぐ

            DispatchQueue.main.async {  // メインスレッドで実行
                if let error = error {
                    rejecter("Failed to play song: \(error.localizedDescription)", nil, error)
                } else {
                    resolver(true) 
                }
            }
        }
    }

        // 音楽再生を停止する関数
        @ExpoMethod
        Function("stop"){(resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) -> Void in
            // SystemMusicPlayer を取得
            let player = SystemMusicPlayer.shared

            // 音楽再生を停止
            player.stop { [weak self] error in
                guard let self = self else { return } // weak self を使って循環参照を防ぐ

                DispatchQueue.main.async { // メインスレッドで実行
                    if let error = error {
                        rejecter("Failed to stop playback: \(error.localizedDescription)", nil, error)
                    } else {
                        switch player.playbackStatus {
                        case .stopped:
                            resolver(true)
                        case .paused, .interrupted:
                            rejecter("Playback is already stopped or paused", nil, nil)
                        default:
                            rejecter("Failed to stop playback: Unknown state", nil, nil)
                        }
                    }
                }
            }
        }

        // 次の曲へ進む
        @ExpoMethod
        Function("nextTrack"){(resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) -> Void in
            let player = SystemMusicPlayer.shared
            player.skipToNextEntry { [weak self] error in 
                guard let self = self else { return }
                DispatchQueue.main.async {
                    if let error = error {
                        rejecter("Error skipping to next track", nil, error)
                    } else {
                        resolver(nil)
                    }
                }
            }
        }

        // 曲の最初に戻る
        @ExpoMethod
         Function("Previous") { (resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) in
        let player = SystemMusicPlayer.shared

        func handlePlaybackPosition() async throws {
            let currentTime = player.currentPlaybackTime

            if currentTime <= 3 {
            try await player.skipToPreviousEntry { error in
                DispatchQueue.main.async {
                  if let error = error {
                    rejecter("Error skipping to previous track", nil, error)
                  } else {
                    resolver(nil)
                  }
                }
              }
            } else {
              try await player.restartCurrentEntry { error in
                DispatchQueue.main.async {
                  if let error = error {
                    rejecter("Error restarting current entry", nil, error)
                  } else {
                    resolver(nil)
                }
              }
            }
          }
        }

        Task {
            do {
            try await handlePlaybackPosition()
            resolver(nil)
            } catch {
            rejecter("Error", "Failed to handle playback position", error)
            }
        }
      }
    }
  }