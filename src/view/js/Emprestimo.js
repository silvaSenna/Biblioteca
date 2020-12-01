


function Consulta(e) {

   
   var valor=e.value;
  
  if(valor.search('^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[012])/[12][0-9]{3}$')!=-1){
    
     
      var data=valor.split('/');

      valor=data[2]+'-'+data[1]+'-'+data[0];

  }



    
    var url=location.protocol+"//"+location.host;

   $.ajax({

            url:url+'/app/emprestimo/consulta?buscar='+valor,
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

               html+="<tr>"+"<td>"+tr.Emprestimo.id_emp+"</td><td>"+tr.Emprestimo.Cliente.nome+"</td><td>"+tr.Emprestimo.Cliente.cpf+"</td><td>"+tr.Emprestimo.Usuario.nome+"</td><td>"+tr.Emprestimo.Livro.titulo+"</td><td>"+moment(tr.Emprestimo.dataEmprestimo).format("DD/MM/YYYY")+"</td><td>"+moment(tr.Emprestimo.dataDevolucao).format("DD/MM/YYYY")+"</td><td>"+(tr.status==true? 'Emprestado':'Finalizado')+"</td><td><i class='material-icons' onclick='editar("+tr.Emprestimo.id_emp+")' >mode_edit</i> <i class='material-icons' onclick='modalFinalizar("+tr.Emprestimo.id_emp+")' >check_circle</i><i class='material-icons' onclick='modalExcluir("+tr.Emprestimo.id_emp+")' >delete</i> </td>"+"</tr>";
              
              
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

           url:url+'/app/emprestimo/consulta?buscar='+consulta+"&pages="+valor,
           type:'GET',
           contentType: 'application/json',
           
       }).done(function(data){

         $('#paginacao').html('');

         $('#tableLivro').html('');
           
         $.map(data.rows,function(tr){

             
          var html='';

          html+="<tr>"+"<td>"+tr.Emprestimo.id_emp+"</td><td>"+tr.Emprestimo.Cliente.nome+"</td><td>"+tr.Emprestimo.Cliente.cpf+"</td><td>"+tr.Emprestimo.Usuario.nome+"</td><td>"+tr.Emprestimo.Livro.titulo+"</td><td>"+moment(tr.Emprestimo.dataEmprestimo).format("DD/MM/YYYY")+"</td><td>"+moment(tr.Emprestimo.dataDevolucao).format("DD/MM/YYYY")+"</td><td>"+(tr.status==true? 'Emprestado':'Finalizado')+"</td><td><i class='material-icons' onclick='editar("+tr.Emprestimo.id_emp+")' >mode_edit</i> <i class='material-icons' onclick='modalFinalizar("+tr.Emprestimo.id_emp+")' >check_circle</i><i class='material-icons' onclick='modalExcluir("+tr.Emprestimo.id_emp+")' >delete</i></td>"+"</tr>";
                  
         
             
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

function modalFinalizar(id){

  $('#idFinalizar').val(id);

  
  $('#ModalFinalizar').modal('show');

 


}



 function excluirEmprestimo(){


  $('#ModalExcluir').modal('hide');


  var url=location.protocol+"//"+location.host;

  var id=parseInt($('#idExcluir').val());

  $.ajax({

           url:url+'/app/emprestimo/excluir?id='+id,
           type:'DELETE',
           contentType: 'application/json',
           
       }).done(function(data){

          Consulta(document.getElementById('consulta'));

           }).fail(function(erro){

            if(erro.status==400){
              
              $.growl.warning({ title: "Permissão negada!", message: "Sem permissão para excluir!", location: "tc" });

            }else if(erro.status==404){
                  
              $.growl.warning({ title: "", message: erro.responseJSON, location: "tc" });


            }
       });



}



function finalizarEmprestimo(){


  $('#ModalFinalizar').modal('hide');


  var url=location.protocol+"//"+location.host;

  var id=parseInt($('#idFinalizar').val());

  $.ajax({

           url:url+'/app/emprestimo/finalizarEmprestimo?id='+id,
           type:'GET',
           contentType: 'application/json',
           
       }).done(function(data){

          Consulta(document.getElementById('consulta'));

           }).fail(function(erro){

            if(erro.status==400){
              
              $.growl.warning({ title: "Permissão negada!", message: "Sem permissão para finalizar emprestimo!", location: "tc" });

            }
       });



}



function editar(id){


  var url=location.protocol+"//"+location.host;
  $('#editarModal').modal('show');


  
  $.ajax({

    url:url+'/app/emprestimo/consultaEditar?id='+id,
    type:'GET',
    contentType: 'application/json',
    
}).done(function(response){


  console.log(response);
 
  
  var idCliente = document.forms[1]["idCliente"];
  var idLivro = document.forms[1]["idLivro"];
  
  var cpf = document.forms[1]["cpf"];
  var clienteEmp = document.forms[1]["clienteEmp"];
  var  ident=document.forms[1]["ident"];
  var  codigo=document.forms[1]["codigoLivro"];
  var  idLivro=document.forms[1]["idLivro"];
  var  Livro=document.forms[1]["livro"];
  var  dataEmp=document.forms[1]["dataEmprestimo"];
  var  dataDev=document.forms[1]["dataDevolucao"];

  var idemp=document.forms[1]["idemprestimo"];

  e={};
  e.value=response.Emprestimo.Livro.nome_identificacao;

  adicionarTipoCodigoLivro(e,0);
  
  var option=ident.options;

  for(var i=0;i<option.length;i++){

      if(option[i].value==response.Emprestimo.Livro.nome_identificacao){


        ident.selectedIndex=i;


      }

  }

   idCliente.value=response.Emprestimo.Cliente.id_cliente;
   cpf.value=response.Emprestimo.Cliente.cpf;
   clienteEmp.value=response.Emprestimo.Cliente.nome;
   codigo.value=response.Emprestimo.Livro.codigo;
   idLivro.value=response.Emprestimo.Livro.idlivro;
   Livro.value=response.Emprestimo.Livro.titulo;
   dataEmp.value=response.Emprestimo.dataEmprestimo;
   dataDev.value=response.Emprestimo.dataDevolucao;
   idemp.value=response.Emprestimo.id_emp;
  
   


  


  

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
  var idCliente = document.forms[0]["idCliente"].value;
  var idLivro = document.forms[0]["idLivro"].value;
  var dataEmprestimo = document.forms[0]["dataEmprestimo"].value;
  var dataDevolucao = document.forms[0]["dataDevolucao"].value;
  
  
 document.getElementById('save_sub').disabled=true;
  
       
         var obj={}
         obj.idlivro=idLivro;
         obj.idCliente=idCliente;
         obj.dataEmp=dataEmprestimo;
         obj.dataDev=dataDevolucao;
        


         
         
      $.ajax({

          url:url+'/app/emprestimo/cadastro',
          type:'post',
          contentType: 'application/json',
          data:JSON.stringify(obj)
      }).done(function(data){

       

       

         Consulta(document.getElementById('consulta'));
          
          document.forms[0].reset();

          document.getElementById('save_sub').disabled=false;

           $.growl.notice({ title: "", message: "Emprestimo cadastrado com sucesso", location: "tc" });

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
  var idCliente = document.forms[1]["idCliente"].value;
  var idLivro = document.forms[1]["idLivro"].value;

  var  idLivro=document.forms[1]["idLivro"].value;

  var  dataEmp=document.forms[1]["dataEmprestimo"].value;
  var  dataDev=document.forms[1]["dataDevolucao"].value;
  var idemp=document.forms[1]["idemprestimo"].value;
 
         
      document.getElementById('save_subEdit').disabled=true;
  
       
      var obj={}
      obj.idEmp=idemp;
      obj.idlivro=idLivro;
      obj.idCliente=idCliente;
      obj.dataEmp=dataEmp;
      obj.dataDev=dataDev;


        
         
      $.ajax({

          url:url+'/app/emprestimo/editar',
          type:'put',
          contentType: 'application/json',
          data:JSON.stringify(obj)
      }).done(function(data){

        
        console.log(data);
        

          Consulta(document.getElementById('consulta'));
          
          document.forms[1].reset();

          document.getElementById('save_subEdit').disabled=false;

           $.growl.notice({ title: "", message: "Emprestimo editado com sucesso", location: "tc" });

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



function adicionarCliente(e){

  

  if(e.value.length==14){

   
    var url=location.protocol+"//"+location.host;
 $.ajax({

    url:url+'/app/emprestimo/consultaCliente?cpf='+e.value,
    type:'GET',
    contentType: 'application/json',
    
}).done(function(dados){

     
     
      document.forms[0]["idCliente"].value=dados.id_cliente;
      document.forms[0]["clienteEmp"].value=dados.nome;
    

     


    }).fail(function(erro){


      if(erro.status==400){

        $.growl.warning({ title: "Permissão Negada", message: "Sem permissão para salvar!", location: "tc" });

      }else if(erro.status==404){
        
        
        $.growl.warning({ title: "", message: erro.responseJSON, location: "tc" });

        document.forms[0]["clienteEmp"].value="";

      }
    });


  }



}


function adicionarClienteEdit(e){

  

  if(e.value.length==14){

   
    var url=location.protocol+"//"+location.host;
 $.ajax({

    url:url+'/app/emprestimo/consultaCliente?cpf='+e.value,
    type:'GET',
    contentType: 'application/json',
    
}).done(function(dados){

     
     
      document.forms[1]["idCliente"].value=dados.id_cliente;
      document.forms[1]["clienteEmp"].value=dados.nome;
    

     


    }).fail(function(erro){


      if(erro.status==400){

        $.growl.warning({ title: "Permissão Negada", message: "Sem permissão para salvar!", location: "tc" });

      }else if(erro.status==404){
        
        
        $.growl.warning({ title: "", message: erro.responseJSON, location: "tc" });

        document.forms[1]["clienteEmp"].value="";

      }
    });


  }



}


function adicionarTipoCodigoLivro(e,tipo){

  var codigo=tipo==1? document.forms[0]["codigoLivro"] : document.forms[1]["codigoLivro"];

  switch(e.value){

    case 'isbn':
 
    codigo.disabled=false;
    codigo.setAttribute('minlength','17');
    
    
    $("input[name='codigoLivro']").mask('000-00-000-0000-0');
 
 
    break;
 
    case 'issn':
 
    codigo.disabled=false;
    codigo.setAttribute('minlength','7');
   
 
    $("input[name='codigoLivro']").mask('0000-0000');
    
 
 
    break;
 
    case 'doi':
    codigo.disabled=false;
    codigo.setAttribute('minlength','27');
    
 
    $("input[name='codigoLivro']").mask('00.0000/0000.0000.0000.0000');
    
 
 
    break;
 
    default:
    codigo.required=false;
    codigo.disabled=true;
    
 
   }




}


function adicionarLivro(e){
  var url=location.protocol+"//"+location.host;
  var ident=document.forms[0]["ident"].value;
  var codigo=e.value;



   if(ident=='isbn' && codigo.length==17){


 $.ajax({

    url:url+'/app/emprestimo/consultaLivro?ident='+ident+'&codigo='+codigo,
    type:'GET',
    contentType: 'application/json',
    
}).done(function(dados){

      
      
      document.forms[0]["idLivro"].value=dados.idlivro;
      document.forms[0]["livro"].value=dados.titulo;
  

    }).fail(function(erro){


      if(erro.status==400){

        $.growl.warning({ title: "Permissão Negada", message: "Sem permissão para salvar!", location: "tc" });

      }else if(erro.status==404){
        
        
        $.growl.warning({ title: "", message: erro.responseJSON, location: "tc" });

        document.forms[0]["livro"].value="";
        document.forms[0]["idLivro"].value="";

      }
    });


   }else if(ident=='issn' && codigo.length==7){




    $.ajax({

      url:url+'/app/emprestimo/consultaLivro?ident='+ident+'&codigo='+codigo,
      type:'GET',
      contentType: 'application/json',
      
  }).done(function(dados){
  
    document.forms[0]["idLivro"].value=dados.idlivro;
    document.forms[0]["livro"].value=dados.titulo;
    
  
      }).fail(function(erro){
  
  
        if(erro.status==400){
  
          $.growl.warning({ title: "Permissão Negada", message: "Sem permissão para salvar!", location: "tc" });
  
        }else if(erro.status==404){
          
          
          $.growl.warning({ title: "", message: erro.responseJSON, location: "tc" });
  
          document.forms[0]["livro"].value="";
          document.forms[0]["idLivro"].value="";
  
        }
      });



   }else if(ident=='doi' && codigo.length==27){


    $.ajax({

      url:url+'/app/emprestimo/consultaLivro?ident='+ident+'&codigo='+codigo,
      type:'GET',
      contentType: 'application/json',
      
  }).done(function(dados){
  
    document.forms[0]["idLivro"].value=dados.idlivro;
    document.forms[0]["livro"].value=dados.titulo;
    
  
      }).fail(function(erro){
  
  
        if(erro.status==400){
  
          $.growl.warning({ title: "Permissão Negada", message: "Sem permissão para salvar!", location: "tc" });
  
        }else if(erro.status==404){
          
          
          $.growl.warning({ title: "", message: erro.responseJSON, location: "tc" });
  
          document.forms[0]["livro"].value="";
          document.forms[0]["idLivro"].value="";
  
        }
      });


   }
    
   


}


function calculoDevolucao(e,tipo){
 
  
  if(tipo==1){

  var dataEmp=moment(e.value).format('YYYY-MM-DD');


  document.forms[0]["dataDevolucao"].value=moment(dataEmp).add(10,'days').format('YYYY-MM-DD');

  }else{
   
    var dataEmp=moment(e.value).format('YYYY-MM-DD');


   document.forms[1]["dataDevolucao"].value=moment(dataEmp).add(10,'days').format('YYYY-MM-DD');

  }


}



function adicionarLivroEdit(e){
  var url=location.protocol+"//"+location.host;
  var ident=document.forms[1]["ident"].value;
  var codigo=e.value;



   if(ident=='isbn' && codigo.length==17){


 $.ajax({

    url:url+'/app/emprestimo/consultaLivro?ident='+ident+'&codigo='+codigo,
    type:'GET',
    contentType: 'application/json',
    
}).done(function(dados){

      
      
      document.forms[1]["idLivro"].value=dados.idlivro;
      document.forms[1]["livro"].value=dados.titulo;
  

    }).fail(function(erro){


      if(erro.status==400){

        $.growl.warning({ title: "Permissão Negada", message: "Sem permissão para salvar!", location: "tc" });

      }else if(erro.status==404){
        
        
        $.growl.warning({ title: "", message: erro.responseJSON, location: "tc" });

        document.forms[1]["livro"].value="";
        document.forms[1]["idLivro"].value="";

      }
    });


   }else if(ident=='issn' && codigo.length==7){




    $.ajax({

      url:url+'/app/emprestimo/consultaLivro?ident='+ident+'&codigo='+codigo,
      type:'GET',
      contentType: 'application/json',
      
  }).done(function(dados){
  
    document.forms[1]["idLivro"].value=dados.idlivro;
    document.forms[1]["livro"].value=dados.titulo;
    
  
      }).fail(function(erro){
  
  
        if(erro.status==400){
  
          $.growl.warning({ title: "Permissão Negada", message: "Sem permissão para salvar!", location: "tc" });
  
        }else if(erro.status==404){
          
          
          $.growl.warning({ title: "", message: erro.responseJSON, location: "tc" });
  
          document.forms[1]["livro"].value="";
          document.forms[1]["idLivro"].value="";
  
        }
      });



   }else if(ident=='doi' && codigo.length==27){


    $.ajax({

      url:url+'/app/emprestimo/consultaLivro?ident='+ident+'&codigo='+codigo,
      type:'GET',
      contentType: 'application/json',
      
  }).done(function(dados){
  
    document.forms[1]["idLivro"].value=dados.idlivro;
    document.forms[1]["livro"].value=dados.titulo;
    
  
      }).fail(function(erro){
  
  
        if(erro.status==400){
  
          $.growl.warning({ title: "Permissão Negada", message: "Sem permissão para salvar!", location: "tc" });
  
        }else if(erro.status==404){
          
          
          $.growl.warning({ title: "", message: erro.responseJSON, location: "tc" });
  
          document.forms[1]["livro"].value="";
          document.forms[1]["idLivro"].value="";
  
        }
      });


   }
    
   


}
