<?php

namespace App\Http\Controllers;

use App\Models\Soap;
use App\Http\Requests\StoreSoapRequest;
use App\Http\Requests\UpdateSoapRequest;
use Illuminate\Http\JsonResponse;

class SoapController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        try {
            $soaps = Soap::all();

            return response()->json([
                'success' => true,
                'message' => 'Soaps retrieved successfully.',
                'data' => $soaps
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve soaps.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSoapRequest $request): JsonResponse
    {
        try {
            $validatedData = $request->validated();

            $soap = Soap::create($validatedData);

            return response()->json([
                'success' => true,
                'message' => 'Soap created successfully.',
                'data' => $soap
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create soap.',
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
            $soap = Soap::find($id);

            if (!$soap) {
                return response()->json([
                    'success' => false,
                    'message' => 'Soap not found.'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'message' => 'Soap retrieved successfully.',
                'data' => $soap
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve soap.',
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
            $soaps = Soap::where('id_rekam_medis', $id_rekam_medis)->get();

            return response()->json([
                'success' => true,
                'message' => 'Soaps retrieved successfully.',
                'data' => $soaps
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve soaps.',
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
            $soaps = Soap::whereHas('rekamMedis.pasien', function ($query) use ($nik) {
                $query->where('NIK', $nik);
            })->get();

            return response()->json([
                'success' => true,
                'message' => 'Soaps retrieved successfully for NIK: ' . $nik,
                'data' => $soaps
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve soaps.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSoapRequest $request, $id): JsonResponse
    {
        try {
            $soap = Soap::find($id);

            if (!$soap) {
                return response()->json([
                    'success' => false,
                    'message' => 'Soap not found.'
                ], 404);
            }

            $validatedData = $request->validated();

            $soap->update($validatedData);

            return response()->json([
                'success' => true,
                'message' => 'Soap updated successfully.',
                'data' => $soap
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update soap.',
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
            $soap = Soap::find($id);

            if (!$soap) {
                return response()->json([
                    'success' => false,
                    'message' => 'Soap not found.'
                ], 404);
            }

            $soap->delete();

            return response()->json([
                'success' => true,
                'message' => 'Soap deleted successfully.'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete soap.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}