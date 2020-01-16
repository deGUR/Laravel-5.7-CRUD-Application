<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Laravel 5.8 Ajax CRUD Application - W3Adda.com</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css"/>
    <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"></script>
</head>
<body>

<div class="container">
    <h2 style="margin-top: 12px;" class="alert alert-success">Laravel 5.7 Ajax CRUD Application</h2><br>
    <div class="row">
        <div class="col-12">
            <a href="javascript:void(0)" class="btn btn-success mb-2" id="create-new-post">Add item</a>
            <button type="submit" class="btn btn-primary" id="btn-search-item" style="margin: 0 0 7px 15px">Search
            </button>

            <div class="form-group">
                <input type="text" class="form-control pull-right" id="search" placeholder="Поиск по таблице"
                       style="width: 25%; display: none">
            </div>

            <table class="table table-bordered" id="laravel_crud">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Action</th>
                    <th></th>
                </tr>
                </thead>
                <tbody id="posts-crud">
                @foreach($posts as $post)
                    <tr id="post_id_{{ $post->id }}" class="table-data">
                        <td>{{ $post->id  }}</td>
                        <td>{{ $post->title }}</td>
                        <td>{{ $post->body }}</td>
                        <td><a href="javascript:void(0)" id="edit-post" data-id="{{ $post->id }}" class="btn btn-info">Edit</a>
                        </td>
                        <td>
                            <a href="javascript:void(0)" id="delete-post" data-id="{{ $post->id }}"
                               class="btn btn-danger delete-post">Delete</a></td>
                    </tr>
                @endforeach
                </tbody>
            </table>
            {{ $posts->links() }}
        </div>
    </div>
</div>

<form id="postForm" name="postForm" class="form-horizontal"></form>

<script src="{{asset('js/main.js')}}"></script>

</body>
</html>