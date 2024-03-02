const loadAi = async (isShowing) => {
    const res = await fetch('https://openapi.programming-hero.com/api/ai/tools');
    const data = await res.json();
    // console.log(data.data);
    let ai = data.data.tools;

    const seeMoreBtn = document.getElementById('seeMoreBtn');
    //showing the first 6 ai
    if (ai.length > 6 && !isShowing) {
        seeMoreBtn.classList.remove('hidden');
        ai = ai.slice(0, 6);
    }
    else {
        seeMoreBtn.classList.add('hidden');
        ai = ai;
    };

    // 1. where to append
    const aiContainer = document.getElementById('ai-container');
    aiContainer.textContent = '';

    ai.forEach((oneAi) => {
        // console.log(oneAi);

        const div = document.createElement('div');
        div.classList.add('h-1/2');
        div.innerHTML = `
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
        <button onclick="singleAiDetails('${oneAi.id}');seeDetails.showModal()" class="btn btn-error">See Details</button>
        </div>
        </div>
        `;

        //4. there will be append
        aiContainer.appendChild(div);
    });

};


//handle show all
const handleShowAll = () => {
    console.log('clicked');
    loadAi(true);
}

// showing single data details 

const singleAiDetails = async (id) => {
    console.log('i find the id', id)
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`)
    const data = await res.json();
    const mainData = data.data;
    console.log(mainData);
    const modalId = document.getElementById('modal-id');
    modalId.innerText = '';

    const div = document.createElement('div');
    div.innerHTML = `
     <div class="flex gap-2">
     <div class="bg-red-200 border-red-800 p-5 rounded-xl w-[50%]">
     <p class="py-4 font-bold">${mainData.description}</p>

     <div class="flex gap-2">
 <p class="bg-gray-100 p-5 rounded-lg gap-1 my-5 text-green-700 font-black">${mainData.pricing[0]?.price}</p>
 <p class="bg-gray-100 p-5 rounded-lg gap-1 my-5 text-orange-500 font-black">${mainData.pricing[1]?.price}</p>
 <p class="bg-gray-100 p-5 rounded-lg gap-1 text-red-600 font-black">${mainData.pricing[2]?.price}</p>
 </div>
 
   <div class="flex gap-3">
   <div class="container rounded mx-2 p-5">
   <h3>Features</h3>
   <ul class="feature-list p-4 list-disc">
   <li>${mainData.features[1]?.feature_name}</li>
   <li>${mainData.features[2]?.feature_name}</li>
   <li>${mainData.features[3]?.feature_name}</li>
   </ul>
   </div>
   <div class="container rounded p-5">
 <h3>Integrations</h3>
 <ul class="feature-list p-4 list-disc">
 <li>${mainData.integrations[0]}</li>
 <li>${mainData.integrations[1]}</li>
 <li>${mainData.integrations[2]}</li>
 </ul>
 </div>
 </div>
     </div>

     <div class="w-[50%]">
     <img src="${mainData.image_link[1]}">
     <p>${mainData.input_output_examples[0]?.input}</p>
     <p>${mainData.input_output_examples[0]?.output}</p>
     </div>

     </div>
      `;
    modalId.appendChild(div)
}

loadAi();