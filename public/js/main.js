(function ($, window, document, undefined) {
 $(function () {
   $.ajaxSetup({
     headers: {
       'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
     }
   });

   /**
    * Fields to add to the table
    * @type {string}
    */
   var column = '<tr id="column"><td><input type="text" name="post_id" id="post_id" hidden form="postForm"></td>' +
     '<td><input type="text" class="form-control" id="title" name="title" value="" form="postForm" required minlength="3"></td>' +
     '<td><input class="form-control" id="body" name="body" value="" form="postForm" required minlength="3"></td>' +
     '<td><button type="submit" class="btn btn-primary" id="btn-save" form="postForm">Save</button></td></tr>';

   function createNewPost() {
     $('#create-new-post').click(function () {
       $('.btn').prop('disabled', true);
       $('#posts-crud').prepend(column);
       $('#btn-save').val("create-post");
       $('#postForm').trigger("reset");
     });
   }

   function editPost() {
     $('body').on('click', '#edit-post', function () {
       var post_id = $(this).data('id');
       $('.btn').prop('disabled', true);
       $.ajax({
         type: "GET",
         url: "/ajax-posts/"+post_id+"/edit",
         data: $('#postForm').serialize(),
         success: function (data) {
           var columnID = "#post_id_" + data.id;
           var i = $(columnID);
           i.hide();
           i.after(column);
           $('#btn-save').val("edit-post");

           $('#post_id').val(data.id);
           $('#title').val(data.title);
           $('#body').val(data.body);
         }
       });
     });
   }

   function deletePost() {
     $('body').on('click', '.delete-post', function () {
       var post_id = $(this).data("id");
       confirm("Are You sure want to delete !");

       $.ajax({
         type: "DELETE",
         url: "/ajax-posts/" + post_id,
         success: function (data) {
           $("#post_id_" + post_id).remove();
         },
         error: function (data) {
           console.log('Error:', data);
         }
       });
     });
   }

   function saveAndUpdatePost() {
     $('#postForm').on('submit', function (e) {
       e.preventDefault();
       var actionType = $('#btn-save').val();
       var data = $('#postForm').serialize();
       $.ajax({
         data: data,
         url: "/ajax-posts",
         type: "POST",
         dataType: 'json',
         success: function (data) {
           var post = '<tr id="post_id_' + data.id + '"><td>' + data.id + '</td><td>' + data.title + '</td><td>' + data.body + '</td>';
           post += '<td><a href="javascript:void(0)" id="edit-post" data-id="' + data.id + '" class="btn btn-info">Edit</a></td>';
           post += '<td><a href="javascript:void(0)" id="delete-post" data-id="' + data.id + '" class="btn btn-danger delete-post">Delete</a></td></tr>';

           if (actionType == "create-post") {
             $('#posts-crud').prepend(post);
             $('.btn').prop('disabled', false);
           } else {
             $("#post_id_" + data.id).replaceWith(post);
             $('.btn').prop('disabled', false);
           }

           $("#post_id_" + data.id).show();
           $('#postForm').trigger("reset");
           $('#column').remove();
         },
         error: function (data) {
           console.log('Error:', data);
           $('#btn-save').html('Not Save');
         }
       });
     });
   }
   
   function tableFiltering() {
     $("#search").on("keyup", function() {
       var value = $(this).val().toLowerCase();
       $("#laravel_crud tr").filter(function() {
         $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
       });
     });
   }
   
   function openInputForSearching() {
     $('#btn-search-item').on('click', function () {
       $('#search').slideToggle('slow');
     })
   }

   function init() {
     createNewPost();
     editPost();
     deletePost();
     saveAndUpdatePost();
     tableFiltering();
     openInputForSearching();
   }

   init();

 });
})(jQuery, window, document);