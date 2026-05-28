<?php

namespace App\Http\Controllers;
use App\Models\Student;

use Illuminate\Http\Request;

class StudentController extends Controller
{
    public function index()
    {
        return response()->json(Student::all());
    }

    public function store(Request $request)
{
    $request->validate([
        'name' => 'required|string',
        'email' => 'required|email',
        'age' => 'required|integer'
    ]);

    $student = Student::create([
        'name' => $request->name,
        'email' => $request->email,
        'age' => $request->age
    ]);

    return response()->json([
        'success' => true,
        'message'=> 'Studenti u shtua me sukses',
        'student' => $student
    ]);
}

    public function update(Request $request , $id)
    {
        $student = Student::find($id);

        if (!$student) {
            return response()->json([
                'success' => false,
                'message' => 'Studenti nuk u gjet'
            ]);
        }

        $student->update([
            'name' => $request->name,
            'email' => $request->email,
            'age' => $request->age,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Studenti u perditsua me sukses'
        ]);
    }

    public function destroy($id)
    {
        $student = Student::find($id);

        if(!$student){
            return response()->json([
                'success' => false,
                'message' => 'Studenti nuk u gjet'
            ]);
        }

        $student->delete();

        return response()->json([
            'success' => true,
            'message' => 'Studenti u fshi me sukses'
        ]);
    }
}
