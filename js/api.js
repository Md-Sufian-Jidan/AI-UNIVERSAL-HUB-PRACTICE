// alert('hello ai hub');
const loadAi = async (seeMore) => {
    const res = await fetch('https://openapi.programming-hero.com/api/ai/tools');
    const data = await res.json();
    // console.log(data.data);
    const ai = data.data.tools;
    // console.log(ai);
    displayAi(ai,seeMore)
}

const displayAi = (ai,seeMore) => {
    // console.log(ai.length);
    const seeMoreBtn = document.getElementById('seeMoreBtn');
    //showing the first 6 ai 
    if(ai.length > 6){
        seeMoreBtn.classList.remove('hidden');
        ai = ai.slice(0,6);
    }
    else{
        seeMoreBtn.classList.add('hidden');
    }
    // showing full data
    if(!seeMore){
        ai = ai.slice(0,6);
    }
    else{
        ai = ai;
        seeMoreBtn.classList.add('hidden');
    }


    ai.forEach(oneAi => {
        // this is where to append
        const displayAi = document.getElementById('ai-container');

        const aiCard = document.createElement('div');
        aiCard.classList = `card bg-blue-100 shadow-xl`;
        aiCard.innerHTML = `
        <figure><img src="${oneAi.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class=" text-3xl">Features</h2>
        <ul class="feature-list p-4 list-decimal">
        <li>${oneAi.features[0]}</li>
        <li>${oneAi.features[1]}</li>
        <li>${oneAi.features[2]}</li>
        </ul>
        <hr class="mx-10 my-5">
        <div class="flex justify-between items-center">
        <div>
        <h3 class="card-title my-3">${oneAi.name}</h3>
        <p><i class="fa-solid fa-calendar-days"></i>   <span>${oneAi.published_in
        }</span></p>
        </div>
        <div class="h-[50px] w-[50px] rounded-full bg-orange-100 flex justify-center items-center"><i class="fa-solid fa-arrow-right"></i>
        </div></div>
        </div>
        `;
        displayAi.appendChild(aiCard);
    })
}

const seeMoreBtn = () => {
    // console.log('btn clicked')
    loadAi(true);
}


loadAi();