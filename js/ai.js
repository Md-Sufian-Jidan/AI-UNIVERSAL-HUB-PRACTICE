// alert('hello ai hub');
const loadAi = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/ai/tools');
    const data = await res.json();
    // console.log(data.data);
    const ai = data.data.tools;
    console.log(ai);
    displayAi(ai)
}

const displayAi = (ai) => {
    ai.forEach(oneAi => {
        const aiCard = document.createElement('div');
        aiCard.classList = `card bg-base-100 shadow-xl`;

        const displayAi = document.getElementById('ai-container');
        aiCard.innerHTML = `
        <figure><img src="${oneAi.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${oneAi.name}</h2>
          <h2 class=" text-3xl">Features</h2>
        <ol>
          <li>${oneAi.features[0]}<li/>
          <li>${oneAi.features[1]}<li/>
          <li>${oneAi.features[2]}<li/>
        </ol>
        </div>
        `;

        displayAi.appendChild(aiCard);
    })
}

loadAi();