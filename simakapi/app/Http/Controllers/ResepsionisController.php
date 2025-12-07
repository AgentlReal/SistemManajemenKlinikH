<?php

namespace App\Http\Controllers;

use App\Models\Resepsionis;
use App\Http\Requests\StoreResepsionisRequest;
use App\Http\Requests\UpdateResepsionisRequest;
use Illuminate\Http\JsonResponse;

class ResepsionisController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        try {
            $resepsionis = Resepsionis::all();

            return response()->json([
                'success' => true,
                'message' => 'Resepsionis retrieved successfully.',
                'data' => $resepsionis
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve resepsionis.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreResepsionisRequest $request): JsonResponse
    {
        try {
            $validatedData = $request->validated();

            $resepsionis = Resepsionis::withTrashed()
                ->where(function ($query) use ($validatedData) {
                    $query->where('nama', $validatedData['nama'])
                          ->where('tanggal_lahir', $validatedData['tanggal_lahir'])
                          ->where('jenis_kelamin', $validatedData['jenis_kelamin']);
                })
                ->orWhere('nomor_telepon', $validatedData['nomor_telepon'])
                ->first();

            if ($resepsionis && $resepsionis->trashed()) {
                $resepsionis->restore();
                $resepsionis->update([
                    'gaji' => $validatedData['gaji'],
                    'alamat' => $validatedData['alamat'],
                ]);

                return response()->json([
                    'success' => true,
                    'message' => 'Resepsionis restored and updated successfully.',
                    'data' => $resepsionis
                ], 200);
            }

            if($resepsionis && !$resepsionis->trashed()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Resepsionis with the same data already exists.',
                ], 409);
            }

            $newResepsionis = Resepsionis::create($validatedData);

            return response()->json([
                'success' => true,
                'message' => 'Resepsionis created successfully.',
                'data' => $newResepsionis
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create or restore resepsionis.',
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
            $resepsionis = Resepsionis::find($id);

            if (!$resepsionis) {
                return response()->json([
                    'success' => false,
                    'message' => 'Resepsionis not found.'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'message' => 'Resepsionis retrieved successfully.',
                'data' => $resepsionis
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve resepsionis.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateResepsionisRequest $request, $id): JsonResponse
    {
        try {
            $resepsionis = Resepsionis::find($id);

            if (!$resepsionis) {
                return response()->json([
                    'success' => false,
                    'message' => 'Resepsionis not found.'
                ], 404);
            }

            $validatedData = $request->validated();

            $resepsionis->update($validatedData);

            return response()->json([
                'success' => true,
                'message' => 'Resepsionis updated successfully.',
                'data' => $resepsionis
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update resepsionis.',
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
            $resepsionis = Resepsionis::find($id);

            if (!$resepsionis) {
                return response()->json([
                    'success' => false,
                    'message' => 'Resepsionis not found.'
                ], 404);
            }

            $resepsionis->delete();

            return response()->json([
                'success' => true,
                'message' => 'Resepsionis deleted successfully.'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete resepsionis.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}