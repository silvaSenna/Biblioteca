

function save() {

    event.preventDefault();

    var url=location.protocol+"//"+location.host;
    var titulo = document.forms[0]["titulo"].value;
    var autor = document.forms[0]["autor"].value;
    var editora = document.forms[0]["editora"].value;
    var edicao = document.forms[0]["edicao"].value;
    var validTitulo = document.getElementById('validTitulo');
    var validAutor = document.getElementById('validAutor');
    var validEditora = document.getElementById('validEditora');
    var validEdicao = document.getElementById('validEdicao');
    validTitulo.innerHTML = '';
    validAutor.innerHTML = '';
    validEditora.innerHTML = '';
    validEdicao.innerHTML = '';
    validar = true;
   

    if (titulo.length == 0) {



        validTitulo.style.color = "red";
        validTitulo.innerHTML = 'Este campo está vazio!';
        validar = false;

    }


    if (autor.length == 0) {



        validAutor.style.color = "red";
        validAutor.innerHTML = 'Este campo está vazio!';
        validar = false;
    }

    if (editora.length == 0) {



        validEditora.style.color = "red";
        validEditora.innerHTML = 'Este campo está vazio!';
        validar = false;

    }

    if (edicao.length == 0) {



        validEdicao.style.color = "red";
        validEdicao.innerHTML = 'Este campo está vazio!';

        validar = false;

    }

    if (validar == false) {

        $.growl.warning({ title: "", message: "Preencha os campos corretamente!", location: "tc" });

    }

  


    if (validar == true ) {
           
        document.getElementById('save_sub').disabled=true;
           var path=location.pathname;
           var data={}
           data.titulo=titulo;
           data.editora=editora;
           data.edicao=edicao;
           data.autor=autor;
           data.path=path;

           

        


        $.ajax({

            url:url+'/app/livro/livrocad',
            type:'post',
            contentType: 'application/json',
            data:JSON.stringify(data)
        }).done(function(msg){

             
            document.forms[0].reset();
            document.getElementById('save_sub').disabled=false;
             $.growl.notice({ title: "", message: "Livro cadastrado com sucesso", location: "tc" });

             
        
        
            }).fail(function(erro){

              if(erro.status==400){

                $.growl.warning({ title: "Permissão Negada", message: "Sem permissão para salvar!", location: "tc" });

              }
        });

        
    }


}

