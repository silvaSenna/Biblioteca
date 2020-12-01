


function Consulta(e) {

   

    var url=location.protocol+"//"+location.host;

   $.ajax({

            url:url+'/app/livro/consulta?valor='+e.value,
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

               html+="<tr>"+"<td>"+tr.idlivro+"</td><td>"+tr.titulo+"</td><td>"+tr.autor+"</td><td>"+tr.editora+"</td><td>"+tr.edicao+"</td><td>"+tr.nome_identificacao+"</td><td>"+tr.codigo+"</td><td><i class='material-icons' onclick='editar("+tr.idlivro+")' >mode_edit</i> <i class='material-icons' onclick='modalExcluir("+tr.idlivro+")' >delete</i></td>"+"</tr>";
              
              
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

           url:url+'/app/livro/consulta?valor='+consulta+"&pages="+valor,
           type:'GET',
           contentType: 'application/json',
           
       }).done(function(data){

         $('#paginacao').html('');

         $('#tableLivro').html('');
           
         $.map(data.rows,function(tr){

             
              var html='';

              html+="<tr>"+"<td>"+tr.idlivro+"</td><td>"+tr.titulo+"</td><td>"+tr.autor+"</td><td>"+tr.editora+"</td><td>"+tr.edicao+"</td><td>"+tr.nome_identificacao+"</td><td>"+tr.codigo+"</td><td><i class='material-icons' onclick='editar("+tr.idlivro+")' >mode_edit</i> <i class='material-icons' onclick='modalExcluir("+tr.idlivro+")' >delete</i></td>"+"</tr>";
              
             
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

 function excluirLivro(){


  $('#ModalExcluir').modal('hide');


  var url=location.protocol+"//"+location.host;

  var id=parseInt($('#idExcluir').val());

  $.ajax({

           url:url+'/app/livro/excluir?id='+id,
           type:'DELETE',
           contentType: 'application/json',
           
       }).done(function(data){

          Consulta(document.getElementById('consulta'));

           }).fail(function(erro){

            if(erro.status==400){
             
              $.growl.warning({ title: "", message: "Sem permissão para excluir!", location: "tc" });

            }
       });



}




function editar(id){


  var url=location.protocol+"//"+location.host;
  $('#editarModal').modal('show');


  
  $.ajax({

    url:url+'/app/livro/ConsultaEditar?id='+id,
    type:'GET',
    contentType: 'application/json',
    
}).done(function(data){


  
  var titulo = document.forms[1]["titulo"];
  var autor = document.forms[1]["autor"];
  var editora = document.forms[1]["editora"];
  var edicao = document.forms[1]["edicao"];
  var idLivro = document.forms[1]["idLivro"];
  var ident=document.forms[1]["ident"];
  var codigo=document.forms[1]["codigo"];
  idLivro.value=data.idlivro;
  titulo.value=data.titulo;
  autor.value=data.autor;
  editora.value=data.editora;
  edicao.value=data.edicao;
  codigo.value=data.codigo;
  var options=ident.options;


  
  switch(data.nome_identificacao){

  case 'issbn':

     $("input[name='codigo']").mask('000-00-000-0000-0');

  break;

  case 'issn':
  $("input[name='codigo']").mask('0000-0000');

  break;

  case 'doi':
    $("input[name='codigo']").mask('00.0000/0000.0000.0000.0000');
  break;


  }

   
  for(var i=0;i<options.length;i++){

    if(options[i].value==data.nome_identificacao){

      ident.selectedIndex=i;
    }

    
  }
  
  


  

  }).fail(function(jqXHR,textSatus,msg){

   console.log(msg,textSatus);
});


  

}

function cadModal(){

  $('#cadModal').modal('show');
}


function save() {

  event.preventDefault();

  var url=location.protocol+"//"+location.host;
  var titulo = document.forms[0]["titulo"].value;
  var autor = document.forms[0]["autor"].value;
  var editora = document.forms[0]["editora"].value;
  var edicao = document.forms[0]["edicao"].value;

  var ident = document.forms[0]["ident"].value;
  var codigo = document.forms[0]["codigo"].value;
  
 
         
      document.getElementById('save_sub').disabled=true;
         var path=location.pathname;
         var data={}
         data.titulo=titulo;
         data.editora=editora;
         data.edicao=edicao;
         data.autor=autor;
         data.ident=ident;
         data.codigo=codigo;
         data.path=path;

         
      $.ajax({

          url:url+'/app/livro/livrocad',
          type:'post',
          contentType: 'application/json',
          data:JSON.stringify(data)
      }).done(function(msg){

        Consulta(document.getElementById('consulta'));
          document.forms[0].reset();
          document.getElementById('save_sub').disabled=false;
           $.growl.notice({ title: "", message: "Livro cadastrado com sucesso", location: "tc" });

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
  var idLivro=document.forms[1]["idLivro"].value;
  var titulo = document.forms[1]["titulo"].value;
  var autor = document.forms[1]["autor"].value;
  var editora = document.forms[1]["editora"].value;
  var edicao = document.forms[1]["edicao"].value;
  var ident = document.forms[1]["ident"].value;
  var codigo = document.forms[1]["codigo"].value;
 

         
      document.getElementById('save_subEdit').disabled=true;

         var path=location.pathname;
         var data={}
         data.idlivro=idLivro;
         data.titulo=titulo;
         data.editora=editora;
         data.edicao=edicao;
         data.autor=autor;
         data.ident=ident;
         data.codigo=codigo;
         data.path=path;

         
      $.ajax({

          url:url+'/app/livro/editar',
          type:'put',
          contentType: 'application/json',
          data:JSON.stringify(data)
      }).done(function(msg){

          Consulta(document.getElementById('consulta'));
          document.forms[1].reset();
          document.getElementById('save_subEdit').disabled=false;
          $.growl.notice({ title: "", message: "Livro editado com sucesso", location: "tc" });

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


function fechar(){

  document.forms[0].reset();
  
  }



function campoIdentificacao(e,parm){

  
  
  var codigo= parm=='cad'? document.forms[0]['codigo']:document.forms[1]['codigo'];
  codigo.required=true;
 
  

  switch(e.value){

   case 'isbn':

   codigo.disabled=false;
   codigo.setAttribute('minlength','17');
   
   
   $("input[name='codigo']").mask('000-00-000-0000-0');


   break;

   case 'issn':

   codigo.disabled=false;
   codigo.setAttribute('minlength','7');
  

   $("input[name='codigo']").mask('0000-0000');
   


   break;

   case 'doi':
   codigo.disabled=false;
   codigo.setAttribute('minlength','27');
   

   $("input[name='codigo']").mask('00.0000/0000.0000.0000.0000');
   


   break;

   default:
   codigo.required=false;
   codigo.disabled=true;
   

  }

}  








