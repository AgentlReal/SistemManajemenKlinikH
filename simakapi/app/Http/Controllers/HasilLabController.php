<?php

namespace App\Http\Controllers;

use App\Models\HasilLab;
use App\Http\Requests\StoreHasilLabRequest;
use App\Http\Requests\UpdateHasilLabRequest;
use Illuminate\Http\JsonResponse;

class HasilLabController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        try {
            $hasilLabs = HasilLab::all();

            return response()->json([
                'success' => true,
                'message' => 'HasilLabs retrieved successfully.',
                'data' => $hasilLabs
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve hasilLabs.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreHasilLabRequest $request): JsonResponse
    {
        try {
            $validatedData = $request->validated();

            $hasilLab = HasilLab::create($validatedData);

            return response()->json([
                'success' => true,
                'message' => 'HasilLab created successfully.',
                'data' => $hasilLab
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create hasilLab.',
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
            $hasilLab = HasilLab::find($id);

            if (!$hasilLab) {
                return response()->json([
                    'success' => false,
                    'message' => 'HasilLab not found.'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'message' => 'HasilLab retrieved successfully.',
                'data' => $hasilLab
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve hasilLab.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display a listing of the resource by id_rekam_medis.
     */
    public function showByRekamMedis($id_rekam_medis): JsonResponse
    {
        try {
            $hasilLabs = HasilLab::where('id_rekam_medis', $id_rekam_medis)->get();

            return response()->json([
                'success' => true,
                'message' => 'HasilLabs retrieved successfully.',
                'data' => $hasilLabs
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve hasilLabs.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display a listing of the resource by pasien NIK.
     */
    public function showByPasienNik($nik): JsonResponse
    {
        try {
            $hasilLabs = HasilLab::whereHas('rekamMedis.pasien', function ($query) use ($nik) {
                $query->where('NIK', $nik);
            })->get();

            return response()->json([
                'success' => true,
                'message' => 'HasilLabs retrieved successfully for NIK: ' . $nik,
                'data' => $hasilLabs
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve hasilLabs.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateHasilLabRequest $request, $id): JsonResponse
    {
        try {
            $hasilLab = HasilLab::find($id);

            if (!$hasilLab) {
                return response()->json([
                    'success' => false,
                    'message' => 'HasilLab not found.'
                ], 404);
            }

            $validatedData = $request->validated();

            $hasilLab->update($validatedData);

            return response()->json([
                'success' => true,
                'message' => 'HasilLab updated successfully.',
                'data' => $hasilLab
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update hasilLab.',
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
            $hasilLab = HasilLab::find($id);

            if (!$hasilLab) {
                return response()->json([
                    'success' => false,
                    'message' => 'HasilLab not found.'
                ], 404);
            }

            $hasilLab->delete();

            return response()->json([
                'success' => true,
                'message' => 'HasilLab deleted successfully.'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete hasilLab.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}