<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Http\Requests\StoreStudentRequest;
use App\Http\Requests\UpdateStudentRequest;
use Illuminate\Http\JsonResponse;


class StudentController extends Controller
{
    /**
     * Display a listing of all students.
     */
    public function index(): JsonResponse
    {
        try {
            $students = Student::all();

            return response()->json([
                'success' => true,
                'message' => 'Students retrieved successfully.',
                'data' => $students
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve students.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified student.
     */
    public function show($id): JsonResponse
    {
        try {
            $student = Student::find($id);

            if (!$student) {
                return response()->json([
                    'success' => false,
                    'message' => 'Student not found.'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'message' => 'Student retrieved successfully.',
                'data' => $student
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve student.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created student in storage.
     */
    public function store(StoreStudentRequest $request): JsonResponse
    {
        try {
            // Create student
            $student = Student::create([
                'name' => $request->name,
            ]);

            // Return success response
            return response()->json([
                'success' => true,
                'message' => 'Student created successfully.',
                'data' => $student
            ], 201);
        } catch (\Exception $e) {
            // Return error response
            return response()->json([
                'success' => false,
                'message' => 'Failed to create student.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified student in storage.
     */
    public function update(UpdateStudentRequest $request, $id): JsonResponse
    {
        try {
            $student = Student::find($id);

            if (!$student) {
                return response()->json([
                    'success' => false,
                    'message' => 'Student not found.'
                ], 404);
            }

            $student->update([
                'name' => $request->name,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Student updated successfully.',
                'data' => $student
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update student.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified student from storage.
     */
    public function destroy($id): JsonResponse
    {
        try {
            $student = Student::find($id);

            if (!$student) {
                return response()->json([
                    'success' => false,
                    'message' => 'Student not found.'
                ], 404);
            }

            $student->delete();

            return response()->json([
                'success' => true,
                'message' => 'Student deleted successfully.'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete student.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
