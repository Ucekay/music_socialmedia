import ExpoModulesCore
import MusicKit

@objc(MusicKitModule)
class MusicKitModule: NSObject, ExpoModulesProvider {
  func getModuleClasses() -> [AnyClass] {
    return [Self.self]
  }

  // MusicKit の初期化ステータス
  private var musicKitAuthorizationStatus: MusicAuthorization.Status? = nil

  // Apple Music の機能利用許可をリクエストする
  @objc
  func requestAuthorization(_ promise: EXPOPromise) {
    Task {
      do {
        let status = try await MusicAuthorization.request()
        self.musicKitAuthorizationStatus = status
        promise.resolve(status.rawValue) // 状態を数値として返す
      } catch {
        promise.reject("MusicKitAuthorizationError", error.localizedDescription)
      }
    }
  }

  // 現在の MusicKit 認証状態を取得する
  @objc
  func getAuthorizationStatus(_ promise: EXPOPromise) {
    let status = MusicKit.authorizationStatus
    musicKitAuthorizationStatus = status
    promise.resolve(status.rawValue)
  }

  // サブスクリプションのステータスを取得する
  @objc
  func getSubscriptionStatus(_ promise: EXPOPromise) {
    Task {
      do {
        if let musicKitAuthorizationStatus,
           musicKitAuthorizationStatus == .authorized,
           let currentStorefrontCountryCode = MusicKit.shared.currentCountryCode {
          let subscriptionStatus = try await MusicData.shared.subscriptionStatus(in: currentStorefrontCountryCode)
          
          // subscriptionStatus から必要な情報を取得して JavaScript に返す
          let statusDictionary: [String: Any] = [
            "isSubscribed": subscriptionStatus.isSubscribed,
            "productType": subscriptionStatus.productType.rawValue
          ]
          promise.resolve(statusDictionary)
        } else {
          promise.reject("MusicKitNotAuthorized", "MusicKit is not authorized.")
        }
      } catch {
        promise.reject("SubscriptionStatusError", error.localizedDescription)
      }
    }
  }

  // 開発者トークンを設定する
  @objc
  func setDeveloperToken(_ developerToken: String, promise: EXPOPromise) {
    MusicKit.configure(developerToken: developerToken)
    promise.resolve(nil)
  }
}