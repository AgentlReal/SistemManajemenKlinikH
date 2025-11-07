<?php

namespace App\Http\Controllers;

use App\Models\Klinik;
use App\Http\Requests\StoreKlinikRequest;
use App\Http\Requests\UpdateKlinikRequest;
use Illuminate\Http\JsonResponse;

class KlinikController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        try {
            $kliniks = Klinik::all();

            return response()->json([
                'success' => true,
                'message' => 'Kliniks retrieved successfully.',
                'data' => $kliniks
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve kliniks.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreKlinikRequest $request): JsonResponse
    {
        try {
            $validatedData = $request->validated();

            $klinik = Klinik::create($validatedData);

            return response()->json([
                'success' => true,
                'message' => 'Klinik created successfully.',
                'data' => $klinik
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create klinik.',
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
            $klinik = Klinik::find($id);

            if (!$klinik) {
                return response()->json([
                    'success' => false,
                    'message' => 'Klinik not found.'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'message' => 'Klinik retrieved successfully.',
                'data' => $klinik
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve klinik.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateKlinikRequest $request, $id): JsonResponse
    {
        try {
            $klinik = Klinik::find($id);

            if (!$klinik) {
                return response()->json([
                    'success' => false,
                    'message' => 'Klinik not found.'
                ], 404);
            }

            $validatedData = $request->validated();

            $klinik->update($validatedData);

            return response()->json([
                'success' => true,
                'message' => 'Klinik updated successfully.',
                'data' => $klinik
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update klinik.',
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
            $klinik = Klinik::find($id);

            if (!$klinik) {
                return response()->json([
                    'success' => false,
                    'message' => 'Klinik not found.'
                ], 404);
            }

            $klinik->delete();

            return response()->json([
                'success' => true,
                'message' => 'Klinik deleted successfully.'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete klinik.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}