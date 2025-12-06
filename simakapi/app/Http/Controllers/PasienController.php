<?php

namespace App\Http\Controllers;

use App\Models\Pasien;
use App\Http\Requests\StorePasienRequest;
use App\Http\Requests\UpdatePasienRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class PasienController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        try {
            $pasiens = Pasien::all();

            return response()->json([
                'success' => true,
                'message' => 'Pasiens retrieved successfully.',
                'data' => $pasiens
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve pasiens.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePasienRequest $request): JsonResponse
    {
        try {
            $validatedData = $request->validated();

            $pasien = Pasien::create($validatedData);

            return response()->json([
                'success' => true,
                'message' => 'Pasien created successfully.',
                'data' => $pasien
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create pasien.',
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
            $pasien = Pasien::find($id);

            if (!$pasien) {
                return response()->json([
                    'success' => false,
                    'message' => 'Pasien not found.'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'message' => 'Pasien retrieved successfully.',
                'data' => $pasien
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve pasien.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    /**
     * Display the specified resource.
     */
    public function showByNik($nik): JsonResponse
    {
        try {
            $pasien = Pasien::where('NIK', $nik)->first();

            if (!$pasien) {
                return response()->json([
                    'success' => false,
                    'message' => 'Pasien not found.'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'message' => 'Pasien retrieved successfully.',
                'data' => $pasien
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve pasien.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    /**
     * Display the specified resource.
     */
    public function showByRekamMedis($idrm): JsonResponse
    {
        try {
            $pasien = DB::select('CALL GetPasienByRekamMedis(?)', [$idrm])[0];

            if (!$pasien) {
                return response()->json([
                    'success' => false,
                    'message' => 'Pasien not found.'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'message' => 'Pasien retrieved successfully.',
                'data' => $pasien
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve pasien.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePasienRequest $request, $id): JsonResponse
    {
        try {
            $pasien = Pasien::find($id);

            if (!$pasien) {
                return response()->json([
                    'success' => false,
                    'message' => 'Pasien not found.'
                ], 404);
            }

            $validatedData = $request->validated();

            $pasien->update($validatedData);

            return response()->json([
                'success' => true,
                'message' => 'Pasien updated successfully.',
                'data' => $pasien
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update pasien.',
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
            $pasien = Pasien::find($id);

            if (!$pasien) {
                return response()->json([
                    'success' => false,
                    'message' => 'Pasien not found.'
                ], 404);
            }

            $pasien->delete();

            return response()->json([
                'success' => true,
                'message' => 'Pasien deleted successfully.'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete pasien.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
