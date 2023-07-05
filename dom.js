//var header= document.querySelector('#main-header');
//header.style.borderBottom= 'solid 4px #ccc';

var secondItem=document.querySelector('.list-group-item:nth-child(2)');
secondItem.style.backgroundColor='green';

var thirdItem=document.querySelector('#items li:nth-child(3)');
thirdItem.style.display='none';

var two= document.querySelectorAll(".list-group-item");
console.log(two);
two[1].style.backgroundColor='green';

var odd=document.querySelectorAll('li:nth-child(odd)');

for(var i=0;i<odd.length;i++){
    odd[i].style.backgroundColor='green';
}