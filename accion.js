//MOSTRAR LONGITUD DE CLAVE   
function validarClave() {
    var vcla1=document.getElementById("clave").value;
    var disval= document.getElementById('valClave');
    var count8=8-vcla1.length;
    var count16=16-vcla1.length;
    var count32=32-vcla1.length;
    if(vcla1.length==8 || vcla1.length==16 || vcla1.length==32){
        disval.innerHTML  = `<h4> Clave Válida </h4>`;
    }else{
        if(vcla1.length<8){
            disval.innerHTML  = `<h4>Clave de 8 carácteres inválida</h4></p>`;    
        }else
        if(vcla1.length>8 && vcla1.length<16){
            disval.innerHTML  = `<h4>Clave de 16 caracteres inválida</h4></p>`;    
        }else
        if(vcla1.length>16 && vcla1.length<32){
            disval.innerHTML  = `<h4>Clave de 32 caracteres inválida</h4></p>`;    
        }                            
    }
}                                 
//CIFRAR CON DES
function cifradoDES(){    
    var cadena = document.getElementById("archivoc").value;
    var clave =  document.getElementById("clave").value
    var key = CryptoJS.MD5(clave).toString();
    var cifrado = CryptoJS.TripleDES.encrypt(cadena, key).toString();
    document.getElementById('ci').value = cifrado;
    document.getElementById("cci").innerHTML = cifrado;
    localStorage.setItem("cifraDES", cifrado);
    localStorage.setItem("cifradoDES", cifrado);        
    var pshw= document.getElementById('pshw');
    pshw.innerHTML  = `<div>
                        <button id="create" style="background-color: #AAACB0; font-size: 115%;">Crear archivo cifrado</button><br><br>
                        <a download="cifradoDES.txt" id="downloadlink" style="display: none; color: #4A1942;">Descargar</a>
                    </div> `;
}    
//DESCIFRAR CON DES
function descifradoDES(){
    var cadena = document.getElementById("archivoc").value;
    var clave =  document.getElementById("clave").value
    var key = CryptoJS.MD5(clave).toString();
    var descifrado = CryptoJS.TripleDES.decrypt(cadena, key);
    var deshow=descifrado.toString(CryptoJS.enc.Utf8);
    console.log(deshow);        
    document.getElementById("cdes").innerHTML = deshow;
    localStorage.setItem("descifradoDES", deshow);    
    pshw.innerHTML  = `<div>
                <button id="create" style="background-color: #AAACB0; font-size: 115%;">Crear archivo decifrado</button><br><br>
                <a download="descifradoDES.txt" id="downloadlink" style="display: none; color: #4A1942;">Descargar</a>
                </div>`;
}
//CIFRAR CON AES
function cifradoAES(){
    var cadena = document.getElementById("archivoc").value;
    var clave =  document.getElementById("clave").value
    var cifrado = CryptoJS.AES.encrypt(cadena, clave);
    document.getElementById('ci').value = cifrado;
    document.getElementById("cci").innerHTML = cifrado;
    localStorage.setItem("cifraAES", cifrado);
    localStorage.setItem("cifradoAES", cifrado);    
    var pshw= document.getElementById('pshw');
    pshw.innerHTML  = `<div>
                        <button id="create" style="background-color: #AAACB0; font-size: 115%;">Crear archivo cifrado</button><br><br>
                        <a download="cifradoAES.txt" id="downloadlink" style="display: none; color: #4A1942;">Descargar</a>
                    </div> `;
}
//DESCIFRAR CON AES
function descifradoAES(){
    var cadena = document.getElementById("archivoc").value;
    var clave =  document.getElementById("clave").value
    var descifrado = CryptoJS.AES.decrypt(cadena, clave);
    var deshow=descifrado.toString(CryptoJS.enc.Utf8);
    document.getElementById("cdes").innerHTML = deshow;
    localStorage.setItem("descifradoAES", deshow);
    pshw.innerHTML  = `<div>
                    <button id="create" style="background-color: #AAACB0; font-size: 115%;">Crear archivo descifrado</button><br><br>
                    <a download="descifradoAES.txt" id="downloadlink" style="display: none; color: #4A1942;">Descargar</a>
                    </div>`;
}
//VALIDAR CAMPOS PARA CIFRAR
function validarCamposC(){
    var vcla1="";
    var vcla1=document.getElementById("clave").value;
    var varch=document.getElementById("archivoc").value;
    var tipocifrado= document.getElementById('tcifrado').value;
    if(varch.length<5){
        console.log("Archivo invalido");
        alert ("Ingresa un archivo para poder llevar acabo una acción");    
    }else if(varch.length>5){
        if (vcla1.length==8 || vcla1.length==16 || vcla1.length==32){               
            if(tipocifrado=='AES'){
                console.log('Se va a cifrar con AES');
                cifradoAES();
                crearArchC();
            }else if (tipocifrado=='DES'){
            console.log('Se va a cifrar con DES');
                cifradoDES();
                crearArchC();
            }                                                 
        }else{
            console.log("Clave invalida");
            alert ("Longitud de clave no válida. Recuerda que la longitud de la clave debe ser de 8, 16 o 32 caracteres");
        }
    }    
}
//VALIDAR CAMPOS PARA DESCIFRAR
function validarCamposD(){
    var vcla1="";    
    var vcla1=document.getElementById("clave").value;
    var varch=document.getElementById("archivoc").value;
    var tipocifrado= document.getElementById('tcifrado').value;
    if(varch.length<5){
        console.log("Archivo invalido");
        swal ( "Error" ,  "Ingresa un archivo para poder llevar acabo una acción");    
    }else if(varch.length>5){
        if (vcla1.length==8 || vcla1.length==16 || vcla1.length==32){            
            if(tipocifrado=='AES'){
                console.log('Se va a descifrar con AES');
                descifradoAES();
                crearArchD ();
            }else if (tipocifrado=='DES'){
                descifradoDES();
                crearArchD ();
            }                                    
        }else{
            console.log("Clave invalida");
            alert("Longitud de clave no válida. Recuerda que la longitud de la clave debe ser de 8, 16 o 32 caracteres" );
        }
    }
}
//CREAR ARCHIVO CIFRADO
function crearArchC () {
    var textFile = null,
    makeTextFile = function (text) {
    var data = new Blob([text], {type: 'text/plain'});
    if (textFile !== null) {
        window.URL.revokeObjectURL(textFile);
    }
    textFile = window.URL.createObjectURL(data);
    return textFile;
    };
    var create = document.getElementById('create'),
    textbox = document.getElementById('cci');
    create.addEventListener('click', function () {
    var link = document.getElementById('downloadlink');
    link.href = makeTextFile(textbox.value);
    link.style.display = 'block';             
    },false);
    
}
//CREAR ARCHIVO DESCIFRADO
function crearArchD () {
    var textFile = null,
    makeTextFile = function (text) {
    var data = new Blob([text], {type: 'text/plain'});
    if (textFile !== null) {
        window.URL.revokeObjectURL(textFile);
    }
    textFile = window.URL.createObjectURL(data);
    return textFile;
    };
    var create = document.getElementById('create'),
    textbox = document.getElementById('cdes');
    create.addEventListener('click', function () {
    var link = document.getElementById('downloadlink');
    link.href = makeTextFile(textbox.value);
    link.style.display = 'block';            
    }, false);
}
