<?php

namespace App\Http\Controllers;

use App\Models\ResepDokter;
use App\Http\Requests\StoreResepDokterRequest;
use App\Http\Requests\UpdateResepDokterRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class ResepDokterController extends Controller
{
    public function index(): JsonResponse
    {
        try {
            $resepDokters = ResepDokter::all();

            return response()->json([
                'success' => true,
                'message' => 'Resep Dokters retrieved successfully.',
                'data' => $resepDokters
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve resep dokters.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function store(StoreResepDokterRequest $request): JsonResponse
    {
        try {
            $validatedData = $request->validated();

            $resepDokter = ResepDokter::create($validatedData);

            return response()->json([
                'success' => true,
                'message' => 'Resep Dokter created successfully.',
                'data' => $resepDokter
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create resep dokter.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show($id): JsonResponse
    {
        try {
            $resepDokter = ResepDokter::find($id);

            if (!$resepDokter) {
                return response()->json([
                    'success' => false,
                    'message' => 'Resep Dokter not found.'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'message' => 'Resep Dokter retrieved successfully.',
                'data' => $resepDokter
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve resep dokter.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function showByPasienNik($nik): JsonResponse
    {
        try {
            $resepDokters = DB::select('CALL GetResepDokterByNIK(?)', [$nik]);

            return response()->json([
                'success' => true,
                'message' => 'Resep Dokter retrieved successfully for NIK: ' . $nik,
                'data' => $resepDokters
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve Resep Dokter.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function update(UpdateResepDokterRequest $request, $id): JsonResponse
    {
        try {
            $resepDokter = ResepDokter::find($id);

            if (!$resepDokter) {
                return response()->json([
                    'success' => false,
                    'message' => 'Resep Dokter not found.'
                ], 404);
            }

            $validatedData = $request->validated();

            $resepDokter->update($validatedData);

            return response()->json([
                'success' => true,
                'message' => 'Resep Dokter updated successfully.',
                'data' => $resepDokter
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update resep dokter.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id): JsonResponse
    {
        try {
            $resepDokter = ResepDokter::find($id);

            if (!$resepDokter) {
                return response()->json([
                    'success' => false,
                    'message' => 'Resep Dokter not found.'
                ], 404);
            }

            $resepDokter->delete();

            return response()->json([
                'success' => true,
                'message' => 'Resep Dokter deleted successfully.'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete resep dokter.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
