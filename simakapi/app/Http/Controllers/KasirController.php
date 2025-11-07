<?php

namespace App\Http\Controllers;

use App\Models\Kasir;
use App\Http\Requests\StoreKasirRequest;
use App\Http\Requests\UpdateKasirRequest;
use Illuminate\Http\JsonResponse;

class KasirController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        try {
            $kasirs = Kasir::all();

            return response()->json([
                'success' => true,
                'message' => 'Kasirs retrieved successfully.',
                'data' => $kasirs
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve kasirs.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreKasirRequest $request): JsonResponse
    {
        try {
            $validatedData = $request->validated();

            $kasir = Kasir::create($validatedData);

            return response()->json([
                'success' => true,
                'message' => 'Kasir created successfully.',
                'data' => $kasir
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create kasir.',
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
            $kasir = Kasir::find($id);

            if (!$kasir) {
                return response()->json([
                    'success' => false,
                    'message' => 'Kasir not found.'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'message' => 'Kasir retrieved successfully.',
                'data' => $kasir
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve kasir.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateKasirRequest $request, $id): JsonResponse
    {
        try {
            $kasir = Kasir::find($id);

            if (!$kasir) {
                return response()->json([
                    'success' => false,
                    'message' => 'Kasir not found.'
                ], 404);
            }

            $validatedData = $request->validated();

            $kasir->update($validatedData);

            return response()->json([
                'success' => true,
                'message' => 'Kasir updated successfully.',
                'data' => $kasir
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update kasir.',
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
            $kasir = Kasir::find($id);

            if (!$kasir) {
                return response()->json([
                    'success' => false,
                    'message' => 'Kasir not found.'
                ], 404);
            }

            $kasir->delete();

            return response()->json([
                'success' => true,
                'message' => 'Kasir deleted successfully.'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete kasir.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}