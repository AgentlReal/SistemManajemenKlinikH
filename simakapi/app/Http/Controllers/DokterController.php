<?php

namespace App\Http\Controllers;

use App\Models\Dokter;
use App\Http\Requests\StoreDokterRequest;
use App\Http\Requests\UpdateDokterRequest;
use Illuminate\Http\JsonResponse;

class DokterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        try {
            $dokters = Dokter::all();

            return response()->json([
                'success' => true,
                'message' => 'Dokters retrieved successfully.',
                'data' => $dokters
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve dokters.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display a listing of the complete dokter view.
     */
    public function indexLengkap(): JsonResponse
    {
        try {
            $viewAntrianLengkap = \App\Models\ViewDokterLengkap::all();

            return response()->json([
                'success' => true,
                'message' => 'Complete dokter retrieved successfully.',
                'data' => $viewAntrianLengkap
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve complete dokter.',
                'error' => $e->getMessage()
            ], 500);
        }
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDokterRequest $request): JsonResponse
    {
        try {
            $validatedData = $request->validated();

            $dokter = Dokter::withTrashed()
                ->where(function ($query) use ($validatedData) {
                    $query->where('nama', $validatedData['nama'])
                          ->where('tanggal_lahir', $validatedData['tanggal_lahir'])
                          ->where('jenis_kelamin', $validatedData['jenis_kelamin']);
                })
                ->orWhere('nomor_telepon', $validatedData['nomor_telepon'])
                ->orWhere('nomor_lisensi', $validatedData['nomor_lisensi'])
                ->first();

            if ($dokter && $dokter->trashed()) {
                $dokter->restore();
                $dokter->update($validatedData);

                return response()->json([
                    'success' => true,
                    'message' => 'Dokter restored and updated successfully.',
                    'data' => $dokter
                ], 200);
            }

            if ($dokter && !$dokter->trashed()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Dokter with the same data already exists.',
                ], 409);
            }

            $newDokter = Dokter::create($validatedData);

            return response()->json([
                'success' => true,
                'message' => 'Dokter created successfully.',
                'data' => $newDokter
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create or restore dokter.',
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
            $dokter = Dokter::find($id);

            if (!$dokter) {
                return response()->json([
                    'success' => false,
                    'message' => 'Dokter not found.'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'message' => 'Dokter retrieved successfully.',
                'data' => $dokter
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve dokter.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDokterRequest $request, $id): JsonResponse
    {
        try {
            $dokter = Dokter::find($id);

            if (!$dokter) {
                return response()->json([
                    'success' => false,
                    'message' => 'Dokter not found.'
                ], 404);
            }

            $validatedData = $request->validated();

            $dokter->update($validatedData);

            return response()->json([
                'success' => true,
                'message' => 'Dokter updated successfully.',
                'data' => $dokter
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update dokter.',
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
            $dokter = Dokter::find($id);

            if (!$dokter) {
                return response()->json([
                    'success' => false,
                    'message' => 'Dokter not found.'
                ], 404);
            }

            $dokter->delete();

            return response()->json([
                'success' => true,
                'message' => 'Dokter deleted successfully.'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete dokter.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
