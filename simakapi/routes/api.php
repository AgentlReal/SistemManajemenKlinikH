<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PasienController;
use App\Http\Controllers\AntrianController;
use App\Http\Controllers\SoapController;
use App\Http\Controllers\HasilLabController;
use App\Http\Controllers\TransaksiPembayaranController;
use App\Http\Controllers\KlinikController;
use App\Http\Controllers\ResepsionisController;
use App\Http\Controllers\DokterController;
use App\Http\Controllers\KasirController;
use App\Http\Controllers\StafLabController;
use App\Http\Controllers\TarifLayananController;
use App\Http\Controllers\PoliController;
use App\Http\Controllers\JadwalKaryawanController;
use App\Http\Controllers\ResepDokterController;
use App\Http\Controllers\PenggunaanLayananController;
use App\Http\Controllers\RekamMedisController;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware(['auth:sanctum']);

Route::middleware(['auth:sanctum', 'role:admin,manager'])->group(function () {
    Route::get('users', [AuthController::class, 'index']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::put('user/{user}', [AuthController::class, 'update']);
    Route::post('klinik', [KlinikController::class, 'store']);
    Route::get('resepsionis', [ResepsionisController::class, 'index']);
    Route::post('resepsionis', [ResepsionisController::class, 'store']);
    Route::get('resepsionis/{resepsioni}', [ResepsionisController::class, 'show']);
    Route::put('resepsionis/{resepsioni}', [ResepsionisController::class, 'update']);
    Route::delete('resepsionis/{resepsioni}', [ResepsionisController::class, 'destroy']);
    Route::get('dokter', [DokterController::class, 'index']);
    Route::post('dokter', [DokterController::class, 'store']);
    Route::get('dokter/{dokter}', [DokterController::class, 'show']);
    Route::put('dokter/{dokter}', [DokterController::class, 'update']);
    Route::delete('dokter/{dokter}', [DokterController::class, 'destroy']);
    Route::get('kasir', [KasirController::class, 'index']);
    Route::post('kasir', [KasirController::class, 'store']);
    Route::get('kasir/{kasir}', [KasirController::class, 'show']);
    Route::put('kasir/{kasir}', [KasirController::class, 'update']);
    Route::delete('kasir/{kasir}', [KasirController::class, 'destroy']);
    Route::get('staf-lab', [StafLabController::class, 'index']);
    Route::post('staf-lab', [StafLabController::class, 'store']);
    Route::get('staf-lab/{staf_lab}', [StafLabController::class, 'show']);
    Route::put('staf-lab/{staf_lab}', [StafLabController::class, 'update']);
    Route::delete('staf-lab/{staf_lab}', [StafLabController::class, 'destroy']);
    Route::post('tarif-layanan', [TarifLayananController::class, 'store']);
    Route::get('tarif-layanan/{tarif_layanan}', [TarifLayananController::class, 'show']);
    Route::put('tarif-layanan/{tarif_layanan}', [TarifLayananController::class, 'update']);
    Route::delete('tarif-layanan/{tarif_layanan}', [TarifLayananController::class, 'destroy']);
    Route::post('poli', [PoliController::class, 'store']);
    Route::get('poli/{poli}', [PoliController::class, 'show']);
    Route::put('poli/{poli}', [PoliController::class, 'update']);
    Route::delete('poli/{poli}', [PoliController::class, 'destroy']);
    Route::get('jadwal-karyawan', [JadwalKaryawanController::class, 'index']);
    Route::post('jadwal-karyawan', [JadwalKaryawanController::class, 'store']);
    Route::get('jadwal-karyawan/{jadwal_karyawan}', [JadwalKaryawanController::class, 'show']);
    Route::put('jadwal-karyawan/{jadwal_karyawan}', [JadwalKaryawanController::class, 'update']);
    Route::delete('jadwal-karyawan/{jadwal_karyawan}', [JadwalKaryawanController::class, 'destroy']);
    Route::get('karyawan-tanpa-jadwal', [JadwalKaryawanController::class, 'indexKaryawanTanpaJadwal']);
});

Route::middleware(['auth:sanctum', 'role:admin,doctor,lab,cashier,manager'])->group(function () {
    Route::get('transaksi-pembayaran-lengkap', [TransaksiPembayaranController::class, 'indexLengkap']);
});

Route::middleware(['auth:sanctum', 'role:admin,manager,cashier'])->group(function () {
    Route::get('klinik', [KlinikController::class, 'index']);
});
Route::middleware(['auth:sanctum', 'role:admin,manager,receptionist'])->group(function () {
    Route::get('jadwal-karyawan-lengkap', [JadwalKaryawanController::class, 'getJadwalLengkap']);
    Route::get('dokter-lengkap', [DokterController::class, 'indexLengkap']);
    Route::get('poli', [PoliController::class, 'index']);
});
Route::middleware(['auth:sanctum', 'role:admin,manager,doctor,lab,cashier'])->group(function () {

    Route::get('tarif-layanan', [TarifLayananController::class, 'index']);
});

Route::middleware(['auth:sanctum', 'role:admin,manager,receptionist,doctor,lab'])->group(function () {
    Route::get('antrian-lengkap', [AntrianController::class, 'indexLengkap']);
});

Route::middleware(['auth:sanctum', 'role:admin,receptionist,doctor,lab'])->group(function () {
    Route::get('antrian', [AntrianController::class, 'index']);
    Route::post('antrian', [AntrianController::class, 'store']);
    Route::get('antrian/{antrian}', [AntrianController::class, 'show']);
    Route::put('antrian/{antrian}', [AntrianController::class, 'update']);
    Route::delete('antrian/{antrian}', [AntrianController::class, 'destroy']);
    Route::get('pasien', [PasienController::class, 'index']);
    Route::post('pasien', [PasienController::class, 'store']);
    Route::get('pasien/{pasien}', [PasienController::class, 'show']);
    Route::get('pasien/nik/{pasien}', [PasienController::class, 'showByNik']);
    Route::put('pasien/{pasien}', [PasienController::class, 'update']);
    Route::delete('pasien/{pasien}', [PasienController::class, 'destroy']);
    // Route::resource('rekam-medis', RekamMedisController::class);
    Route::get('rekam-medis/pasien/{nik}', [RekamMedisController::class, 'showByPasienNik']);

    Route::get('soap', [SoapController::class, 'index']);
    Route::post('soap', [SoapController::class, 'store']);
    Route::get('soap/{soap}', [SoapController::class, 'show']);
    Route::put('soap/{soap}', [SoapController::class, 'update']);
    Route::delete('soap/{soap}', [SoapController::class, 'destroy']);
    Route::get('/soap-lengkap/pasien/{nik}', [SoapController::class, 'showByPasienNik']);
    Route::get('hasil-lab', [HasilLabController::class, 'index']);
    Route::post('hasil-lab', [HasilLabController::class, 'store']);
    Route::get('hasil-lab/{hasil_lab}', [HasilLabController::class, 'show']);
    Route::put('hasil-lab/{hasil_lab}', [HasilLabController::class, 'update']);
    Route::delete('hasil-lab/{hasil_lab}', [HasilLabController::class, 'destroy']);
    Route::get('/hasil-lab/pasien/{nik}', [HasilLabController::class, 'showByPasienNik']);
    Route::get('resep-dokter', [ResepDokterController::class, 'index']);
    Route::post('resep-dokter', [ResepDokterController::class, 'store']);
    Route::get('resep-dokter/{resep_dokter}', [ResepDokterController::class, 'show']);
    Route::put('resep-dokter/{resep_dokter}', [ResepDokterController::class, 'update']);
    Route::delete('resep-dokter/{resep_dokter}', [ResepDokterController::class, 'destroy']);
    Route::get('/resep-dokter/pasien/{nik}', [ResepDokterController::class, 'showByPasienNik']);
});

Route::middleware(['auth:sanctum', 'role:admin,doctor,lab,cashier'])->group(function () {
    Route::get('transaksi-pembayaran', [TransaksiPembayaranController::class, 'index']);
    Route::post('transaksi-pembayaran', [TransaksiPembayaranController::class, 'store']);
    Route::get('transaksi-pembayaran/{transaksi_pembayaran}', [TransaksiPembayaranController::class, 'show']);
    Route::put('transaksi-pembayaran/{transaksi_pembayaran}', [TransaksiPembayaranController::class, 'update']);
    Route::delete('transaksi-pembayaran/{transaksi_pembayaran}', [TransaksiPembayaranController::class, 'destroy']);
    Route::get('penggunaan-layanan-lengkap/{id_pembayaran}', [PenggunaanLayananController::class, 'showByIdPembayaran']);
    Route::post('penggunaan-layanan/{id_pembayaran}', [PenggunaanLayananController::class, 'store']);
    Route::put('penggunaan-layanan/{id_pembayaran}', [PenggunaanLayananController::class, 'update']);
    Route::delete('penggunaan-layanan/{id_pembayaran}', [PenggunaanLayananController::class, 'destroy']);
});

Route::get('/user', function (Request $request) {
    return response()->json(
        [
            'success' => true,
            'data' => [
                'user' => $request->user()
            ]
        ]
    );
})->middleware('auth:sanctum');
