$(document).ready(function() {
    var table = $('#sentilo-table').DataTable({
        responsive: true,
        "columnDefs": [{
            "targets": -1,
            "data": null,
            "defaultContent": '<button type="button" name="button-delete-sentilo" data-toggle="modal" data-target="#modal-delete-sentilo" data-placement="bottom" title="' + '{% trans "Delete sentilo" %}' + '" class="btn btn-danger"><i class="fa fa-times"></i></button>'
        }],
        "dom": 'T<"clear">lfrtip',
        "bLengthChange": false
    });
         
    $('#sentilo-table tbody').on('click', 'button', function (){
        var row = table.row($(this).parents('tr'));
        var data = row.data();
        console.log("TABLE CLICEKD", this.name)   
        if (this.name == "button-delete-sentilo") {		
            console.log("INSIDE IF", data);
            deletesentilo(data);
        } 
    });
    
    $('#button-add-sentilo').on('click', function (){
        location.href = '/gvsigonline/sentilo/sentilo_conf/';
    });
    
        
    function deletesentilo(data){
        console.log('deletesentilo', data);
        $('#button-delete-sentilo-accept').click( function() {
            console.log("DELETE CLICKED");
            $("body").overlay();
            $.ajax({
                type: 'DELETE',
                async: false,
                url: '/gvsigonline/sentilo/delete/' + data[0] + '/',
                beforeSend:function(xhr){
                    xhr.setRequestHeader('X-CSRFToken', Cookies.get('csrftoken'));
                },
                success	:function(response){
                    $('#modal-delete-sentilo').modal('hide');
                    $.overlayout();
                    location.reload();
                },
                error: function(){}
            });
        });
    }


  
});