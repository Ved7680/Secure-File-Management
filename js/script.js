const login = document.getElementById("Login");
const home = document.getElementById("home");
const level1 = document.getElementById("level1");
const level2 = document.getElementById("level2");
const encode1 = document.getElementById("encode1");
const decode1 = document.getElementById("decode1");
const encode2 = document.getElementById("encode2");
const decode2 = document.getElementById("decode2");

login.style.display = "none";
decode1.style.display = "none";
level2.style.display = "none";
decode2.style.display = "none";

// Level1

function Level1(){
    level2.style.display='none';
    level1.style.display='flex';
}

// Level2

function Level2(){
    level1.style.display='none';
    level2.style.display='flex';
}

// encode

function Encode1(){
    decode1.style.display='none';
    encode1.style.display='flex';
}

function Encode2(){
    decode2.style.display='none';
    encode2.style.display='flex';
}

// decode 

function Decode1(){
    encode1.style.display='none';
    decode1.style.display='flex';
}

function Decode2(){
    encode2.style.display='none';
    decode2.style.display='flex';
}

// variables 
let x1 = 0;
let x2 = 0;
let x3 = 0;
let x4 = 0;
let key1 = 1;
let key2 = 1;
let char = 'a';
let ascii1 = char.charCodeAt(0);
let ascii2 = char.charCodeAt(0);
let ascii3 = char.charCodeAt(0);
let ascii4 = char.charCodeAt(0);
document.getElementById('x1').innerHTML = x1; 
document.getElementById('x2').innerHTML = x2; 
document.getElementById('x3').innerHTML = x3; 
document.getElementById('x4').innerHTML = x4;
document.getElementById('alpha1').innerHTML = String.fromCharCode(ascii1); 
document.getElementById('alpha2').innerHTML = String.fromCharCode(ascii2); 
document.getElementById('alpha3').innerHTML = String.fromCharCode(ascii3); 
document.getElementById('alpha4').innerHTML = String.fromCharCode(ascii4); 
document.getElementById('key1').innerHTML = key1;
document.getElementById('key2').innerHTML = key2;

// Addition 

function add1(){
    if(x1<25){
        x1++;
        ascii1++;
        document.getElementById('x1').innerHTML = x1; 
        document.getElementById('alpha1').innerHTML = String.fromCharCode(ascii1); 
    }
}
function add2(){
    if(x2<25){
        x2++;
        ascii2++;
        document.getElementById('x2').innerHTML = x2; 
        document.getElementById('alpha2').innerHTML = String.fromCharCode(ascii2); 
    }
}
function add3(){
    if(x3<25){
        x3++;
        ascii3++;
        document.getElementById('x3').innerHTML = x3; 
        document.getElementById('alpha3').innerHTML = String.fromCharCode(ascii3); 
    }
}
function add4(){
    if(x4<25){
        x4++;
        ascii4++;
        document.getElementById('x4').innerHTML = x4; 
        document.getElementById('alpha4').innerHTML = String.fromCharCode(ascii4); 
    }
}
function addkey1(){
    let len = Math.floor(Math.log2(document.getElementById('plaintext3').value));
    if(key1<len){
        key1++;
        document.getElementById('key1').innerHTML = key1;
    }
}
function addkey2(){
    let len = Math.floor(Math.log2(document.getElementById('ciphertext4').value));
    if(key2<len){
        key2++;
        document.getElementById('key2').innerHTML = key2;  
    }
}

// Subtraction 

function sub1(){
    if(x1>0){
        x1--;
        ascii1--;
        document.getElementById('x1').innerHTML = x1; 
        document.getElementById('alpha1').innerHTML = String.fromCharCode(ascii1); 
    }
}
function sub2(){
    if(x2>0){
        x2--;
        ascii2--;
        document.getElementById('x2').innerHTML = x2; 
        document.getElementById('alpha2').innerHTML = String.fromCharCode(ascii2); 
    }
}
function sub3(){
    if(x3>0){
        x3--;
        ascii3--;
        document.getElementById('x3').innerHTML = x3; 
        document.getElementById('alpha3').innerHTML = String.fromCharCode(ascii3); 
    }
}
function sub4(){
    if(x4>0){
        x4--;
        ascii4--;
        document.getElementById('x4').innerHTML = x4; 
        document.getElementById('alpha4').innerHTML = String.fromCharCode(ascii4); 
    }
}
function subkey1(){
    if(key1>1){
        key1--;
        document.getElementById('key1').innerHTML = key1; 
    }
}
function subkey2(){
    if(key2>1){
        key2--;
        document.getElementById('key2').innerHTML = key2; 
    }
}

// level 1 Encode 

function level1Encode(){
    let text1 = document.getElementById('plaintext1').value;
    document.getElementById('ciphertext1').innerHTML = caesar_cipher_encrypt(text1,x1);
}

// level 2 Encode 

function level2Encode(){
    let text3 = document.getElementById('plaintext3').value;
    document.getElementById('ciphertext3').innerHTML = rail_fance_encrypt(caesar_cipher_encrypt(text3,x3), key1);
}

// level 1 Decode 

function level1Decode(){
    let text2 = document.getElementById('ciphertext2').value;
    document.getElementById('plaintext2').innerHTML = caesar_cipher_decrypt(text2,x2);
}

// level 2 Decode 

function level2Decode(){
    let text4 = document.getElementById('ciphertext4').value;
    document.getElementById('plaintext4').innerHTML = caesar_cipher_decrypt(rail_fance_decrypt(text4, key2), x4);
}

// Encryption 

// Caesar Cipher 

function caesar_cipher_encrypt(text, shift){
    let res = ""
    for(let i = 0; i < text.length; i++){
        let char = text.charAt(i);
        if(lowerCase(char)){
            res += String.fromCharCode((char.charCodeAt(0)+shift-97)%26 + 97);
        }
        else if(upperCase(char)){
            res += String.fromCharCode((char.charCodeAt(0)+shift-65)%26 + 65);
        }
        else{
            res += char;
        }
    }
    return res;
  }

// Rail Fence Cipher 

function rail_fance_encrypt(text, key){
    let col = Math.floor((text.length+1)/key);
    let row = key;
    let k = 0;
    let res = "";
    let matrix = new Array(col);
    for(let i = 0; i < col; i ++){
        matrix[i] = new Array(row);
    }
    for(let j = 0; j < col; j ++){
        for(let i = 0; i < row; i ++){
            if(k < text.length){
                matrix[i][j] = text.charAt(k);
                k++;
            }
            else{
                matrix[i][j] = '~';
            }
        }
    }
    for(let i = 0; i < row; i ++){
        for(let j = 0; j < col; j ++){
            if(matrix[i][j] == '~'){
                continue;
            }
            else{
                res += matrix[i][j];
            }
        }      
    }
    return res;
  }

// Decryption

// Caesar Cipher 

function caesar_cipher_decrypt(text, shift){
    let res = ""
    for(let i = 0; i < text.length; i++){
        let char = text.charAt(i);
        if(lowerCase(char)){
            if((char.charCodeAt(0)-97) < shift){
              res += String.fromCharCode((26+(char.charCodeAt(0)-shift-97))%26 + 97);
            }
            else{
              res += String.fromCharCode((char.charCodeAt(0)-shift-97)%26 + 97);   
            }
        }
        else if(upperCase(char)){
            if((char.charCodeAt(0)-65) < shift){
              res += String.fromCharCode((26+(char.charCodeAt(0)-shift-65))%26 + 65);
            }
            else{
              res += String.fromCharCode((char.charCodeAt(0)-shift-65)%26 + 65);
            }
        }
        else{
            res += char;
        }
    }
    return res;
}

// Rail Fence Cipher 

function rail_fance_decrypt(text, key){
    let col = Math.floor((text.length+1)/key);
    let row = key;
    let len = (text.length-1) - ((col-1)*key);
    let k = 0;
    let res = "";
    let matrix = new Array(col);
    for(let i = 0; i <= col; i ++){
        matrix[i] = new Array(row);
    }
    for(let i = 0; i < row; i ++){
      for(let j = 0; j < col; j ++){
        if(k < text.length){
          if(j == col){
            if(len != 0){
              matrix[i][j] = text.charAt(k);
              k++;
              len --;
            }
            else{
              matrix[i][j] = '~';
            }
          }
          else{
            matrix[i][j] = text.charAt(k);
            k++;
          }
        }
      }
    }
    for(let j = 0; j < col; j++){
      for(let i = 0; i < row; i++){
        if(matrix[i][j] == '~'){
          break;
        }
        res += matrix[i][j];
      }
    }
    let lenRes = res.length-9;
    return res.substring(0, lenRes);
}

// Lower Case 

function lowerCase(char){
    if(char.charCodeAt(0)>=97 && char.charCodeAt(0)<=123){
       return true;
    }
    return false;
}

// Upper Case 

function upperCase(char){
    if(char.charCodeAt(0)>=65 && char.charCodeAt(0)<=90){
         return true;
    }
    return false;
 }

const forms = document.querySelector(".forms"),
      pwShowHide = document.querySelectorAll(".eye-icon"),
      links = document.querySelectorAll(".link");

// console.log(forms, pwShowHide, links);
pwShowHide.forEach(eyeIcon => {
    eyeIcon.addEventListener("click", () => {
        let pwFields = eyeIcon.parentElement.parentElement.querySelectorAll(".password");
        
        pwFields.forEach(password => {
            if(password.type === "password"){
                password.type = "text";
                eyeIcon.classList.replace("bx-hide", "bx-show");
                return;
            }
            password.type = "password";
                eyeIcon.classList.replace("bx-show", "bx-hide");
        })
    })
})

links.forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();//preventing form submit
        forms.classList.toggle("show-signup");
    })
})

//Generate the otp
let otp;
const generateOtp = () => {
    otp = "";
    for(let i = 0; i < 6; i++){
        otp += Math.floor(Math.random()*10);
    }
    Email.send({
        Host : " smtp.elasticemail.com",
        Username : "arpit.p@ahduni.edu.in",
        Password : "1FF09E05DA7803D0B1D2704762749C79E25F",
        To : document.getElementById('email').value,
        From : "arpitpatel343464@gmail.com",
        Subject : "OTP verification",
        Body : "Your OTP is "+otp
    }).then(
    message => alert(message)
    );
}
const otpChecker = () => {
    const Otp = document.getElementById('otp').value;
    if(otp === Otp){
        alert("Verification successful!");
    }
    else{
        alert("Wrong OTP");
    }
}
document.getElementById("myBtn").addEventListener("click", myFunction);
    function myFunction() {
        window.location.href="http://127.0.0.1:5500/home%20.html";
    }

function passwordChecker(){
    const pass = document.getElementById('passw').value;
    let pattern = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[0-9])(?=.*[-+_!@#$%^&*.,?]).+$"
      );
    if(pass.length < 8){
        alert("Password must contain atleast 8 characters.");
        return;
    }
    if(pattern.test(pass)){
        alert("Password contain atleat one lowercase letter, uppercase letter, special characters and number.");
        return;
    }
    else{
        message("It is String Password!");
    }
}
function confirmPass(){
    const pass = document.getElementById('passw').value;
    const cPass = document.getElementById('cPassw').value;
    if(pass != cPass){
        alert("password don't match!");
    }
}