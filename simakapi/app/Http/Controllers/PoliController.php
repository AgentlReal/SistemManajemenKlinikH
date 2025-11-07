<?php

namespace App\Http\Controllers;

use App\Models\Poli;
use App\Http\Requests\StorePoliRequest;
use App\Http\Requests\UpdatePoliRequest;
use Illuminate\Http\JsonResponse;

class PoliController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        try {
            $polis = Poli::all();

            return response()->json([
                'success' => true,
                'message' => 'Polis retrieved successfully.',
                'data' => $polis
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve polis.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePoliRequest $request): JsonResponse
    {
        try {
            $validatedData = $request->validated();

            $poli = Poli::create($validatedData);

            return response()->json([
                'success' => true,
                'message' => 'Poli created successfully.',
                'data' => $poli
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create poli.',
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
            $poli = Poli::find($id);

            if (!$poli) {
                return response()->json([
                    'success' => false,
                    'message' => 'Poli not found.'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'message' => 'Poli retrieved successfully.',
                'data' => $poli
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve poli.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePoliRequest $request, $id): JsonResponse
    {
        try {
            $poli = Poli::find($id);

            if (!$poli) {
                return response()->json([
                    'success' => false,
                    'message' => 'Poli not found.'
                ], 404);
            }

            $validatedData = $request->validated();

            $poli->update($validatedData);

            return response()->json([
                'success' => true,
                'message' => 'Poli updated successfully.',
                'data' => $poli
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update poli.',
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
            $poli = Poli::find($id);

            if (!$poli) {
                return response()->json([
                    'success' => false,
                    'message' => 'Poli not found.'
                ], 404);
            }

            $poli->delete();

            return response()->json([
                'success' => true,
                'message' => 'Poli deleted successfully.'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete poli.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}