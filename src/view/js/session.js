 /* window.onload=function(){
    var url=location.protocol+"//"+location.host;
    var path=location.pathname;

   $.ajax({

       url:url+'/app/home/permissao?path='+path,
       type:'GET',
       contentType:"application/json",

    }).done(function(data){
       
      window.localStorage.setItem("interface",JSON.stringify(data));

      if(data.ver==false){


            $('#panels').hide();
            $.growl.warning({ title: "Permissão Negada", message: "Sem permissão para acessar essa pagina!", location: "tc" });

      }
      
      

    }).fail(function(erro){

      if(erro.status==400 && location.href!=url+'/')  location.href='/';

    });
}*/
   

