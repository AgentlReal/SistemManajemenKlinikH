<?php

namespace App\Http\Controllers;

use App\Models\ResepDokter;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ResepDokterController extends Controller
{
    public function showByPasienNik($nik): JsonResponse
    {
        try {
            $resepDokters = ResepDokter::whereHas('rekamMedis.pasien', function ($query) use ($nik) {
                $query->where('NIK', $nik);
            })->get();

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
}
