const todaySongData = [
  {
    userID: '@Taro1234',
    userAvatarUrl: 'https://api.dicebear.com/8.x/pixel-art/png',
    songName: '視界の隅 朽ちる音',
    artistName: '(新川崎(仮))',
    artworkUrl:
      'https://content-jp.umgi.net/products/um/UMCK-5754_duI_extralarge.jpg?03052024121250',
    body: '今期の覇権、もしかすると今年の覇権を確定させるかのような一曲。この年でこのクオリティは普通のバンドでも中々ないでしょ......。早くライブで”宣戦布告”と”約束”の小指を掲げたい！',
    todaySongID: 1,
  },
  {
    userID: '@Taro1234',
    userAvatarUrl: 'https://api.dicebear.com/8.x/pixel-art/png',
    songName: 'じゃあな',
    artistName: 'ReoNa',
    artworkUrl:
      'https://pimg.awa.io/v2/jacket/beb025b544fee0db2700.w630.h630.v1718149492.jpg',
    body: 'あの捨て台詞「じゃあな」がこんなかっこいい曲になるとは、、、。やっぱりLIVE LAB.はアーティストRoNaの物語の文脈を取り込むのが異常にうまいよね！「そんなわけないじゃん「また明日」が怖いのに」と書けるのがReoNaの強さだよねー',
    todaySongID: 2,
  },
  {
    userID: '@rhythmsecret002',
    userAvatarUrl: 'https://api.dicebear.com/8.x/lorelei/png',
    songName: 'ベーコンエピ',
    artistName: 'TOMOO',
    artworkUrl:
      'https://images.genius.com/0c6ff5fe551a4a0a06ed1ba51bd03545.1000x1000x1.jpg',
    body: '「そして繋いだ右手が笑えるほどぱずるみたいだったこと」恋人繋ぎのことだと思っているけど、パズルみたいにそんなぴったりはまることなんて本当に奇跡すぎてどう生きたらこんな歌詞浮かぶのか教えてほしい。友達が「恋愛経験少ない人ホイホイ」って言ってたのはめっちゃウケた笑',
    todaySongID: 3,
  },
  {
    userID: '@hNinjaX',
    userAvatarUrl: 'https://api.dicebear.com/8.x/bottts/png',
    songName: 'Beyond the Gray Skay',
    artistName: '百華',
    artworkUrl:
      'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/b3/fa/6c/b3fa6c12-c7a9-9075-0c2e-fe8477f0d7db/4534530150493.jpg/1200x1200bf-60.jpg',
    body: 'ピアノベースの入り、サビ前のブレイクとコーラスの使いかた、サビのメロディ展開が平成後期～末期の”あの頃”のアニソンのそれで懐古厨になってしまった。。。',
    todaySongID: 4,
  },
  {
    userID: '@Yumi789',
    userAvatarUrl: 'https://api.dicebear.com/8.x/personas/png',
    songName: 'Tap Tap Dance',
    artistName: '緑黄色社会',
    artworkUrl:
      'https://www.sonymusic.co.jp/adm_image/common/artist_image/70007000/70007781/jacket_image/302992__220_220_0.jpg?1716940800023',
    body: 'リズム隊の超メリハリの利いたビートがおしゃれすぎる！夜祭での演奏もやばかった‼',
    todaySongID: 5,
  },
  {
    userID: '@TokyoGhoul',
    userAvatarUrl: 'https://api.dicebear.com/8.x/notionists/png',
    songName: '忘れないように',
    artistName: 'イクラノドン',
    artworkUrl: 'https://cdn.tower.jp/za/o/67/4571639630167.jpg',
    body: '祝円盤！やっと聴ける！Deepとどっちにするか迷ったけど彼女たちの意思を尊重して。脱退はめっちゃ悲しいけどこれからもイクラノドンの音楽がいつまでも聴けますように。よろしくどーぞ！',
    todaySongID: 6,
  },
  {
    userID: '@Neko123',
    userAvatarUrl:
      'https://api.dicebear.com/8.x/avataaars/png?seed=Felix&accessories=round&eyebrows=raisedExcited&skinColor=ffdbb4&top=bob',
    songName: '27',
    artistName: 'SUPER BEAVER',
    artworkUrl: 'https://cdn.tower.jp/za/o/9W/zaP2_G8253409W.JPG',
    body: '27歳になりました。僕にとってのロックスターはまだ生きてます。生き続けるしかないなー、',
    todaySongID: 7,
  },
  {
    userID: '@MochiMochi',
    userAvatarUrl: 'https://api.dicebear.com/8.x/croodles/png',
    songName: 'Fire Cracker',
    artistName: 'ELLEGARDEN',
    artworkUrl: 'https://cdn.tower.jp/za/o/6W/zaP2_G8512486W.JPG',
    body: 'いったんきいてほしいです。パンクの要素ありつつ、メロディを立たせて切なさも出せる。個人的にはこういうのがエモだと思ってる。エモいじゃない、エモ。',
    todaySongID: 8,
  },
  {
    userID: '@GamerPro9',
    userAvatarUrl: 'https://api.dicebear.com/8.x/big-ears/png',
    songName: '嘘月',
    artistName: 'ヨルシカ',
    artworkUrl:
      'https://images.genius.com/0b8af8bff63511c1bb47b8a2e956cdce.1000x1000x1.jpg',
    body: 'この曲は、言語化できないけど好きなんです。なんか、もっとシンプルだった時の自分を思い出します、、',
    todaySongID: 9,
  },
  {
    userID: 'ラーメン王',
    userAvatarUrl: 'https://api.dicebear.com/8.x/micah/png',
    songName: 'We are',
    artistName: 'ONE OK ROCK',
    artworkUrl:
      'https://cdn-ak.f.st-hatena.com/images/fotolife/k/kumanotebook/20190228/20190228053617.jpg',
    body: 'アーティストとか、曲のために生きるんじゃなくて、自分の糧にしなきゃなと思った。takaのmcに心から納得できた。',
    todaySongID: 10,
  },
  {
    userID: 'かわいい女王様',
    userAvatarUrl: 'https://api.dicebear.com/8.x/thumbs/png',
    songName: 'One More Right',
    artistName: 'LINKIN PARK',
    artworkUrl:
      'https://m.media-amazon.com/images/I/71QXwZkWdwL._UF1000,1000_QL80_.jpg',
    body: 'どれだけ好きでも、他人であることには変わりなくて、好きなものの変化を許容できずに、攻撃してしまうってのは、一方的に、それを内包化した錯覚に陥って依存してるだけなんだろーなー。',
    todaySongID: 11,
  },
];

export default todaySongData;
