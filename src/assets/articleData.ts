const articleData = [
  {
    articleID: 'art001',
    articleTitle: 'メロディの魔法',
    articleBody: '新しいメロディがどのようにして生まれるか...',
    songName: '喜劇',
    artistName: '星野源',
    imageUrl:
      'https://www.jvcmusic.co.jp/img/jackets/VE3WA-19681.jpg?_c=da1f6d2bf43846614a60e7d4c8163155',
    userID: '@Taro1234',
    user: 'たろう',
    userAvatarUrl: 'https://api.dicebear.com/8.x/pixel-art/png',
    type: 'review',
  },
  {
    articleID: 'art002',
    articleTitle: '閃光ライオット2023 ライブレポート 一組目 Blue Mash',
    articleBody:
      'みなさんこんにちは。otozureライターのネコです。今回は8月7日にZepp DiverCity (TOKYO)で行われた『マイナビ閃光ライオット2023produced by SCHOOL OF LOCK!』の感想を書いていきます！だいぶ前に行われた閃光ライオットですが、最近その映像を見られるようになったので是非見てほしい！ということで一組ずつ、一曲ずつ魅力を語っていきたいと思います！',
    artistName: 'Blue Mash',
    eventName: '閃光ライオット2023',
    imageUrl:
      'https://assets.st-note.com/production/uploads/images/118769644/rectangle_large_type_2_dfac95fd8fb3ca429c798b9656b2c54d.png?width=2000&height=2000&fit=bounds&format=jpg&quality=85',
    userID: '@rhythmsecret002',
    user: 'BeatMaster',
    userAvatarUrl: 'https://api.dicebear.com/8.x/lorelei/png',
    type: 'live report',
  },
  {
    articleID: 'art003',
    articleTitle:
      '流行のバンドに聴く時代と人々　第一回【90年代後半】　前編　Vの旋風',
    articleBody:
      'こんにちは。今回は、少々趣向を変えようということで流行のバンドに見る時代と人々というテーマで記事を書いていきます!\n回によって時代が前後すると思いますが、今回は、90年代後半についてです。\nさて、この記事を読んでくださる方々の年代が、よくわからないので、なんとも言えないのですが。もしかしたら、自分たちの時代だという人かもしれませんね。もちろん、世代や住んでいた地域によって多少の違いがあるということはご理解くださいね🙇',
    imageUrl:
      'https://assets.st-note.com/production/uploads/images/119567308/rectangle_large_type_2_64867acd466f0affc7c9fa6020ecd244.png?width=2000&height=2000&fit=bounds&format=jpg&quality=85',
    userID: '@hNinjaX',
    user: '忍者X',
    userAvatarUrl: 'https://api.dicebear.com/8.x/bottts/png',
    type: 'general',
  },
  {
    articleID: 'art004',
    articleTitle: 'LiSAの世界へようこそ！',
    articleBody:
      'LiSAの魅力が詰まった10曲を集めたプレイリストです。彼女のパワフルなボーカルと心を打つメロディーで、あなたの日常に活力を与えましょう！',
    artistName: 'LiSA',
    songCount: '10曲',
    imageUrl:
      'https://m.media-amazon.com/images/I/71GJUXIF6QL._UF1000,1000_QL80_.jpg',
    userID: '@Yumi789',
    user: 'ゆみちゃん',
    userAvatarUrl: 'https://api.dicebear.com/8.x/personas/png',
    type: 'playlist',
  },
  {
    articleID: 'art005',
    articleTitle: '第一回 愛美 LIGHTS ～Cで伝える勇気～ ネコの気まぐれ楽曲紹介',
    articleBody:
      'みなさんこんにちは。otozureライターのネコです。今回は不定期楽曲紹介。自分が良いと思った音楽を一曲ワンテーマでお話していこうと思います！記念すべき第一回は愛美さんの「LIGHTS」です！まだ聴いたことのない方はぜひ一度聴いてみてください！',
    songName: '愛美',
    artistName: 'LIGHTS',
    imageUrl:
      'https://imgs.ototoy.jp/imgs/jacket/1083/00050800.1638931680.7485_320.jpg',
    userID: '@TokyoGhoul',
    user: '東京喰種👹',
    userAvatarUrl: 'https://api.dicebear.com/8.x/notionists/png',
    type: 'review',
  },
  {
    articleID: 'art006',
    articleTitle: '閃光ライオット2023 ライブレポート 二組目 三四少女',
    articleBody:
      'みなさんこんにちは。otozureライターのネコです。今回も引き続き8月7日にZepp DiverCity (TOKYO)で行われた『マイナビ閃光ライオット2023produced by SCHOOL OF LOCK!』の感想を書いていきます！\nだいぶ前に行われた閃光ライオットですが、最近その映像を見られるようになったので是非見てほしい！ということで一組ずつ、一曲ずつ魅力を語っていきたいと思います！',
    artistName: '三四少女',
    eventName: '閃光ライオット2023',
    imageUrl:
      'https://assets.st-note.com/production/uploads/images/118769644/rectangle_large_type_2_dfac95fd8fb3ca429c798b9656b2c54d.png?width=2000&height=2000&fit=bounds&format=jpg&quality=85',
    userID: '@Neko123',
    user: 'ねこまるにゃんこ',
    userAvatarUrl:
      'https://api.dicebear.com/8.x/avataaars/png?seed=Felix&accessories=round&eyebrows=raisedExcited&skinColor=ffdbb4&top=bob',
    type: 'live report',
  },
  {
    articleID: 'art007',
    articleTitle: '「地球儀」：米津玄師が語る新たな地平',
    articleBody:
      '音楽界の魔術師とも称される米津玄師が、新たなシングル「地球儀」を世に送り出した。この曲は、宮﨑駿監督の最新作「君たちはどう生きるか」の主題歌として制作され、世代を超えて心を揺さぶるメッセージが込められている。今回のインタビューでは、米津玄師自身がこの曲に込めた深い思いや、宮﨑監督との特別な関係について語ってくれた。彼の言葉からは、音楽と映画、そして人生に対する熱い情熱が伝わってくる。',
    imageUrl:
      'https://s3-reissue.s3.ap-northeast-1.amazonaws.com/rr/wp-content/uploads/d177804f28bc0c4d33d98910731501e8.jpg',
    userID: '@MochiMochi',
    user: 'もちもち大福',
    userAvatarUrl: 'https://api.dicebear.com/8.x/croodles/png',
    type: 'general',
  },
  {
    articleID: 'art008',
    articleTitle: '最新邦楽プレイリスト',
    articleBody:
      '最新の邦楽プレイリストをお届けします。お気に入りのアーティストの楽曲が含まれています！',
    artistName:
      '米津玄師 / LiSA / 星野源 / あいみょん / 平井大 / A夏目 / BUMP OF CHIKEN / 和ぬか / クイリープハイプ / aiko',
    songCount: '10曲',
    imageUrl:
      'https://m.media-amazon.com/images/I/61dk4SHy1CL._UF1000,1000_QL80_.jpg',
    userID: '@GamerPro9',
    user: 'ゲーマー進化論',
    userAvatarUrl: 'https://api.dicebear.com/8.x/big-ears/png',
    type: 'playlist',
  },
  {
    articleID: 'art009',
    articleTitle: 'エレクトロニックミュージックの未来',
    articleBody: 'テクノロジーが生み出す新しい音の世界...',
    songName: 'Shelter',
    artistName: 'Porter Robinson & Madeon',
    imageUrl:
      'https://m.media-amazon.com/images/I/61SywDA813L._UF1000,1000_QL80_.jpg',
    userID: '@RamenKing88',
    user: 'ラーメン王',
    userAvatarUrl: 'https://api.dicebear.com/8.x/micah/png',
    type: 'review',
  },
  {
    articleID: 'art010',
    articleTitle: 'Mariah Carey Live in Tokyo ライブレポート',
    articleBody: 'Mariah Careyの魅力が詰まったライブレポートです！',
    artistName: 'Mariah Carey',
    eventName: 'Mariah Carey Live in Tokyo',
    userID: '@KawaiiQueen',
    imageUrl:
      'https://static-spur.hpplus.jp/upload/image/manager/139/NyQ0FyA-1200.jpg',
    user: 'かわいい女王様',
    userAvatarUrl: 'https://api.dicebear.com/8.x/thumbs/png',
    type: 'live report',
  },
];

export default articleData;
