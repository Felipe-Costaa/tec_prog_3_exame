let linha = null

const start = () => {
    const btn = document.getElementById("saveBtn")
    btn.onclick = saveBtnEvent
}

const saveBtnEvent = () => {
    const testeVazio = verificaCamposVazios()
    if (testeVazio) {
        const status = document.getElementById('pStatus')
        status.textContent = 'Dados obrigatorios!'
    } else {
        const status = document.getElementById('pStatus')
        status.textContent = ''
        const inputKmAtual = document.getElementById("km_atual")
        const inputKmAnterior = document.getElementById("km_anterior")
        const inputLitros = document.getElementById("litros")

        const table = document.getElementById("myTable")
        const tbody = table.tBodies[0]


        if (linha === null) {
            const tr = document.createElement("tr")
            const tdKmAtual = document.createElement("td")
            const tdKmAnterior = document.createElement("td")
            const tdLitros = document.createElement("td")
            const tdKM_L = document.createElement("td")

            const contentTdKmAtual = document.createTextNode(inputKmAtual.value)
            const contentTdKmAnterior = document.createTextNode(inputKmAnterior.value)
            const contentTdLitros = document.createTextNode(inputLitros.value)

            let consumo = (parseInt((inputKmAtual.value) - parseInt(inputKmAnterior.value)) / parseInt(inputLitros.value))

            const contentTdKM_L = document.createTextNode(consumo.toFixed(2))

            tdKmAtual.appendChild(contentTdKmAtual)
            tdKmAnterior.appendChild(contentTdKmAnterior)
            tdLitros.appendChild(contentTdLitros)
            tdKM_L.appendChild(contentTdKM_L)

            tr.appendChild(tdKmAtual)
            tr.appendChild(tdKmAnterior)
            tr.appendChild(tdLitros)
            tr.appendChild(tdKM_L)

            tbody.appendChild(tr)


            salvaLocalStorage(tdKmAnterior.value)

        }
        else {
            const tr = tbody.children[linha - 1]
            tr.children[0].innerHTML = inputKmAtual.value
            tr.children[1].innerHTML = inputKmAnterior.value
            tr.children[2].innerHTML = inputLitros.value
            linha = null


        }
        clearFields(inputKmAtual, inputKmAnterior, inputLitros)

        salvaLocalStorage(tbody.children[0])

    }
}

//Limpa os campos de input
const clearFields = (inputKmAtual, inputKmAnterior, inputLitros) => {
    inputKmAtual.value = null
    inputKmAnterior.value = null
    inputLitros.value = null
}

//Limpa o LocalStorage, converte e salva minha table atualizada no LocalStorage
const salvaLocalStorage = table => {
    localStorage.clear()
    localStorage.setItem(0, JSON.stringify(table))
}


//Verifica se foram inseridos todos os dados
const verificaCamposVazios = () => {
    const inputkm_atual = document.getElementById('km_atual')
    const inputkm_anterior = document.getElementById('km_anterior')
    const inputlitros = document.getElementById('litros')

    if (inputkm_anterior.value == '' || inputkm_atual.value == "" || inputlitros.value == '') {
        return true
    }
}


start()