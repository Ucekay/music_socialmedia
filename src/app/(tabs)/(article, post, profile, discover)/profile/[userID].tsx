import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Tabs } from 'react-native-collapsible-tab-view';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import UserProfileTop from '@/src/components/UserProfileTop';
import userArticleData from '@/src/assets/userArticleData';
import ArticleCard from '@/src/components/ArticleCard';
import { useLocalSearchParams, Stack, useFocusEffect } from 'expo-router';
import { useHeaderHeight } from '@react-navigation/elements';
import UserProfileTopOfLoginUser from '@/src/components/UserProfileTopOfLoginUser';
import { ArticleData } from '@/src/types';

const TEXT_HEIGHT = 65.7;
const HEADER_HEIGHT = 199;
const itemSize = 320;
const postData = [
  '今日はいい天気ですね！ #天気 #晴れ',
  '新しい映画が公開されました！みなさん見てみてください！ #映画 #公開',
  '昨日の夕食は美味しかったです！家族と一緒に食べる時間は幸せです。',
  '最近読んだ本が面白かったです。おすすめの本があれば教えてください！',
  '今週の予定はいっぱいです。仕事や趣味の時間を大切に過ごしたいです。',
  '友達とのランチは楽しかったです。次回も楽しみです！',
  '今日のニュースに驚きました。世の中の動きは常に変化していますね。',
  '家でゆっくりしています。落ち着いた時間が好きです。',
  '今度の休みはどこに行こうか考え中です。自然の中でリフレッシュしたいです。',
  '今月は忙しいですが、楽しいこともたくさんあります。頑張ります！',
  '新しいアプリが面白そうです。使い方を覚えてみたいです。',
  'おすすめのレストランがあれば教えてください！美味しい食事が楽しみです。',
  '来週の予定を立て中です。計画を立てるのが好きです。',
  '最近は寒くて布団から出たくありません。温かい飲み物が恋しいです。',
  '週末は何をしようか考えています。楽しい時間を過ごしたいです。',
  '友達とのイベントが楽しみです。楽しい思い出を作りたいです。',
  '今日は何をしようか迷っています。いろいろな選択肢がありますね。',
  '映画館に行きたいです。最近の映画が気になります。',
  '今週の目標は何か決めましたか？目標を達成するために頑張りましょう！',
  '最近のお気に入りの曲を教えてください！音楽で心を癒したいです。',
];

const Profile = () => {
  const { userID } = useLocalSearchParams();
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <View style={{ flex: 1, paddingTop: headerHeight }}>
      <Stack.Screen
        options={{
          title: 'Profile',
        }}
      />
      <Tabs.Container
        headerHeight={HEADER_HEIGHT}
        renderHeader={() =>
          userID ? (
            <UserProfileTop />
          ) : (
            <UserProfileTopOfLoginUser id={'@Taro1234'} />
          )
        }
      >
        <Tabs.Tab name='post' label='Post'>
          <Tabs.FlashList
            data={postData}
            renderItem={({ item }) => (
              <View style={{ padding: 16 }}>
                <Text>{item}</Text>
              </View>
            )}
            estimatedItemSize={TEXT_HEIGHT}
            contentContainerStyle={{
              backgroundColor: 'white',
              paddingBottom: tabBarHeight,
              padding: 16,
            }}
          />
        </Tabs.Tab>
        <Tabs.Tab name='article' label='Article'>
          <Tabs.FlashList
            data={userArticleData}
            renderItem={({ item }) => (
              <ArticleCard article={item as ArticleData} />
            )}
            estimatedItemSize={itemSize}
            contentContainerStyle={{
              backgroundColor: 'white',
              paddingBottom: tabBarHeight,
              paddingHorizontal: 16,
            }}
          />
        </Tabs.Tab>
      </Tabs.Container>
    </View>
  );
};
export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
