<?php

namespace App\Http\Controllers;

use App\Models\RekamMedis;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class RekamMedisController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        try {
            $rekamMedis = RekamMedis::all();

            return response()->json([
                'success' => true,
                'message' => 'RekamMedis retrieved successfully.',
                'data' => $rekamMedis
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve rekamMedis.',
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
                'id_pasien' => 'required|integer',
                'tanggal_pencatatan' => 'sometimes|date',
            ]);

            $rekamMedis = RekamMedis::create($validatedData);

            return response()->json([
                'success' => true,
                'message' => 'RekamMedis created successfully.',
                'data' => $rekamMedis
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create rekamMedis.',
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
            $rekamMedis = RekamMedis::find($id);

            if (!$rekamMedis) {
                return response()->json([
                    'success' => false,
                    'message' => 'RekamMedis not found.'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'message' => 'RekamMedis retrieved successfully.',
                'data' => $rekamMedis
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve rekamMedis.',
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
            $medicalrecords = DB::select('CALL GetRekamMedisByNIK(?)', [$nik])[0];
            return response()->json([
                'success' => true,
                'message' => 'Soaps retrieved successfully for NIK: ' . $nik,
                'data' => $medicalrecords
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve medicalrecords.',
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
            $rekamMedis = RekamMedis::find($id);

            if (!$rekamMedis) {
                return response()->json([
                    'success' => false,
                    'message' => 'RekamMedis not found.'
                ], 404);
            }

            $validatedData = $request->validate([
                'id_pasien' => 'sometimes|required|integer',
                'tanggal_pencatatan' => 'sometimes|date',
            ]);

            $rekamMedis->update($validatedData);

            return response()->json([
                'success' => true,
                'message' => 'RekamMedis updated successfully.',
                'data' => $rekamMedis
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update rekamMedis.',
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
            $rekamMedis = RekamMedis::find($id);

            if (!$rekamMedis) {
                return response()->json([
                    'success' => false,
                    'message' => 'RekamMedis not found.'
                ], 404);
            }

            $rekamMedis->delete();

            return response()->json([
                'success' => true,
                'message' => 'RekamMedis deleted successfully.'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete rekamMedis.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
