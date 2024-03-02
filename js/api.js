const loadAi = async (seeMore) => {
    const res = await fetch('https://openapi.programming-hero.com/api/ai/tools');
    const data = await res.json();
    // console.log(data.data);
    const ai = data.data.tools;
    console.log(ai);
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
        ai = ai;
    }
    else{
        ai = ai.slice(0,6);
        seeMoreBtn.classList.add('hidden');
    }


    ai.forEach(oneAi => {
        // console.log(oneAi);
        // this is where to append
        const displayAi = document.getElementById('ai-container');
        displayAi.innerText = '';
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
        }</span></p></div>
        <div class="h-[50px] w-[50px] rounded-full bg-orange-100 flex justify-center items-center"><i class="fa-solid fa-arrow-right"></i></div>
        </div>
        <div class="my-2 text-center">
        <button id="seeDetails"onclick="my_modal_5.showModal(); singleAiData('${oneAi.id})" class="btn btn-error">See Details</button>
        </div>
        </div>
        `;
        displayAi.appendChild(aiCard);
    })
}

const seeMoreBtn = () => {
    // console.log('btn clicked')
    loadAi(true);
};

loadAi();

const singleAiData = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/01`)
    const data = await res.json();
    const aiData = data.data;
    console.log(aiData);

    // console.log(aiData.pricing[0].price);
    const singleAiDetails = document.getElementById('singleAiDetails');
    singleAiDetails.innerHTML = `
  <section class="flex gap-1 p-10">
  <div><img src="${oneAi.image_link[0]}" alt=""></div>
  <div class="container border-white-200">
  <p>${aiData.description}</p>
  <div class="flex">
  <p class="bg-gray-100 p-5 mx-1 rounded-lg gap-1 my-5 text-green-700 font-black">${aiData.pricing[0]?.price}</p>
  <p class="bg-gray-100 p-5 mx-1 rounded-lg gap-1 my-5 text-orange-500 font-black">${aiData.pricing[1].price}</p>
  <p class="bg-gray-100 p-5 mx-1 rounded-lg gap-1 text-red-600 font-black">${aiData.pricing[2].price}</p>
  </div>
  <section class="flex">
  <div class="container rounded bg-red-100 border-red-200 mx-2 p-5">
  <h3>Features</h3>
  <ul class="feature-list p-4 list-disc">
  <li>${aiData.features[1]?.feature_name}</li>
  <li>${aiData.features[2]?.feature_name}</li>
  <li>${aiData.features[3]?.feature_name}</li>
  </ul>
  </div>
  <div class="container shadow-xl border-gray-200 p-5">
  <h3>Integrations</h3>
  <ul class="feature-list p-4 list-disc">
  <li>${aiData.integrations[0]}</li>
  <li>${aiData.integrations[1]}</li>
  <li>${aiData.integrations[2]}</li>
  </ul>
  </div>
  </section>
  <p>${aiData.input_output_examples[0]?.input}</p>
  <p>${aiData.input_output_examples[0]?.output}</p>
  </section>
    `
};

singleAiData()