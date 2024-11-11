draggableLifeElements = document.getElementsByClassName('draggable-lifetotal')

oldTotals = sessionStorage.getItem('lifeTotals');
if(oldTotals){
    oldTotalsL = JSON.parse(oldTotals)
    for(ind in draggableLifeElements){
        draggableLifeElements[ind].innerText = oldTotalsL[ind]
    }
}

setInterval(() => {
    totals = []
    for(el of draggableLifeElements){
        totals.push(el.innerText)
    }
    sessionStorage.setItem('lifeTotals', JSON.stringify(totals))
    // console.log('saved')
}, 500)

function touchStart(e){
    currentY = null;
    currentCount = 0;
}
touchStart()

function handleLifeDrag(flip = false){
    return e=> {
       newY = e.changedTouches[0].pageY;
       currentCount += (flip ? 1 : -1) * (newY - (currentY || newY));
       currentY = newY;
       while(Math.abs(currentCount) > 20){
           if(currentCount > 0){
               incLife(e.target);
               currentCount -= 20;
           }
           else {
               decLife(e.target);
               currentCount += 20;
           }
       }
    //    console.log(e)
    }
}

for(el of draggableLifeElements){
    el.addEventListener('touchstart', touchStart)
    el.addEventListener('touchmove', handleLifeDrag(el.classList.contains('flip')))
}

function incLife(element){
    element.innerText = element.innerText*1 + 5
}

function decLife(element){
    element.innerText = element.innerText*1 - 5
}

function resetGame(){
    sessionStorage.clear();
    location.reload();
}