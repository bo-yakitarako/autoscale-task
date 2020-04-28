<?php

namespace App\Http\Controllers;

use App\Events\MessageReceived;
use App\Model\Member;
use Illuminate\Http\Request;
use App\Model\Message;

class MessageController extends Controller
{
	public function fetchAll() {
		$messageObject = Message::select('userName', 'content', 'created_at')->get();
		$messages = [];
		foreach ($messageObject as $value) {
			$messages[] = [
				'userName' => $value['userName'],
				'postTime' => str_replace('-', '/', $value['created_at']),
				'content' => $value['content'],
			];
		}
		return $messages;
	}

	public function post(Request $req) {
		if (Message::all()->count() >= 200) {
			Message::orderBy('id', 'asc')->first()->delete();
		}
		$message = [
			'userName' => $req->userName,
			'content' => str_replace(PHP_EOL, '<br>', $req->content),
		];
		Message::create($message);
		Member::where('userName', $req->userName)->update([]);
		event(new MessageReceived($this->fetchAll()));
	}
}
