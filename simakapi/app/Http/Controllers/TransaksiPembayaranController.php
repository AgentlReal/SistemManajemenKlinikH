<?php

namespace App\Http\Controllers;

use App\Models\TransaksiPembayaran;
use App\Http\Requests\StoreTransaksiPembayaranRequest;
use App\Http\Requests\UpdateTransaksiPembayaranRequest;
use Illuminate\Http\JsonResponse;

class TransaksiPembayaranController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        try {
            $transaksiPembayarans = TransaksiPembayaran::all();

            return response()->json([
                'success' => true,
                'message' => 'TransaksiPembayarans retrieved successfully.',
                'data' => $transaksiPembayarans
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve transaksiPembayarans.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTransaksiPembayaranRequest $request): JsonResponse
    {
        try {
            $validatedData = $request->validated();

            $transaksiPembayaran = TransaksiPembayaran::create($validatedData);

            return response()->json([
                'success' => true,
                'message' => 'TransaksiPembayaran created successfully.',
                'data' => $transaksiPembayaran
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create transaksiPembayaran.',
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
            $transaksiPembayaran = TransaksiPembayaran::find($id);

            if (!$transaksiPembayaran) {
                return response()->json([
                    'success' => false,
                    'message' => 'TransaksiPembayaran not found.'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'message' => 'TransaksiPembayaran retrieved successfully.',
                'data' => $transaksiPembayaran
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve transaksiPembayaran.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTransaksiPembayaranRequest $request, $id): JsonResponse
    {
        try {
            $transaksiPembayaran = TransaksiPembayaran::find($id);

            if (!$transaksiPembayaran) {
                return response()->json([
                    'success' => false,
                    'message' => 'TransaksiPembayaran not found.'
                ], 404);
            }

            $validatedData = $request->validated();

            $transaksiPembayaran->update($validatedData);

            return response()->json([
                'success' => true,
                'message' => 'TransaksiPembayaran updated successfully.',
                'data' => $transaksiPembayaran
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update transaksiPembayaran.',
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
            $transaksiPembayaran = TransaksiPembayaran::find($id);

            if (!$transaksiPembayaran) {
                return response()->json([
                    'success' => false,
                    'message' => 'TransaksiPembayaran not found.'
                ], 404);
            }

            $transaksiPembayaran->delete();

            return response()->json([
                'success' => true,
                'message' => 'TransaksiPembayaran deleted successfully.'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete transaksiPembayaran.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}