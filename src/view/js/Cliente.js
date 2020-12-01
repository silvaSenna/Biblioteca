


function Consulta(e) {

   

    var url=location.protocol+"//"+location.host;

   $.ajax({

            url:url+'/app/cliente/consulta?buscar='+e.value,
            type:'GET',
            contentType: 'application/json',
            
        }).done(function(data){

          


          if(data.count==0){
             
            $("#msg-vazio").html("Sua pesquisa - "+e.value+" - não encontrou nenhum registro correspondente.");

            $('#paginacao').html('');

            $("#tabelaLivro").hide();

          }else{


          $("#tabelaLivro").show();

          $("#msg-vazio").html('');
          
          $('#paginacao').html('');
          $('#tableLivro').html('');
          $('#head-table').hide();


            
          $.map(data.rows,function(tr){

            $('#head-table').show();
               var html='';

               html+="<tr>"+"<td>"+tr.id_cliente+"</td><td>"+tr.nome+"</td><td>"+tr.cpf+"</td><td>"+tr.email+"</td><td>"+tr.telefone+"</td><td><i class='material-icons' onclick='editar("+tr.id_cliente+")' >mode_edit</i> <i class='material-icons' onclick='modalExcluir("+tr.id_cliente+")' >delete</i></td>"+"</tr>";
              
              
               $('#tableLivro').append(html);

               $('#paginacao').html('');

              });

              for(var i=1;i<=data.pages;i++){

                $('#paginacao').append(" <li class='page-item'><a class='page-link' onclick='paginacao("+i+")' href='#'>"+i+"</a></li>");
   
               }

              }
        
            }).fail(function(msg){

             });

        
}

function paginacao(valor){

  event.preventDefault();
  


  var url=location.protocol+"//"+location.host;

  var consulta=document.getElementById('consulta').value;

  $.ajax({

           url:url+'/app/cliente/consulta?buscar='+consulta+"&pages="+valor,
           type:'GET',
           contentType: 'application/json',
           
       }).done(function(data){

         $('#paginacao').html('');

         $('#tableLivro').html('');
           
         $.map(data.rows,function(tr){

             
          var html='';

          html+="<tr>"+"<td>"+tr.id_cliente+"</td><td>"+tr.nome+"</td><td>"+tr.cpf+"</td><td>"+tr.email+"</td><td>"+tr.telefone+"</td><td><i class='material-icons' onclick='editar("+tr.id_cliente+")' >mode_edit</i> <i class='material-icons' onclick='modalExcluir("+tr.id_cliente+")' >delete</i></td>"+"</tr>";
              
         
             
              $('#tableLivro').append(html);

              $('#paginacao').html('');
   
            });

            for(var i=1;i<=data.pages;i++){

              $('#paginacao').append(" <li class='page-item'><a class='page-link' onclick='paginacao("+i+")' href='#'>"+i+"</a></li>");
   
             }
       
           }).fail(function(jqXHR,textSatus,msg){

          console.log(msg,textSatus);
       });




}


function modalExcluir(id){

  $('#idExcluir').val(id);

  
  $('#ModalExcluir').modal('show');

 


}

 function excluirCliente(){


  $('#ModalExcluir').modal('hide');


  var url=location.protocol+"//"+location.host;

  var id=parseInt($('#idExcluir').val());

  $.ajax({

           url:url+'/app/cliente/excluir?id='+id,
           type:'DELETE',
           contentType: 'application/json',
           
       }).done(function(data){

          Consulta(document.getElementById('consulta'));

           }).fail(function(erro){

            if(erro.status==400){
              
              $.growl.warning({ title: "Permissão negada!", message: "Sem permissão para excluir!", location: "tc" });

            }
       });



}




function editar(id){


  var url=location.protocol+"//"+location.host;
  $('#editarModal').modal('show');


  
  $.ajax({

    url:url+'/app/cliente/consultaEditar?id='+id,
    type:'GET',
    contentType: 'application/json',
    
}).done(function(response){


  
 
  var idCliente=document.forms[1]["idCliente"];
  var nome = document.forms[1]["nome"];
  var telefone = document.forms[1]["telefone"];
  var celular = document.forms[1]["celular"];
  var endereco = document.forms[1]["endereco"];
  var email = document.forms[1]["email"];
  var cpf = document.forms[1]["cpf"];
  var cep = document.forms[1]["cep"];
  var bairro = document.forms[1]["bairro"];
  var data = document.forms[1]["data"];


   idCliente.value=response.id_cliente;
   nome.value=response.nome;
   telefone.value=response.telefone;
   celular.value=response.celular;
   endereco.value=response.endereco;
   email.value=response.email;
   cpf.value=response.cpf;
   cep.value=response.cep;
   bairro.value=response.bairro;
   data.value=response.dataNasc;

  
  


  

  }).fail(function(erro){

   console.log(erro);
});


  

}

function cadModal(){

  $('#cadModal').modal('show');
}


function save() {
 
  event.preventDefault();
 

  

  var url=location.protocol+"//"+location.host;
  var nome = document.forms[0]["nome"].value;
  var telefone = document.forms[0]["telefone"].value;
  var celular = document.forms[0]["celular"].value;
  var endereco = document.forms[0]["endereco"].value;
  var email = document.forms[0]["email"].value;
  var cpf = document.forms[0]["cpf"].value;
  var cep = document.forms[0]["cep"].value;
  var bairro = document.forms[0]["bairro"].value;
  var data = document.forms[0]["data"].value;
  
 document.getElementById('save_sub').disabled=true;
  
       
         var obj={}
         obj.nome=nome;
         obj.telefone=telefone;
         obj.celular=celular;
         obj.email=email;
         obj.endereco=endereco;
         obj.data=data;
         obj.cpf=cpf;
         obj.cep=cep;
         obj.bairro=bairro;


         
         
      $.ajax({

          url:url+'/app/cliente/cadastro',
          type:'post',
          contentType: 'application/json',
          data:JSON.stringify(obj)
      }).done(function(msg){

       

          Consulta(document.getElementById('consulta'));
          
          document.forms[0].reset();

          document.getElementById('save_sub').disabled=false;

           $.growl.notice({ title: "", message: "Usuário cadastrado com sucesso", location: "tc" });

           $('#cadModal').modal('hide');

           
      
      
          }).fail(function(erro){

            

            if(erro.status==400){

              $.growl.warning({ title: "Permissão Negada", message: "Sem permissão para salvar!", location: "tc" });

            }else if(erro.status==404){
              document.getElementById('save_sub').disabled=false;
              $.growl.warning({ title: "", message: erro.responseJSON, location: "tc" });

              

            }
      });

      



}


function saveEditar() {

  event.preventDefault();
 

  

  var url=location.protocol+"//"+location.host;
  var id_cliente = document.forms[1]["idCliente"].value;
  var nome = document.forms[1]["nome"].value;
  var telefone = document.forms[1]["telefone"].value;
  var celular = document.forms[1]["celular"].value;
  var endereco = document.forms[1]["endereco"].value;
  var email = document.forms[1]["email"].value;
  var cpf = document.forms[1]["cpf"].value;
  var cep = document.forms[1]["cep"].value;
  var bairro = document.forms[1]["bairro"].value;
  var data = document.forms[1]["data"].value;

 
         
      document.getElementById('save_subEdit').disabled=true;
  
       
      var obj={};
      obj.id_cliente=id_cliente;
      obj.nome=nome;
      obj.telefone=telefone;
      obj.celular=celular;
      obj.email=email;
      obj.endereco=endereco;
      obj.data=data;
      obj.cpf=cpf;
      obj.cep=cep;
      obj.bairro=bairro;


        
         
      $.ajax({

          url:url+'/app/cliente/editar',
          type:'put',
          contentType: 'application/json',
          data:JSON.stringify(obj)
      }).done(function(msg){

        
        

          Consulta(document.getElementById('consulta'));
          
          document.forms[1].reset();

          document.getElementById('save_subEdit').disabled=false;

           $.growl.notice({ title: "", message: "Usuário editado com sucesso", location: "tc" });

           $('#editarModal').modal('hide');

           
      
      
          }).fail(function(erro){

            

            if(erro.status==400){

              $.growl.warning({ title: "Permissão Negada", message: "Sem permissão para salvar!", location: "tc" });

            }else if(erro.status==404){
              document.getElementById('save_subEdit').disabled=false;
              $.growl.warning({ title: "", message: erro.responseJSON, location: "tc" });

            }
      });

      
  



}

