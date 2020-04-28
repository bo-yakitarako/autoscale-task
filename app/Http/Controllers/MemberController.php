<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Model\Member;
use App\Events\MemberUpdated;
use DateTime;
use DateTimeZone;
use Exception;

class MemberController extends Controller
{
	public function add(Request $req)
	{
		try {
			if (Member::where('userName', $req->userName)->count() > 0) {
				return response('exist', 403);
			} else {
				if (strlen($req->userName) === 0) {
					return response('empty', 403);
				}
				Member::create(['userName' => $req->userName]);
				event(new MemberUpdated($this->fetchAll()));
				return response('success');
			}
		} catch (Exception $e) {
			return response('error', 400);
		}
	}

	public function remove(Request $req)
	{
		try {
			Member::where('userName', $req->userName)->delete();
			event(new MemberUpdated($this->fetchAll()));
			return response('success');
		} catch (Exception $e) {
			return response('error', 400);
		}
	}

	public function fetchAll()
	{
		$memberObject = Member::select('userName')->get();
		$members = [];
		foreach ($memberObject as $value) {
			$members[] = $value['userName'];
		}
		return $members;
	}

	public function removeOldMembers()
	{
		$remainedCount = Member::all()->count();
		$currentTime = new DateTime();
		$currentTime->setTimezone(new DateTimeZone('Asia/Tokyo'));
		$currentTime->modify('-15 minutes');
		Member::where('updated_at', '<', $currentTime->format('Y-m-d H:i:s'))->delete();
		if (Member::all()->count() < $remainedCount) {
			event(new MemberUpdated($this->fetchAll()));
		}
	}
}
