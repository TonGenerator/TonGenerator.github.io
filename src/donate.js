export const DONATION_ADDRESS='UQAytQZrFxKtSxkfYB5N8up9UPpns72gZJffWEXPl1JT_GAY';
export function initDonation(){
 for(const button of document.querySelectorAll('[data-donate]'))button.addEventListener('click',()=>{
  let dialog=document.getElementById('donation-dialog');
  if(!dialog){dialog=document.createElement('dialog');dialog.id='donation-dialog';dialog.className='donation-dialog';dialog.setAttribute('aria-labelledby','donation-title');
   const title=document.createElement('h2');title.id='donation-title';title.textContent='Поддержать проект · TON';
   const note=document.createElement('p');note.textContent='Добровольный донат в сети TON. Сумму выбираешь ты.';
   const address=document.createElement('code');address.textContent=DONATION_ADDRESS;
   const copy=document.createElement('button');copy.type='button';copy.textContent='Скопировать адрес';copy.onclick=async()=>{try{await navigator.clipboard.writeText(DONATION_ADDRESS);copy.textContent='Адрес скопирован ✓';}catch{copy.textContent='Выдели и скопируй адрес выше';}};
   const wallet=document.createElement('a');wallet.href='ton://transfer/'+DONATION_ADDRESS;wallet.textContent='Открыть кошелёк';
   const close=document.createElement('button');close.type='button';close.textContent='Закрыть';close.onclick=()=>dialog.close();
   const actions=document.createElement('div');actions.append(copy,wallet,close);dialog.append(title,note,address,actions);document.body.append(dialog);
  }dialog.showModal();
 });
}
