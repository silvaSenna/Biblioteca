


function Consulta(e) {

   

    var url=location.protocol+"//"+location.host;

   $.ajax({

            url:url+'/app/usuario/consulta?buscar='+e.value,
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

               html+="<tr>"+"<td>"+tr.Usuario.id_user+"</td><td>"+tr.login+"</td><td>"+tr.Usuario.nome+"</td><td>"+tr.Usuario.email+"</td><td>"+tr.Usuario.Grupo.nome_group+"</td><td><i class='material-icons' onclick='editar("+tr.Usuario.id_user+")' >mode_edit</i> <i class='material-icons' onclick='modalExcluir("+tr.Usuario.id_user+")' >delete</i></td>"+"</tr>";
              
              
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

           url:url+'/app/usuario/consulta?buscar='+consulta+"&pages="+valor,
           type:'GET',
           contentType: 'application/json',
           
       }).done(function(data){

         $('#paginacao').html('');

         $('#tableLivro').html('');
           
         $.map(data.rows,function(tr){

             
          var html='';

           html+="<tr>"+"<td>"+tr.Usuario.id_user+"</td><td>"+tr.login+"</td><td>"+tr.Usuario.nome+"</td><td>"+tr.Usuario.email+"</td><td>"+tr.Usuario.Grupo.nome_group+"</td><td><i class='material-icons' onclick='editar("+tr.Usuario.id_user+")' >mode_edit</i> <i class='material-icons' onclick='modalExcluir("+tr.Usuario.id_user+")' >delete</i></td>"+"</tr>";
         
         
             
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

 function excluirUsuario(){


  $('#ModalExcluir').modal('hide');


  var url=location.protocol+"//"+location.host;

  var id=parseInt($('#idExcluir').val());

  $.ajax({

           url:url+'/app/usuario/excluir?id='+id,
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

    url:url+'/app/usuario/consultaEditar?id='+id,
    type:'GET',
    contentType: 'application/json',
    
}).done(function(response){


  
 
  var id = document.forms[1]["idUser"];
  var nome = document.forms[1]["nome"];
  var telefone = document.forms[1]["telefone"];
  var celular = document.forms[1]["celular"];
  var endereco = document.forms[1]["endereco"];
  var email = document.forms[1]["email"];
  var login = document.forms[1]["login"];
  var senha = document.forms[1]["senha"];
  var repsenha = document.forms[1]["repsenha"];
  var Grupo = document.forms[1]["grupo"];
  var data = document.forms[1]["data"];

  id.value=response.Usuario.id_user;
  nome.value=response.Usuario.nome;
  celular.value=response.Usuario.celular;
  endereco.value=response.Usuario.endereco;
  email.value=response.Usuario.email;
  telefone.value=response.Usuario.telefone;
  login.value=response.login;
  senha.value=response.senha;
  repsenha.value=response.senha;
  data.value=response.Usuario.dataNasc;
  Grupo.selectedIndex=response.Usuario.Grupo.id_group;
  
  


  

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
  var nome = document.forms[0]["nome"].value;
  var telefone = document.forms[0]["telefone"].value;
  var celular = document.forms[0]["celular"].value;
  var endereco = document.forms[0]["endereco"].value;
  var email = document.forms[0]["email"].value;
  var login = document.forms[0]["login"].value;
  var senha = document.forms[0]["senha"].value;
  var Grupo = document.forms[0]["grupo"].value;
  var data = document.forms[0]["data"].value;

  var validNome = document.getElementById('validNome');
  var validTelefone = document.getElementById('validTelefone');
  var validCelular = document.getElementById('validCelular');
  var validEndereco = document.getElementById('validEndereco');
  var validLogin = document.getElementById('validLogin');
  var validSenha = document.getElementById('validSenha');
  var validGrupo = document.getElementById('validGrupo');
  var validEmail = document.getElementById('validEmail');
  var validData = document.getElementById('validData');


   validNome.innerHTML='';
   validTelefone.innerHTML='';
   validCelular.innerHTML='';
   validEndereco.innerHTML='';
   validLogin.innerHTML='';
   validSenha.innerHTML='';
   validGrupo.innerHTML='';

   validEmail.innerHTML='';

   validData.innerHTML='';
  



  validar = true;
 

  if (nome.length == 0) {



      validNome.style.color = "red";
      validNome.innerHTML = 'Este campo está vazio!';
      validar = false;

  }

  if (data.length == 0) {



    validData.style.color = "red";
    validData.innerHTML = 'Este campo está vazio!';
    validar = false;

}


  if (telefone.length == 0) {



      validTelefone.style.color = "red";
      validTelefone.innerHTML = 'Este campo está vazio!';
      validar = false;
  }

  if (celular.length == 0) {



      validCelular.style.color = "red";
      validCelular.innerHTML = 'Este campo está vazio!';
      validar = false;

  }

  if (endereco.length == 0) {



      validEndereco.style.color = "red";
      validEndereco.innerHTML = 'Este campo está vazio!';

      validar = false;

  }



  if (login.length == 0) {



    validLogin.style.color = "red";
    validLogin.innerHTML = 'Este campo está vazio!';

    validar = false;

}

if (senha.length == 0) {



  validSenha.style.color = "red";
  validSenha.innerHTML = 'Este campo está vazio!';

  validar = false;

}


if (email.length == 0) {



  validEmail.style.color = "red";
  validEmail.innerHTML = 'Este campo está vazio!';

  validar = false;

}

if (Grupo.length == 0) {



  validGrupo.style.color = "red";
  validGrupo.innerHTML = 'Este campo está vazio!';

  validar = false;

}



  if (validar == false) {

      $.growl.warning({ title: "", message: "Preencha os campos corretamente.", location: "tc" });

  }




  if (validar == true ) {
         
      document.getElementById('save_sub').disabled=true;
  
       
         var obj={}
         obj.nome=nome;
         obj.telefone=telefone;
         obj.celular=celular;
         obj.email=email;
         obj.endereco=endereco;
         obj.data=data;
         obj.login=login;
         obj.senha=senha;
         obj.grupo=Grupo;


        
         
      $.ajax({

          url:url+'/app/usuario/cadastro',
          type:'post',
          contentType: 'application/json',
          data:JSON.stringify(obj)
      }).done(function(msg){

        //console.log(msg);

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
              $.growl.warning({ title: "", message: "Esses dados já existem cadastrados no sistema!", location: "tc" });

            }
      });

      
  }


}


function saveEditar() {

  event.preventDefault();
 

  

  var url=location.protocol+"//"+location.host;
  var id_user = document.forms[1]["idUser"].value;
  var nome = document.forms[1]["nome"].value;
  var telefone = document.forms[1]["telefone"].value;
  var celular = document.forms[1]["celular"].value;
  var endereco = document.forms[1]["endereco"].value;
  var email = document.forms[1]["email"].value;
  var login = document.forms[1]["login"].value;
  var senha = document.forms[1]["senha"].value;
  var Grupo = document.forms[1]["grupo"].value;
  var data = document.forms[1]["data"].value;

  var validNome = document.getElementById('validNome');
  var validTelefone = document.getElementById('validTelefone');
  var validCelular = document.getElementById('validCelular');
  var validEndereco = document.getElementById('validEndereco');
  var validLogin = document.getElementById('validLogin');
  var validSenha = document.getElementById('validSenha');
  var validGrupo = document.getElementById('validGrupo');
  var validEmail = document.getElementById('validEmail');
  var validData = document.getElementById('validData');


   validNome.innerHTML='';
   validTelefone.innerHTML='';
   validCelular.innerHTML='';
   validEndereco.innerHTML='';
   validLogin.innerHTML='';
   validSenha.innerHTML='';
   validGrupo.innerHTML='';

   validEmail.innerHTML='';

   validData.innerHTML='';
  



  validar = true;
 

  if (nome.length == 0) {



      validNome.style.color = "red";
      validNome.innerHTML = 'Este campo está vazio!';
      validar = false;

  }

  if (data.length == 0) {



    validData.style.color = "red";
    validData.innerHTML = 'Este campo está vazio!';
    validar = false;

}


  if (telefone.length == 0) {



      validTelefone.style.color = "red";
      validTelefone.innerHTML = 'Este campo está vazio!';
      validar = false;
  }

  if (celular.length == 0) {



      validCelular.style.color = "red";
      validCelular.innerHTML = 'Este campo está vazio!';
      validar = false;

  }

  if (endereco.length == 0) {



      validEndereco.style.color = "red";
      validEndereco.innerHTML = 'Este campo está vazio!';

      validar = false;

  }



  if (login.length == 0) {



    validLogin.style.color = "red";
    validLogin.innerHTML = 'Este campo está vazio!';

    validar = false;

}

if (senha.length == 0) {



  validSenha.style.color = "red";
  validSenha.innerHTML = 'Este campo está vazio!';

  validar = false;

}


if (email.length == 0) {



  validEmail.style.color = "red";
  validEmail.innerHTML = 'Este campo está vazio!';

  validar = false;

}

if (Grupo.length == 0) {



  validGrupo.style.color = "red";
  validGrupo.innerHTML = 'Este campo está vazio!';

  validar = false;

}



  if (validar == false) {

      $.growl.warning({ title: "", message: "Preencha os campos corretamente.", location: "tc" });

  }




  if (validar == true ) {
         
      document.getElementById('save_subEdit').disabled=true;
  
       
         var obj={};
         obj.id=id_user;
         obj.nome=nome;
         obj.telefone=telefone;
         obj.celular=celular;
         obj.email=email;
         obj.endereco=endereco;
         obj.data=data;
         obj.login=login;
         obj.senha=senha;
         obj.grupo=Grupo;


        
         
      $.ajax({

          url:url+'/app/usuario/editar',
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

            //console.log(erro.responseText);

            if(erro.status==400){

              $.growl.warning({ title: "Permissão Negada", message: "Sem permissão para salvar!", location: "tc" });

            }else if(erro.status==404){
              document.getElementById('save_subEdit').disabled=false;
              $.growl.warning({ title: "", message: "Esses dados já existem cadastrados no sistema!", location: "tc" });

            }else if(erro.status==402){

              document.getElementById('save_subEdit').disabled=false;
              $.growl.warning({ title: "", message: erro.responseJSON, location: "tc" });

            }
      });

      
  }



}

function altSenha(){

var senha=document.forms[1].senha.value;
var senhaRep=document.forms[1].repsenha.value;

if(senha!=senhaRep){

  document.forms[1].senha.value=calcMD5(senha);

}



}



function validarEmail(e){

  var url=location.protocol+"//"+location.host;

 $.ajax({

  url:url+'/app/usuario/validarCampUnique?email='+e,
  type:'GET',
  contentType: 'application/json',
}).done(function(data){


  if(data!=0){


    document.getElementById('save_sub').disabled=true;
    $.growl.warning({ title: "Email invalido.", message: "Este e-mail já existe cadastrado no sistema!", location: "tc" });

    return false;



  }else{

    document.getElementById('save_sub').disabled=false;


  }

  


  }).fail(function(erro){

   

    if(erro.status==400){

      $.growl.warning({ title: "Permissão Negada", message: "Sem permissão!", location: "tc" });

    }
});







}



function validarLogin(e){

  var url=location.protocol+"//"+location.host;

 $.ajax({

  url:url+'/app/usuario/validarCampUnique?login='+e,
  type:'GET',
  contentType: 'application/json',
}).done(function(data){


  if(data!=0){


    document.getElementById('save_sub').disabled=true;
    $.growl.warning({ title: "Login invalido.", message: "Este login já existe cadastrado no sistema!", location: "tc" });

    return false;



  }else{

    document.getElementById('save_sub').disabled=false;


  }

  


  }).fail(function(erro){

   

    if(erro.status==400){

      $.growl.warning({ title: "Permissão Negada", message: "Sem permissão!", location: "tc" });

    }
});







}


function fechar(){

document.forms[0].reset();

}