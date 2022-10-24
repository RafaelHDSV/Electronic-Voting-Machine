let stages = [{
        title: 'Vereador',
        numberoffice: 5,
        officeData: [{
                numberOfficeData: '38111',
                name: 'Fulano de Tal',
                group: 'ABC',
                photos: [{
                    url: '38111.jpg',
                    label: 'Vereador'
                }]
            },

            {
                numberOfficeData: '77222',
                name: 'Beltrano da Silva',
                group: 'DEFG',
                photos: [{
                    url: '77222.jpg',
                    label: 'Vereador'
                }]
            },
        ]
    },

    {
        title: 'Prefeito',
        numberoffice: 2,
        officeData: [{
                numberOfficeData: '99',
                name: 'Ciclano',
                group: 'ABC',
                vice: 'Cic',
                photos: [{
                        url: '99.jpg',
                        label: 'Prefeito'
                    },
                    {
                        url: '99_2.jpg',
                        label: 'Vice-Prefeito',
                        small: true
                    }
                ]
            },

            {
                numberOfficeData: '84',
                name: 'Zulano',
                group: 'QWERTY',
                vice: 'Zul',
                photos: [{
                        url: '84.jpg',
                        label: 'Prefeito'
                    },
                    {
                        url: '84_2.jpg',
                        label: 'Vice-Prefeito',
                        small: true
                    }
                ]
            },
        ]
    }
];

let headerInformations = document.querySelector('.informations header span')
let office = document.querySelector('.informations .office span')
let description = document.querySelector('.informations .informations_office')
let instructions = document.querySelector('.instructions')
let images = document.querySelector('.images')
let numbers = document.querySelector('.informations .numbers')

let stageCurrent = 0
let numbersInserted = ''
let whiteInserted = false
let insertedVote = []

function startStage() {
    let stage = stages[stageCurrent]
    let numberHTMl = ''

    numbersInserted = ''
    whiteInserted = false

    for (let index = 0; index < stage.numberoffice; index++) {
        if (index === 0) {
            numberHTMl += '<span class="flashes"></span>'
        } else {
            numberHTMl += '<span></span>'
        }
    }

    headerInformations.style.display = 'none'
    office.innerHTML = stage.title
    description.innerHTML = ''
    instructions.style.display = 'none'
    images.innerHTML = ''
    numbers.innerHTML = numberHTMl
}

function uptadeInterface() {
    let stage = stages[stageCurrent]
    let officeInserted = stage.officeData.filter((item) => {
        if (item.numberOfficeData === numbersInserted) {
            return true
        } else {
            return false
        }
    })

    if (officeInserted.length > 0) {
        officeInserted = officeInserted[0]
        headerInformations.style.display = 'block'
        instructions.style.display = 'block'
        description.innerHTML = `Nome: ${officeInserted.name}<br>Partido: ${officeInserted.group}`

        let imagesHTML = ''

        for (let i in officeInserted.photos) {
            if (officeInserted.photos[i].small) {
                imagesHTML +=
                    `<div class="images_secondary"><img class="small" src="images/${officeInserted.photos[i].url}" alt="84.jpg"><p>${officeInserted.photos[i].label}</p></div>`
            } else {
                imagesHTML +=
                    `<div class="images_main"><img src="images/${officeInserted.photos[i].url}" alt="84.jpg"><p>${officeInserted.photos[i].label}</p></div>`
            }
        }

        images.innerHTML = imagesHTML

    } else {
        headerInformations.style.display = 'block'
        instructions.style.display = 'block'
        description.innerHTML = '<div class = "description_large flashes">VOTO NULO</div>'
    }
}

function insert(number) {
    let numberInsert = document.querySelector('.flashes')

    if (numberInsert != null) {
        numberInsert.innerHTML = number
        numbersInserted = `${numbersInserted}${number}`

        numberInsert.classList.remove('flashes')

        if (numberInsert.nextElementSibling !== null) {
            numberInsert.nextElementSibling.classList.add('flashes')
        } else {
            uptadeInterface()
        }
    }

    (new Audio('/IMG/Urna Eletronica/audio/audio1.mp3')).play()
}

function white() {
    (new Audio('/IMG/Urna Eletronica/audio/audio1.mp3')).play()

    numbersInserted = ''
    whiteInserted = true
    headerInformations.style.display = 'block'
    instructions.style.display = 'block'
    numbers.innerHTML = ''
    description.innerHTML = '<div class = "description_large flashes">VOTO EM BRANCO</div>'
    images.innerHTML = ''
}

function correct() {
    (new Audio('/IMG/Urna Eletronica/audio/audio2.mp3')).play()
    startStage()
}

function confirmVote() {
    let stage = stages[stageCurrent]
    let confirmedVote = false

    if (whiteInserted === true) {
        confirmedVote = true

        insertedVote.push({
            stage: stages[stageCurrent].title,
            voto: 'branco'
        })
    } else if (numbersInserted.length === stage.numberoffice) {
        confirmedVote = true

        insertedVote.push({
            stage: stages[stageCurrent].title,
            voto: numbersInserted
        })
    }

    if (confirmedVote) {
        stageCurrent++

        if (stages[stageCurrent] !== undefined) {
            startStage()
        } else {
            document.querySelector('.screen').innerHTML =
                '<div class = "description_extreme_large flashes">FIM</div>'

            console.log(insertedVote);
        }

        (new Audio('/IMG/Urna Eletronica/audio/audio3.mp3')).play()
    }
}

startStage()
