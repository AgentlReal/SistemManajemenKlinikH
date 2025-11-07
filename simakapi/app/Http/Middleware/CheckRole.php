<?php
// app/Http/Middleware/CheckRole.php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckRole
{
    public function handle(Request $request, Closure $next, ...$roles)
    {
        if (!$request->user()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized Acess.',
            ], 403);
        }

        // Check if user has any of the required roles
        if (in_array($request->user()->role, $roles)) {
            return $next($request);
        }

        return response()->json([
            'success' => false,
            'message' => 'Unauthorized Acess.',
        ], 403);
    }
}
