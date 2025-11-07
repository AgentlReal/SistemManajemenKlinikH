<?php

namespace App\Http\Controllers;

use App\Models\Antrian;
use App\Http\Requests\StoreAntrianRequest;
use App\Http\Requests\UpdateAntrianRequest;
use Illuminate\Http\JsonResponse;

class AntrianController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        try {
            $antrians = Antrian::all();

            return response()->json([
                'success' => true,
                'message' => 'Antrians retrieved successfully.',
                'data' => $antrians
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve antrians.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAntrianRequest $request): JsonResponse
    {
        try {
            $validatedData = $request->validated();

            $antrian = Antrian::create($validatedData);

            return response()->json([
                'success' => true,
                'message' => 'Antrian created successfully.',
                'data' => $antrian
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create antrian.',
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
            $antrian = Antrian::find($id);

            if (!$antrian) {
                return response()->json([
                    'success' => false,
                    'message' => 'Antrian not found.'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'message' => 'Antrian retrieved successfully.',
                'data' => $antrian
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve antrian.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAntrianRequest $request, $id): JsonResponse
    {
        try {
            $antrian = Antrian::find($id);

            if (!$antrian) {
                return response()->json([
                    'success' => false,
                    'message' => 'Antrian not found.'
                ], 404);
            }

            $validatedData = $request->validated();

            $antrian->update($validatedData);

            return response()->json([
                'success' => true,
                'message' => 'Antrian updated successfully.',
                'data' => $antrian
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update antrian.',
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
            $antrian = Antrian::find($id);

            if (!$antrian) {
                return response()->json([
                    'success' => false,
                    'message' => 'Antrian not found.'
                ], 404);
            }

            $antrian->delete();

            return response()->json([
                'success' => true,
                'message' => 'Antrian deleted successfully.'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete antrian.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}