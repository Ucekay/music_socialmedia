import SwiftUI
import MusicKit
import ExpoModulesCore

// SwiftUIでスライダーを作成
struct PlaybackBar: View {
    @State private var playbackTime: TimeInterval = 0
    @State private var duration: TimeInterval = 0

    var body: some View {
        VStack {
            Slider(value: $playbackTime, in: 0...duration)
                .onAppear {
                    startPlaybackObserver()
                }
        }
    }

    func startPlaybackObserver() {
        let player = MusicPlayer.shared
        Timer.scheduledTimer(withTimeInterval: 1.0, repeats: true) { _ in
            playbackTime = player.currentPlaybackTime
            duration = player.nowPlayingItem?.playbackDuration ?? 0
        }
    }
}

// Expo Modulesでネイティブモジュールを作成
public class MusicKitModule: Module {
    public func definition() -> ModuleDefinition {
        Name("MusicKit")

        Events("onPlaybackUpdate")

        View(PlaybackBar.self) {
            // ここでSwiftUIのViewをExpoに渡します
        }
    }
}
