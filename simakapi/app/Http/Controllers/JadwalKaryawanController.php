<?php

namespace App\Http\Controllers;

use App\Models\JadwalKaryawan;
use App\Http\Requests\StoreJadwalKaryawanRequest;
use App\Http\Requests\UpdateJadwalKaryawanRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use App\Models\ViewJadwalKaryawanLengkap;
use App\Models\ViewKaryawanTanpaJadwal;

class JadwalKaryawanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        try {
            $jadwalKaryawans = JadwalKaryawan::all();

            return response()->json([
                'success' => true,
                'message' => 'JadwalKaryawans retrieved successfully.',
                'data' => $jadwalKaryawans
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve jadwalKaryawans.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreJadwalKaryawanRequest $request): JsonResponse
    {
        try {
            $validatedData = $request->validated();

            $jadwalKaryawan = JadwalKaryawan::create($validatedData);

            return response()->json([
                'success' => true,
                'message' => 'JadwalKaryawan created successfully.',
                'data' => $jadwalKaryawan
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create jadwalKaryawan.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource. *
     */
    public function show($id): JsonResponse
    {
        try {
            $jadwalKaryawan = JadwalKaryawan::find($id);

            if (!$jadwalKaryawan) {
                return response()->json([
                    'success' => false,
                    'message' => 'JadwalKaryawan not found.'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'message' => 'JadwalKaryawan retrieved successfully.',
                'data' => $jadwalKaryawan
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve jadwalKaryawan.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateJadwalKaryawanRequest $request, $id): JsonResponse
    {
        try {
            $jadwalKaryawan = JadwalKaryawan::find($id);

            if (!$jadwalKaryawan) {
                return response()->json([
                    'success' => false,
                    'message' => 'JadwalKaryawan not found.'
                ], 404);
            }

            $validatedData = $request->validated();

            $jadwalKaryawan->update($validatedData);

            return response()->json([
                'success' => true,
                'message' => 'JadwalKaryawan updated successfully.',
                'data' => $jadwalKaryawan
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update jadwalKaryawan.',
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
            $jadwalKaryawan = JadwalKaryawan::find($id);

            if (!$jadwalKaryawan) {
                return response()->json([
                    'success' => false,
                    'message' => 'JadwalKaryawan not found.'
                ], 404);
            }

            $jadwalKaryawan->delete();

            return response()->json([
                'success' => true,
                'message' => 'JadwalKaryawan deleted successfully.'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete jadwalKaryawan.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getJadwalLengkap(): JsonResponse
    {
        try {
            $jadwalLengkap = ViewJadwalKaryawanLengkap::all();

            return response()->json([
                'success' => true,
                'message' => 'Jadwal karyawan lengkap retrieved successfully.',
                'data' => $jadwalLengkap
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve jadwal karyawan lengkap.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display a listing of employees without a schedule.
     */
    public function indexKaryawanTanpaJadwal(): JsonResponse
    {
        try {
            $karyawanTanpaJadwal = ViewKaryawanTanpaJadwal::all();

            return response()->json([
                'success' => true,
                'message' => 'Employees without schedule retrieved successfully.',
                'data' => $karyawanTanpaJadwal
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve employees without schedule.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}