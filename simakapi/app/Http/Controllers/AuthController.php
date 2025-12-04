<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\UpdateAuthRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        try {
            $users = User::all();

            return response()->json([
                'success' => true,
                'message' => 'Users retrieved successfully.',
                'data' => $users
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve users.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    /**
     * Register a new user.
     */
    public function register(RegisterRequest $request): JsonResponse
    {
        try {
            $validatedData = $request->validated();

            $user = User::create([

                'username' => $validatedData['username'],
                'password' => Hash::make($validatedData['password']),
                'id_resepsionis' => $validatedData['id_resepsionis'],
                'id_dokter' => $validatedData['id_dokter'],
                'id_staf_lab' => $validatedData['id_staf_lab'],
                'id_kasir' => $validatedData['id_kasir'],
            ]);

            $token = $user->createToken('auth-token')->plainTextToken;

            return response()->json([
                'success' => true,
                'message' => 'Registration successful.',
                'data' => [
                    'user' => [
                        'id' => $user->id,
                        'username' => $user->username,


                    ],
                    'access_token' => $token,
                    'token_type' => 'Bearer',
                ]
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Registration failed.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAuthRequest $request, $id): JsonResponse
    {
        try {
            $user = User::find($id);

            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not found.'
                ], 404);
            }

            $validatedData = $request->validated();
            $validatedData['password'] = Hash::make($validatedData['password']);

            $user->update($validatedData);

            return response()->json([
                'success' => true,
                'message' => 'User updated successfully.',
                'data' => $user
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update user.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Login user and create token
     */
    public function login(LoginRequest $request): JsonResponse
    {
        try {
            $credentials = $request->only('username', 'password');

            if (Auth::attempt($credentials)) {
                $user = Auth::user();
                $token = $user->createToken('auth-token')->plainTextToken;

                return response()->json([
                    'success' => true,
                    'message' => 'Login successful.',
                    'data' => [
                        'user' => $request->user(),
                        'access_token' => $token,
                        'token_type' => 'Bearer',
                    ]
                ], 200);
            }

            return response()->json([
                'success' => false,
                'message' => 'Invalid credentials.',
            ], 401);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Login failed.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get current authenticated user
     */
    public function user(Request $request): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => [
                'user' => $request->user()
            ]
        ]);
    }

    /**
     * Logout user (revoke token)
     */
    public function logout(Request $request): JsonResponse
    {
        try {
            $request->user()->currentAccessToken()->delete();

            return response()->json([
                'success' => true,
                'message' => 'Successfully logged out.'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Logout failed.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
