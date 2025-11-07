<?php

namespace App\Http\Controllers;

use App\Models\TarifLayanan;
use App\Http\Requests\StoreTarifLayananRequest;
use App\Http\Requests\UpdateTarifLayananRequest;
use Illuminate\Http\JsonResponse;

class TarifLayananController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        try {
            $tarifLayanans = TarifLayanan::all();

            return response()->json([
                'success' => true,
                'message' => 'TarifLayanans retrieved successfully.',
                'data' => $tarifLayanans
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve tarifLayanans.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTarifLayananRequest $request): JsonResponse
    {
        try {
            $validatedData = $request->validated();

            $tarifLayanan = TarifLayanan::create($validatedData);

            return response()->json([
                'success' => true,
                'message' => 'TarifLayanan created successfully.',
                'data' => $tarifLayanans
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create tarifLayanan.',
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
            $tarifLayanan = TarifLayanan::find($id);

            if (!$tarifLayanan) {
                return response()->json([
                    'success' => false,
                    'message' => 'TarifLayanan not found.'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'message' => 'TarifLayanan retrieved successfully.',
                'data' => $tarifLayanan
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve tarifLayanan.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTarifLayananRequest $request, $id): JsonResponse
    {
        try {
            $tarifLayanan = TarifLayanan::find($id);

            if (!$tarifLayanan) {
                return response()->json([
                    'success' => false,
                    'message' => 'TarifLayanan not found.'
                ], 404);
            }

            $validatedData = $request->validated();

            $tarifLayanan->update($validatedData);

            return response()->json([
                'success' => true,
                'message' => 'TarifLayanan updated successfully.',
                'data' => $tarifLayanan
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update tarifLayanan.',
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
            $tarifLayanan = TarifLayanan::find($id);

            if (!$tarifLayanan) {
                return response()->json([
                    'success' => false,
                    'message' => 'TarifLayanan not found.'
                ], 404);
            }

            $tarifLayanan->delete();

            return response()->json([
                'success' => true,
                'message' => 'TarifLayanan deleted successfully.'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete tarifLayanan.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}