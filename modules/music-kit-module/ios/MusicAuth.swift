import MusicKit

@available(iOS 16.0, *)
class MusicAuthManager {
    func requestAuthorization() async -> String {
        let status = await MusicAuthorization.request()
        switch status {
        case .authorized:
            return "authorized"
        case .denied:
            return "denied"
        case .notDetermined:
            return "notDetermined"
        case .restricted:
            return "restricted"
        @unknown default:
            return "unknown"
        }
    }
}
