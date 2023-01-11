function hacerclic(){
//var lista=document.querySelectorAll("#principal tr:last-child td:first-child");
var lista=document.querySelectorAll("#principal td");
//alert(lista.length)
for(let i=0; i<lista.length;i++){
    lista[i].addEventListener("click",mostraralerta,false);
}

}
let operador=1;
let operacion="+" 
let operando1=0;
let operando2=0;
function mostraralerta(evt){
//alert('hizo clic!'+this.firstChild.nodeValue );
this.style.background="purple"
    let dato=this.innerHTML;
    let esNumero= !isNaN(dato);  
    moperacion.innerText=moperacion.innerText+dato;

    if(dato!=="=" && !esNumero && dato!=="C"  && dato!=="CE"){ 
        operando1=parseInt(moperacion.innerText)  
        moperacion.innerText="";
        operacion=dato;
        
    } 
  if(dato=="="){
    operando2=parseInt(moperacion.innerText)
  }
    
        
    if( dato=="="){      
        let resultado=0;
        if(operacion=="+")   {  resultado= operando1+operando2   }
        if(operacion=="-")   {  resultado= operando1-operador2   }
        if(operacion=="*")   {  resultado= operando1*operando2   }
        if(operacion=="/")   {  resultado= operando1/operando2   }
        document.getElementById("resultado").innerText=operando1+operacion+operando2+"="+resultado;
        moperacion.innerText=""
    }
    if( dato=="CE" ||  dato=="C"){
     // Recarga la página
     // Que el alumno implemente las funcionalidades estandar de CE y C en la  
     // calculadora
     oo=document.documentElement;
 
    location.reload()	}
}
window.onload=hacerclic;
