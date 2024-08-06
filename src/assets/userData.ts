const userData = [
  {
    userID: '@Taro1234',
    user: 'たろう',
    userAvatarUrl: 'https://api.dicebear.com/8.x/pixel-art/png',
    bio: 'こんにちは！たろうです。ゲームとアニメが大好きな普通の大学生です。休日は友達とオンラインでゲームをしたり、最新のアニメを追いかけたりしています。たまにはプログラミングの勉強もして、将来はゲーム開発者になるのが夢です。',
    followers: 154,
    following: 202,
    tag: ['Taro Hakase', 'Ken Hirai', 'Utada Hikaru', 'Perfume', 'RADWIMPS', 'Aimer', 'ONE OK ROCK', 'LiSA', 'Official HIGE DANDism', 'Aimyon']
  },
  {
    userID: '@rhythmsecret002',
    user: 'BeatMaster',
    userAvatarUrl: 'https://api.dicebear.com/8.x/lorelei/png',
    bio: '音楽は私の人生、私のすべてです。\n\nDJ活動をしているBeatMasterと申します。クラブやイベントで皆さんを踊らせるビートを提供することが私の情熱です。音楽制作のことなら何でも聞いてください!\n\n週末はレコードショップを巡り、新しい音を探求しています。音楽と共に生きる毎日を、皆さんとシェアできれば幸いです。',
    followers: 987,
    following: 305,
    tag: ['Armin van Buuren', 'David Guetta', 'Calvin Harris', 'Tiesto', 'Deadmau5', 'Skrillex', 'Avicii', 'Marshmello', 'Diplo', 'Martin Garrix']
  },
  {
    userID: '@hNinjaX',
    user: '忍者X',
    userAvatarUrl: 'https://api.dicebear.com/8.x/bottts/png',
    bio: 'コードを書くのが大好きな忍者Xです。セキュリティの専門家として、データを守るために日夜努力しています。プライバシー保護とデータセキュリティに関する情報を共有していきます。',
    followers: 428,
    following: 165,
    tag: ['Hans Zimmer', 'John Williams', 'Alan Silvestri', 'Ramin Djawadi', 'James Newton Howard', 'Ludwig Göransson', 'Alexandre Desplat', 'Michael Giacchino', 'Thomas Newman', 'Danny Elfman']
  },
  {
    userID: '@Yumi789',
    user: 'ゆみちゃん',
    userAvatarUrl: 'https://api.dicebear.com/8.x/personas/png',
    bio: 'ファッションと旅行が大好きなゆみです。世界中の素敵な場所を訪れることが私の生きがいです。旅の写真やファッションのコーディネートをシェアしていきますので、ぜひフォローしてくださいね。',
    followers: 523,
    following: 411,
    tag: ['Taylor Swift', 'Ariana Grande', 'Billie Eilish', 'Beyoncé', 'Rihanna', 'Katy Perry', 'Lady Gaga', 'Dua Lipa', 'Selena Gomez', 'Camila Cabello']
  },
  {
    userID: '@TokyoGhoul',
    user: '東京喰種👹',
    userAvatarUrl: 'https://api.dicebear.com/8.x/notionists/png',
    bio: '夜の世界が好きな東京喰種です。ホラー映画や都市伝説の話を集めています。夜更かしは日常茶飯事。もし良い話があれば、ぜひシェアしてください。',
    followers: 666,
    following: 666,
    tag: ['Marilyn Manson', 'Slipknot', 'Rob Zombie', 'Alice Cooper', 'Black Sabbath', 'Korn', 'Nine Inch Nails', 'Type O Negative', 'Ghost', 'Rammstein']
  },
  {
    userID: '@Neko123',
    user: 'ねこまるにゃんこ',
    userAvatarUrl: 'https://api.dicebear.com/8.x/avataaars/png',
    bio: '猫と暮らす日々は本当に幸せです。ねこまるにゃんこと申します。\n\n猫の写真や動画をたくさん投稿しているので、猫好きな方はぜひフォローしてください。猫との生活の小さな幸せを、写真を通じて皆さんにお届けします。\n\n毎日が猫との新しい発見でいっぱいです。猫の魅力を伝えるために、日々努力しています。',
    followers: 890,
    following: 589,
    tag: ['Ayaka', 'Ikimono Gakari', 'Nana Mizuki', 'NiziU', 'Nogizaka46', 'Momoiro Clover Z', 'Scandal', 'Flower', 'Little Glee Monster', 'E-girls']
  },
  {
    userID: '@MochiMochi',
    user: 'もちもち大福',
    userAvatarUrl: 'https://api.dicebear.com/8.x/croodles/png',
    bio: 'スイーツ作りが趣味のもちもち大福です。特に和菓子を作るのが得意で、美味しいレシピや作り方をシェアしています。おいしいものを作る喜びを皆さんと分かち合いたいです。',
    followers: 321,
    following: 432,
    tag: ['Perfume', 'Kyary Pamyu Pamyu', 'Capsule', 'tofubeats', 'DAOKO', 'Wednesday Campanella', '80KIDZ', 'Yasutaka Nakata', 'Towa Tei', 'Fantastic Plastic Machine']
  },
  {
    userID: '@GamerPro9',
    user: 'ゲーマー進化論',
    userAvatarUrl: 'https://api.dicebear.com/8.x/big-ears/png',
    bio: 'こんにちは、ゲーマー進化論です。最新のゲーム情報を追いかけるのが生きがいです。eスポーツに情熱を注いでおり、大会の結果やゲームのレビューを投稿しています。',
    followers: 1345,
    following: 987,
    tag: ['Nujabes', 'Kenichiro Nishihara', 'DJ Okawari', 'Shingo Nakamura', 'Mabanua', 'Yoko Kanno', 'Hiroshi Fujiwara', 'Toshio Matsuura', 'Shinichi Osawa', 'Tetsuya Komuro']
  },
  {
    userID: '@RamenKing88',
    user: 'ラーメン王',
    userAvatarUrl: 'https://api.dicebear.com/8.x/micah/png',
    bio: 'ラーメン王として、全国のラーメン屋を巡る旅をしています。\n\nおすすめの一杯や隠れた名店を探求しているので、美味しいラーメン屋さんがあれば教えてください。ラーメンに関する情報やレビューを皆さんと共有することが私の喜びです。\n\nラーメンの深い世界を探究し、その魅力を伝えるために、日々新しい店を訪れています。',
    followers: 754,
    following: 562,
    tag: ['BUMP OF CHICKEN', 'RADWIMPS', 'ONE OK ROCK', 'Alexandros', 'Man With A Mission', 'King Gnu', 'Sakanaction', 'Suchmos', 'Mrs. GREEN APPLE', 'Back Number']
  },
  {
    userID: '@KawaiiQueen',
    user: 'かわいい女王様',
    userAvatarUrl: 'https://api.dicebear.com/8.x/thumbs/png',
    bio: 'かわいいものに囲まれて生きる、それが私のスタイル。かわいい女王様です。日々のかわいい発見やお気に入りのアイテムをシェアしていきます。かわいいもの好きな方、一緒にかわいい世界を楽しみましょう。',
    followers: 1200,
    following: 1100,
    tag: ['Kyary Pamyu Pamyu', 'Perfume', 'NiziU', 'Nogizaka46', 'Momoiro Clover Z', 'BABYMETAL', 'AKB48', 'Morning Musume', 'SKE48', 'HKT48']
  },
  {
    userID: '@MorningFan',
    user: '朝ごはん好き',
    userAvatarUrl: 'https://api.dicebear.com/8.x/adventurer/png',
    bio: '朝ごはんが大好きな私です。毎朝の食事に情熱を注ぎ、栄養たっぷりでおいしい朝食を作るのが日課です。おいしい朝ごはんのレシピや写真をシェアしています。',
    followers: 245,
    following: 190,
    tag: ['Kana Nishino', 'Ikimono Gakari', 'AI', 'GReeeeN', 'Daichi Miura', 'Miwa', 'Fujifabric', 'Little Glee Monster', 'Sakanaction', 'Shota Shimizu']
  },
  {
    userID: '@MovieBuff',
    user: '映画マニア',
    userAvatarUrl: 'https://api.dicebear.com/8.x/identicon/png',
    bio: '映画が私の人生の一部です。新作映画のレビューやクラシック映画の紹介など、映画に関することなら何でも発信しています。映画好きの皆さんと映画の魅力を語り合いたいです。',
    followers: 398,
    following: 320,
    tag: ['John Williams', 'Hans Zimmer', 'Ennio Morricone', 'Joe Hisaishi', 'Howard Shore', 'James Horner', 'Danny Elfman', 'Alexandre Desplat', 'Ramin Djawadi', 'Alan Silvestri']
  },
  {
    userID: '@Camper123',
    user: 'キャンプ好き',
    userAvatarUrl: 'https://api.dicebear.com/8.x/bottts/png',
    bio: '自然の中で過ごすのが大好きなキャンプ好きです。週末はキャンプを楽しみ、自然の美しさを満喫しています。キャンプのアイデアやアウトドアの楽しみ方をシェアしています。',
    followers: 180,
    following: 160,
    tag: ['Kyu Sakamoto', 'Yumi Matsutoya', 'Tatsuro Yamashita', 'Eiichi Ohtaki', 'Haruomi Hosono', 'Ryuichi Sakamoto', 'Mariya Takeuchi', 'Akiko Yano', 'Masayoshi Takanaka', 'Shigeru Suzuki']
  },
  {
    userID: '@ChefMaster',
    user: 'シェフマスター',
    userAvatarUrl: 'https://api.dicebear.com/8.x/micah/png',
    bio: '料理を愛するシェフマスターです。特に新しいレシピを試すのが好きで、美味しい料理を作ることが生きがいです。レシピや料理のコツを皆さんと共有しています。',
    followers: 325,
    following: 280,
    tag: ['Gordon Ramsay', 'Jamie Oliver', 'Nigella Lawson', 'Thomas Keller', 'Heston Blumenthal', 'Rene Redzepi', 'Ferran Adria', 'Alain Ducasse', 'Yotam Ottolenghi', 'Massimo Bottura']
  }
];

export default userData;