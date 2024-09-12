//
//  MusicSubscriptionManager.swift
//  Pods
//
//  Created by 木村優介 on 9/12/24.
//

import MusicKit
import Foundation

@available(iOS 15.0, *)
class MusicSubscriptionManager: NSObject {
    func checkSubscription()async -> (canPlayCatalogContent: Bool, canBecomeSubscriber: Bool, hasCloudLibraryEnabled: Bool) {
        var musicSubscription: MusicSubscription?
        for await subscripton in MusicSubscription.subscriptionUpdates {
            musicSubscription = subscripton
            break
        }
        let canPlayCatarogContent = musicSubscription?.canPlayCatalogContent ?? false
        let canBecomeSubscriber = musicSubscription?.canBecomeSubscriber ?? false
        let hasCloudLibraryEnabled = musicSubscription?.hasCloudLibraryEnabled ?? false
        return (canPlayCatarogContent, canBecomeSubscriber, hasCloudLibraryEnabled)
    }
}
