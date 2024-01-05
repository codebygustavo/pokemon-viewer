interface All {
    count: number;
    next: null;
    previous: null;
    results: {
        name: string;
        url: string;
    }[];
}

interface ResponseForAll {
    response?: {
        count: number;
        next: null;
        previous: null;
        results: { name: string; url: string; }[];
    };
    data?: any;
    error?: string;
}

interface ResponseForOne {
    id: string;
    height: number;
    name: string;
    types: any;
    weight: number;
}

const inputButton: HTMLElement | null = document.getElementById("search-button");

if (inputButton && inputButton instanceof HTMLInputElement) {

    const inputSearch: HTMLElement | null = document.getElementById("search-input");

    if (inputSearch && inputSearch instanceof HTMLInputElement) {

        inputButton.addEventListener("click", () => {

            const { value: requestValue } = inputSearch

            if (requestValue === "") {
                messageReturn("O input não pode estar vazio!!", "error-message")
                inputSearch.focus();
            } else {
                (async () => {
                    const response = await fetchApi(`https://pokeapi.co/api/v2/pokemon/${requestValue.toLocaleLowerCase()}`);

                    if (response.error) {
                        messageReturn(response.error, "error-message")
                    } else {
                        messageReturn("Sucesso!", "sucess-message")
                        console.log("Resposta:", response.response);
                        console.log("Dados:", response.data);

                        const data: any = response.response
                        processApiResponseForAOne(data)
                    }

                })();
            }

        })

    }

}

const seeAllButton: HTMLElement | null = document.getElementById("search-all");

if (seeAllButton && seeAllButton instanceof HTMLInputElement) {

    seeAllButton.addEventListener("click", () => {

        (async () => {
            const response = await fetchApi("https://pokeapi.co/api/v2/pokemon?limit=255");

            if (response.error) {
                messageReturn(response.error, "error-message")
            } else {
                messageReturn("Sucesso!", "sucess-message")
                console.log("Resposta:", response.response);
                console.log("Dados:", response.data);

                const data: any = response
                processApiResponseForAll(data)

            }

        })();

    })

}

async function returnPokemon(requestValue: string | number) {

    let data: any;

    if (typeof requestValue == "string") {
        data = await fetchApi(`https://pokeapi.co/api/v2/pokemon/${requestValue.toLocaleLowerCase()}`);
    }

    if (typeof requestValue == "number") {
        data = await fetchApi(`https://pokeapi.co/api/v2/pokemon/${requestValue}`);
    }

    data = data?.response

    if (data) {
        processApiResponseForAOne(data)
    }

}

function processApiResponseForAOne(response: ResponseForOne) {

    const returnPoke: HTMLElement | null = document.getElementById("return-poke");

    if (returnPoke && returnPoke instanceof HTMLDivElement) {

        if (response) {

            const returnPokes: HTMLElement | null = document.getElementById("return-pokes");

            if (returnPokes && returnPokes instanceof HTMLDivElement) {
                returnPokes.innerHTML = ""
            }

            let types = []

            for (let i: number = 0; i < response.types.length; i++) [
                types.push(response.types[i].type.name)
            ]

            const typesHTML = types.map((type: string) => `<div class="type ${type}">${type}</div>`).join("")

            returnPoke.innerHTML = `
                
            <div class="card">

                <div>
                    ${typesHTML}
                </div>

                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${response.id}.png"></img>

                <div>
                    <p>${response.name}</p>
                    <span>#${response.id}</span>
                </div>
                <div>
                    <p>${response.height} cm</p>
                    <p>${response.weight} Kg</p>
                </div>

            </div>

        `
        }

    }

}

function processApiResponseForAll(response: ResponseForAll) {

    const returnPokes: HTMLElement | null = document.getElementById("return-pokes");

    if (returnPokes && returnPokes instanceof HTMLDivElement) {

        if (response.response) {
            response.response.results.forEach((pokemon, i) => {

                const returnPoke: HTMLElement | null = document.getElementById("return-poke");

                if (returnPoke && returnPoke instanceof HTMLDivElement) {
                    returnPoke.innerHTML = ""
                }

                returnPokes.innerHTML += `
                
                    <div class="card">

                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i + 1}.png"></img>

                        <input 
                        type="button" 
                        value="Ver ${pokemon.name}" 
                        class="details-button"
                        onClick="returnPokemon('${pokemon.name}')"
                        >

                    </div>

                `
            });

        }

    }

}

async function fetchApi(url: string): Promise<{ response?: All; data?: any; error?: string }> {

    try {

        messageReturn("Buscando <span class='loader'></span>", "await-message");

        const response: any = await fetch(url);

        if (response.status === 404) {
            throw new Error("A resposta não foi encontrada: 404")
        }

        const data = await response.json();

        return { response: data }

    } catch (error: any) {
        return { error: error.message };
    }

}

function messageReturn(message: string, type: "await-message" | "error-message" | "sucess-message") {

    const messageReturn: HTMLElement | null = document.getElementById("message-return");

    if (messageReturn && messageReturn instanceof HTMLDivElement) {

        messageReturn.innerHTML = `
            <div class="${type} message-control"><p>${message}</p></div>
        `;
        const messageDiv: HTMLElement | null = document.querySelector(".message-control");

        if (messageDiv && messageDiv instanceof HTMLDivElement) {
            setTimeout(() => {
                messageDiv.remove();
            }, 6000);
        }

    }

}
