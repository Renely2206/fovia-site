
const menu=document.querySelector('#menu'),nav=document.querySelector('#navigation');
if(menu){menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',open)})}
if(nav){nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu&&menu.setAttribute('aria-expanded','false')}))}
const year=document.querySelector('#year'); if(year) year.textContent=new Date().getFullYear();
function contact(e){
 e.preventDefault();
 const n=document.querySelector('#name').value.trim(),m=document.querySelector('#message').value.trim(),em=document.querySelector('#email').value.trim();
 const status=document.querySelector('#status'); if(status) status.textContent="Ouverture de votre messagerie…";
 location.href='mailto:Alfred.association@fovia.fr?subject='+encodeURIComponent('Contact FOVIA — '+n)+'&body='+encodeURIComponent('Nom : '+n+'\nE-mail : '+em+'\n\n'+m);
 return false;
}
