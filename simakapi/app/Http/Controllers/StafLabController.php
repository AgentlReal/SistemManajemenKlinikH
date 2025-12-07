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

            $stafLab = StafLab::onlyTrashed()
                ->where(function ($query) use ($validatedData) {
                    $query->where('nama', $validatedData['nama'])
                        ->where('tanggal_lahir', $validatedData['tanggal_lahir'])
                        ->where('jenis_kelamin', $validatedData['jenis_kelamin']);
                })
                ->orWhere('nomor_telepon', $validatedData['nomor_telepon'])
                ->orWhere('nomor_lisensi', $validatedData['nomor_lisensi'])
                ->first();

            if ($stafLab) {
                $stafLab->restore();
                $stafLab->update($validatedData);
                $message = 'StafLab restored and updated successfully.';
                $statusCode = 200;
            } else {
                $stafLab = StafLab::create($validatedData);
                $message = 'StafLab created successfully.';
                $statusCode = 201;
            }

            return response()->json([
                'success' => true,
                'message' => $message,
                'data' => $stafLab
            ], $statusCode);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to process stafLab.',
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