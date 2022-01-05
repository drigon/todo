<?php

use App\Models\Todo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('/todos', function () {
    return response()->json(Todo::orderByDesc('id')->get());
})->name('api.todos');

Route::put('/update-todo', function (Request $request) {
    
    $todo = Todo::find($request->id);
    $todo->title = (isset($request->title)) ? $request->title : $todo->title;

    if(isset($request->is_complete) && $request->is_complete == 'single')
        $todo->is_complete =  !$todo->is_complete;
    elseif (isset($request->is_complete) && $request->is_complete == 'all'){
        $todo->is_complete =  1;
    }

    $todo->save();

    return response()->json('FOGO NA BOMBA '. $request->id. ' ' . $todo->is_complete);
})->name('api.new_todo');

Route::post('/new-todo', function (Request $request) {
    
    $todo = new Todo();
    $todo->title = $request->title;
    $todo->save();

    return response()->json($todo);
})->name('api.new_todo');

Route::post('/delete-todo', function (Request $request) {
    
    $todo = Todo::find($request->id);
    $todo->delete();

    return response()->json($todo);
})->name('api.delete_todo');