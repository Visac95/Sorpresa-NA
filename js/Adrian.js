/* ESTRELLAS MÁS GRANDES */
(function(){
  const container = document.getElementById('stars');
  const COUNT = 65;

  for(let i=0;i<COUNT;i++){
    const s = document.createElement('div');
    s.className='star';

    const size = 1.2 + Math.random()*2.4;
    s.style.width = size+"px";
    s.style.height = size+"px";

    s.style.left = Math.random()*100+"vw";
    s.style.top = Math.random()*100+"vh";

    s.style.animationDuration = (2 + Math.random()*3)+"s";
    s.style.animationDelay = (Math.random()*4)+"s";

    container.appendChild(s);
  }
})();

