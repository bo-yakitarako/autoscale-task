<!DOCTYPE html>
<html lang="ja">

	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta http-equiv="X-UA-Compatible" content="ie=edge">
		<meta name="csrf-token" content="{{ csrf_token() }}">
		<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
		<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
		<link rel="icon" href="/favicon.ico">
		<style>
			html,
			body {
				margin: 0;
				padding: 0;
			}

		</style>
		<title>チャットアプリ</title>
	</head>

	<body>
		<div id="root"></div>
		<script src="/js/index.js"></script>
	</body>

</html>
