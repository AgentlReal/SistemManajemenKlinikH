<?php

namespace App\Http\Controllers;

use App\Models\PenggunaanLayanan;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class PenggunaanLayananController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        try {
            $penggunaanLayanans = PenggunaanLayanan::all();

            return response()->json([
                'success' => true,
                'message' => 'PenggunaanLayanans retrieved successfully.',
                'data' => $penggunaanLayanans
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve penggunaanLayanans.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $validatedData = $request->validate([
                'id_pembayaran' => 'required|integer',
                'id_tarif_layanan' => 'required|integer',
                'kuantitas' => 'required|integer',
                'harga_saat_itu' => 'required|integer',
            ]);

            $penggunaanLayanan = PenggunaanLayanan::create($validatedData);

            return response()->json([
                'success' => true,
                'message' => 'PenggunaanLayanan created successfully.',
                'data' => $penggunaanLayanan
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create penggunaanLayanan.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id): JsonResponse
    {
        try {
            $penggunaanLayanan = PenggunaanLayanan::find($id);

            if (!$penggunaanLayanan) {
                return response()->json([
                    'success' => false,
                    'message' => 'PenggunaanLayanan not found.'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'message' => 'PenggunaanLayanan retrieved successfully.',
                'data' => $penggunaanLayanan
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve penggunaanLayanan.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id): JsonResponse
    {
        try {
            $penggunaanLayanan = PenggunaanLayanan::find($id);

            if (!$penggunaanLayanan) {
                return response()->json([
                    'success' => false,
                    'message' => 'PenggunaanLayanan not found.'
                ], 404);
            }

            $validatedData = $request->validate([
                'id_pembayaran' => 'sometimes|required|integer',
                'id_tarif_layanan' => 'sometimes|required|integer',
                'kuantitas' => 'sometimes|required|integer',
                'harga_saat_itu' => 'sometimes|required|integer',
            ]);

            $penggunaanLayanan->update($validatedData);

            return response()->json([
                'success' => true,
                'message' => 'PenggunaanLayanan updated successfully.',
                'data' => $penggunaanLayanan
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update penggunaanLayanan.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id): JsonResponse
    {
        try {
            $penggunaanLayanan = PenggunaanLayanan::find($id);

            if (!$penggunaanLayanan) {
                return response()->json([
                    'success' => false,
                    'message' => 'PenggunaanLayanan not found.'
                ], 404);
            }

            $penggunaanLayanan->delete();

            return response()->json([
                'success' => true,
                'message' => 'PenggunaanLayanan deleted successfully.'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete penggunaanLayanan.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
