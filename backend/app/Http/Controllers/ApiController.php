<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class ApiController extends Controller
{
    protected function respond($data, $statusCode = 200, $headers = [])
    {
        return response()->json($data, $statusCode, $headers);
    }

    protected function respondSuccess($data, $statusCode = 200, $headers = [])
    {
        return $this->respond([
            'success' => true,
            'data' => $data
        ], $statusCode, $headers);
    }

    protected function respondError($message, $status, $code = '')
    {
        return $this->respond([
            'success' => false,
            'error' => [
                'message' => $message,
                'status' => $status,
                'code' => $code
            ]
        ], $status);
    }

    protected function respondForbidden($message = 'Forbidden')
    {
        return $this->respondError($message, 403);
    }

    protected function respondNotFound($message = 'Not Found')
    {
        return $this->respondError($message, 404);
    }
}
