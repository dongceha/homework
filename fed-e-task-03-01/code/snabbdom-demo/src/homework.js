import {h, init} from 'snabbdom'
// 使用模块
import style from 'snabbdom/modules/style'
import eventListener from 'snabbdom/modules/eventlisteners'
// 注册模块
let patch = init([
    style,
    eventListener
])
let nextRank = 11
let originalData = [
    {rank: 1, title: 'The Shawshank Redemption', desc: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.', elmHeight: 0},
    {rank: 2, title: 'The Godfather', desc: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.', elmHeight: 0},
    {rank: 3, title: 'The Godfather: Part II', desc: 'The early life and career of Vito Corleone in 1920s New York is portrayed while his son, Michael, expands and tightens his grip on his crime syndicate stretching from Lake Tahoe, Nevada to pre-revolution 1958 Cuba.', elmHeight: 0},
    {rank: 4, title: 'The Dark Knight', desc: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, the caped crusader must come to terms with one of the greatest psychological tests of his ability to fight injustice.', elmHeight: 0},
    {rank: 5, title: 'Pulp Fiction', desc: 'The lives of two mob hit men, a boxer, a gangster\'s wife, and a pair of diner bandits intertwine in four tales of violence and redemption.', elmHeight: 0},
    {rank: 6, title: 'Schindler\'s List', desc: 'In Poland during World War II, Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.', elmHeight: 0},
    {rank: 7, title: '12 Angry Men', desc: 'A dissenting juror in a murder trial slowly manages to convince the others that the case is not as obviously clear as it seemed in court.', elmHeight: 0},
    {rank: 8, title: 'The Good, the Bad and the Ugly', desc: 'A bounty hunting scam joins two men in an uneasy alliance against a third in a race to find a fortune in gold buried in a remote cemetery.', elmHeight: 0},
    {rank: 9, title: 'The Lord of the Rings: The Return of the King', desc: 'Gandalf and Aragorn lead the World of Men against Sauron\'s army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.', elmHeight: 0},
    {rank: 10, title: 'Fight Club', desc: 'An insomniac office worker looking for a way to change his life crosses paths with a devil-may-care soap maker and they form an underground fight club that evolves into something much, much more...', elmHeight: 0},
];

(function(){
    const sortBy = [
        {name: 'Rank', label: 'rank'},
        {name: 'Title', label: 'title'},
        {name: 'Description', label: 'desc'}
    ]
    let title = h('div', {
        id: 'app'
    }, [
        h('h1', 'Top 10 movies'),
        h('div', {}, [
            h('span', 'sortBy'),
            h('ul', {}, 
                sortBy.map(sort => {
                    return h('li', {
                            key: sort.name,
                            on: {
                                click: () => {
                                    handleSort(sort.label)
                                }
                            }
                        }, sort.name)
                    
                })
            ),
            h('button', {
                on: {
                    click: () => {
                        handleAdd()
                    }
                },
            }, 'Add')
        ])
    ])
    patch(document.querySelector('#title'), title)

    setTimeout(() => {
        handleSort(sortBy[0].label)
    })
})()

function drawTable() {
    let oldVnode = document.querySelector('#app')
    return function() {
        for (let i = 0; i < originalData.length; i++) {
            let prev = originalData[i - 1], now = originalData[i]
            now.offsetHeight = prev ? (prev.offsetHeight + prev.elmHeight) : 0
        }
        let vnode = h('table#app', {},  originalData.map(original => {
            return  h('tr.row', {
                    style: {
                        delayed: {transform: `translateY(${original.offsetHeight}px)`},
                        remove: {opacity: '0', transform: `translateY(${original.offsetHeight}px) translateX(200px)`}},
                    hook: {insert: (vnode) => { original.elmHeight = vnode.elm.offsetHeight; }},
                    key: original.rank,
                }, [
                    h('td', original.rank),
                    h('td', original.title),
                    h('td', original.desc),
                    h('td', [
                        h('button', {
                            on: {
                                click: () => {
                                    handleDelete(original)
                                }
                            }
                        }, 'delete')
                    ])
                ])
            })
        )
        patch(oldVnode, vnode)
        oldVnode = vnode
    }
}

const drawSort = drawTable()
drawSort()

function handleSort(sort) {
    originalData = originalData.sort((ori1, ori2) => {
        return ori1[sort] > ori2[sort] ? 1 : -1
    })
    drawSort()
}
function handleDelete(original) {
    const index = originalData.findIndex((or) => original === or)
    originalData.splice(index, 1)
    drawSort()
}
function handleAdd() {
    originalData.unshift(
        {rank: nextRank ++, title: 'The Shawshank Redemption', desc: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.', elmHeight: 0},
    )
    drawSort()
    drawSort()
}