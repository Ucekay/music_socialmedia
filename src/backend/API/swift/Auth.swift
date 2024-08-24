import ExpoModulesCore
import MusicKit
import Foundation

@objc(MusicKitModule)
public class MusicKitAuth: NSObject, ExpoModulesProvider {
  public func definition() -> ModuleDefinition {
    Name("MusicKitAuth")

    // MusicKit の初期化ステータス
    private var musicKitAuthorizationStatus: MusicAuthorization.Status? = nil

    // Apple Music の機能利用許可をリクエストする
    @ExpoMethod
    Function("requestAuthorization"){(_ resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) -> Void in
          Task {
              do {
                  let status = try await MusicAuthorization.request()
                  resolve(status.rawValue) // 状態を数値として返す
              } catch {
                  reject("MusicKitAuthorizationError", error.localizedDescription, error)
              }
          }
      }

    // 現在の MusicKit 認証状態を取得する
    @ExpoMethod
    Function("getAuthorizationStatus"){(_ resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) -> Void in
      Task {
        let status = MusicAuthorization.currentStatus
        musicKitAuthorizationStatus = status
        resolve(status.rawValue)
      }
    }

    // サブスクリプションのステータスを取得する
    @ExpoMethod
    Funtion("getSubscriptionStatus"){(_ resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) -> Void in
          Task {
              do {
                  // 現在の認証状態を確認
                  let status = MusicAuthorization.currentStatus
                  guard status == .authorized else {
                      reject("MusicKitNotAuthorized", "MusicKit is not authorized.", nil)
                      return
                  }

                  // 現在のストアフロントの国コードを取得
                  guard let currentStorefrontCountryCode = try await MusicKit.currentCountryCode else {
                      reject("StorefrontCountryCodeError", "Failed to get current storefront country code.", nil)
                      return
                  }

                  // サブスクリプションのステータスを取得
                  let subscriptionStatus = try await MusicSubscription.current

                  // subscriptionStatus から必要な情報を取得して JavaScript に返す
                  let statusDictionary: [String: Any] = [
                      "isSubscribed": subscriptionStatus.canPlayCatalogContent,
                      "productType": subscriptionStatus.subscriptionType.rawValue
                  ]
                  resolve(statusDictionary)
              } catch {
                  reject("SubscriptionStatusError", error.localizedDescription, error)
              }
          }
      }


    // 開発者トークンを設定する
    @ExpoMethod
    Function("setDeveloperToken"){(_ developerToken: String, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) -> Void in
      MusicKit.configure(developerToken: developerToken)
      resolve(nil)
    }
  }
}