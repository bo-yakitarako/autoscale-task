<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\MessageController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
	return view('index');
});
Route::post('/member/add', 'MemberController@add');
Route::delete('/member/delete', 'MemberController@remove');
Route::post('/message/post', 'MessageController@post');

Route::get('/init', function () {
	$memberController = new MemberController();
	$messageController = new MessageController();
	$members = $memberController->fetchAll();
	$messages = $messageController->fetchAll();
	return response()->json(['members' => $members, 'messages' => $messages], 200, [], JSON_UNESCAPED_UNICODE);
});
