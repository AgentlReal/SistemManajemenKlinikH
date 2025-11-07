<?php

namespace App\Http\Controllers;

use App\Models\StafLab;
use App\Http\Requests\StoreStafLabRequest;
use App\Http\Requests\UpdateStafLabRequest;
use Illuminate\Http\JsonResponse;

class StafLabController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        try {
            $stafLabs = StafLab::all();

            return response()->json([
                'success' => true,
                'message' => 'StafLabs retrieved successfully.',
                'data' => $stafLabs
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve stafLabs.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStafLabRequest $request): JsonResponse
    {
        try {
            $validatedData = $request->validated();

            $stafLab = StafLab::create($validatedData);

            return response()->json([
                'success' => true,
                'message' => 'StafLab created successfully.',
                'data' => $stafLab
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create stafLab.',
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
            $stafLab = StafLab::find($id);

            if (!$stafLab) {
                return response()->json([
                    'success' => false,
                    'message' => 'StafLab not found.'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'message' => 'StafLab retrieved successfully.',
                'data' => $stafLab
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve stafLab.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStafLabRequest $request, $id): JsonResponse
    {
        try {
            $stafLab = StafLab::find($id);

            if (!$stafLab) {
                return response()->json([
                    'success' => false,
                    'message' => 'StafLab not found.'
                ], 404);
            }

            $validatedData = $request->validated();

            $stafLab->update($validatedData);

            return response()->json([
                'success' => true,
                'message' => 'StafLab updated successfully.',
                'data' => $stafLab
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update stafLab.',
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
            $stafLab = StafLab::find($id);

            if (!$stafLab) {
                return response()->json([
                    'success' => false,
                    'message' => 'StafLab not found.'
                ], 404);
            }

            $stafLab->delete();

            return response()->json([
                'success' => true,
                'message' => 'StafLab deleted successfully.'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete stafLab.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}