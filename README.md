## 簡易チャットアプリケーション
LINEのようなチャット画面と入室中のユーザーが見えるようなアプリケーションを目指しました。

## 環境
### フロントエンド
TypeScript、React、Redux、Material-UI<br>
スタイリングにはMaterial-UIのReact Hooksを用いたCSS in JSを用いました。<br>
Reduxではtoolkitを用いてaction、reducer、storeを``module.ts``の1つにまとめています。

### バックエンド
PHP、Laravel、MySQL<br>
時間があまり無かったので新しい環境を試すのではなく、最近やっていて慣れてきているLaravelで実装しました。<br>
WebSocketではPusherを用いてブロードキャストしています。

## 経過報告

- 環境構築(0.5時間)
- WebSocketの使い方確認、仮実装、機能確認(1.5時間)
- デザインを考える(1時間)
- メッセージ部分のスタイリング(3時間)
- メッセージ入力欄のスタイリング(2時間)
- メッセージ入力欄とチャット画面のスタイルの微調整(1時間)
- モバイル端末向けのメンバーリストのドロワー表示の整備(2時間)
- サーバーサイドのロジックの実装(1.5時間)
- クライアントサイドのロジックの実装とサーバーサイドとの接続の調整(5時間)
- デプロイ(0.5時間)
- 微調整(1時間)
- リファクタリング(0.5時間)

## 参考
- [これさえ読めばLaravel Broadcastingの基本が理解できる+Vue.js](https://reffect.co.jp/laravel/laravel-broadcasting-understandig)
