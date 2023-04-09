'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {
    clearDescricao()
    clearFields()
    document.getElementById('modal').classList.remove('active')
}

const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = "")
    document.getElementById('nome').dataset.index = 'new'
    document.querySelector(".modal-header>h2").textContent = 'Novo Produto'
}

const clearDescricao = () => {
    const descricao = document.querySelectorAll('.modal-descricao')
    descricao.forEach(descricao => descricao.value = "")
}

const tempProduto = {
    nome: "Ração gato  10,1kg",
    peso: "10,1 KG",
    descricao: "Ração para gatos comer",
    cupom: "GDFS54",
    preco: 159.00
}

const getLocalStorage = () => JSON.parse(localStorage.getItem('db_produto')) ?? []
const setLocalStorage = (dbProduto) => localStorage.setItem("db_produto", JSON.stringify(dbProduto))

// CRUD - create read update delete

const deleteProduto = (index) => {
    const dbProduto = readProduto()
    dbProduto.splice(index, 1)
    setLocalStorage(dbProduto)
}

const readProduto = () => getLocalStorage()

const updateProduto = (index, produto) => {
    const dbProduto = readProduto()
    dbProduto[index] = produto
    setLocalStorage(dbProduto)
}

const createProduto = (produto) => {
    const dbProduto = getLocalStorage()
    dbProduto.push(produto)
    setLocalStorage(dbProduto)
}

const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}

//Interação com o layout
const salvarProduto = () => {
    if (isValidFields()) {
        const produto = {
            nome: document.getElementById('nome').value,
            peso: document.getElementById('peso').value,
            preco: document.getElementById('preco').value,
            cupom: document.getElementById('cupom').value,
            descricao: document.getElementById('descricao').value,
        }
        createProduto(produto)
        updateListaProduto()
        closeModal()
    }
}

const createCard = (produto) => {
    const newCard = document.createElement('div')
    newCard.classList.add('card')
    newCard.innerHTML = `
    <img src="./img/racao_gatos.png" class="card-img-top" alt="imagem de um produto da empresa">
    <div class="card-body">
        <div class="card-top">
            <h5 class="card-title">${produto.nome}</h5>
            <p class="card-text">R$ ${produto.preco}</p>
        </div>
        <div class="card-bottom">
            <button type="button" class="btn-editar">Editar</button>
            <button type="button" class="btn-excluir">Excluir</button>
        </div>
    </div>
    `
    document.querySelector('.container__produtos').appendChild(newCard)
}

const clearLista = () => {
    const cards = document.querySelectorAll('.container__produtos .card')
    cards.forEach(card => card.parentNode.removeChild(card))
}   

const updateListaProduto = () => {
    const dbProduto = readProduto()
    clearLista()
    dbProduto.forEach(createCard)
}

updateListaProduto()

//Eventos

document.getElementById('adicionar__produto')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.getElementById('cancelar')
    .addEventListener('click', closeModal)

document.getElementById('salvar')
    .addEventListener('click', salvarProduto)
