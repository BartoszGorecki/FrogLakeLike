    const jumpBtn = document.getElementById('jump')
    const reproBtn = document.getElementById('reproduce')
    const board = [...document.querySelectorAll('td label')]

    function frogLake() {
        this.heightArr = ['short', 'tall']
        this.sizeArr = ['fat', 'slim']
        this.genderArr = ['male', 'female']
        let self = this
        // helpers
        this.randomArr = function randomArr(arr) {
            return arr[Math.floor(Math.random() * arr.length)]
        }
        this.index = function index(x, y) {
            return x + (y * 10);
        }
        this.uncheckInputs = function uncheckInputs(c) {
            Array.from(c).forEach( check => {
                check.checked = false
            })
        }
        // constructor
        function Frog() {
            this.x = 0
            this.y = 0
            this.gender = self.randomArr(self.genderArr)
            this.height = self.randomArr(self.heightArr)
            this.size = self.randomArr(self.sizeArr)
        }
        // initialize two frogs - parents
        this.frogs = []
        this.frogs.push(new Frog())
        this.frogs.push(new Frog())
        this.frogs[0].gender = 'male'
        this.frogs[1].gender = 'female'
        this.frogs[1].x = 1
        board[this.index(this.frogs[0].x, this.frogs[0].y)].classList.add('frog', 'male')
        board[this.index(this.frogs[1].x, this.frogs[1].y)].classList.add('frog', 'female')

        jumpBtn.addEventListener('click', function () {
            const [indexmale, inFrogsMale, ,indexfemale, inFrogsFemale,] = self.showChecked()
            const checkers = document.querySelectorAll('input:checked')
            if (checkers.length === 2) {
                const allMoves = [indexmale - 1, indexmale - 2, indexmale - 3,
                                    indexmale + 1, indexmale + 2, indexmale + 3,
                                    indexmale - 10, indexmale - 20, indexmale - 30,
                                    indexmale + 10, indexmale + 20, indexmale + 30,
                                    indexmale - 11, indexmale - 22, indexmale - 33,
                                    indexmale + 11, indexmale + 22, indexmale + 33,
                                    indexmale - 9, indexmale - 18, indexmale - 27,
                                    indexmale + 9, indexmale + 18, indexmale + 27]
                const allMoves2 = [indexfemale - 1, indexfemale - 2,
                                    indexfemale + 1, indexfemale + 2,
                                    indexfemale - 10, indexfemale - 20,
                                    indexfemale + 10, indexfemale + 20,
                                    indexfemale - 11, indexfemale - 22,
                                    indexfemale + 11, indexfemale + 22,
                                    indexfemale - 9, indexfemale - 18,
                                    indexfemale + 9, indexfemale + 18]
                if (checkers[0].parentElement.classList.contains('male') &&
                    !checkers[1].parentElement.classList.contains('frog')) {
                    const indexNew = board.indexOf(checkers[1].parentElement)
                    if (allMoves.indexOf(indexNew) > -1) {
                        checkers[1].parentElement.classList.add('frog', 'male')
                        checkers[0].parentElement.classList.remove('frog', 'male')
                        self.frogs[inFrogsMale].x = indexNew % 10
                        self.frogs[inFrogsMale].y = Math.floor(indexNew / 10)
                    } else {
                        alert('That\'s too complicated for me, sorry!')
                    }
                } else if (checkers[1].parentElement.classList.contains('male') &&
                    !checkers[0].parentElement.classList.contains('frog')) {
                    const indexNew = board.indexOf(checkers[0].parentElement)
                    if (allMoves.indexOf(indexNew) > -1) {
                        checkers[0].parentElement.classList.add('frog', 'male')
                        checkers[1].parentElement.classList.remove('frog', 'male')
                        self.frogs[inFrogsMale].x = indexNew % 10
                        self.frogs[inFrogsMale].y = Math.floor(indexNew / 10)
                    } else {
                        alert('That\'s too complicated for me, sorry!')
                    }
                } else if (checkers[0].parentElement.classList.contains('female') &&
                    !checkers[1].parentElement.classList.contains('frog')) {
                    const indexNew2 = board.indexOf(checkers[1].parentElement)
                    if (allMoves2.indexOf(indexNew2) > -1) {
                        checkers[1].parentElement.classList.add('frog', 'female')
                        checkers[0].parentElement.classList.remove('frog', 'female')
                        self.frogs[inFrogsFemale].x = indexNew2 % 10
                        self.frogs[inFrogsFemale].y = Math.floor(indexNew2 / 10)
                    } else {
                        alert('That\'s too complicated for me, sorry!')
                    }
                } else if (checkers[1].parentElement.classList.contains('female') &&
                    !checkers[0].parentElement.classList.contains('frog')) {
                    const indexNew2 = board.indexOf(checkers[0].parentElement)
                    if (allMoves2.indexOf(indexNew2) > -1) {
                        checkers[0].parentElement.classList.add('frog', 'female')
                        checkers[1].parentElement.removeAttribute('class')
                        self.frogs[inFrogsFemale].x = indexNew2 % 10
                        self.frogs[inFrogsFemale].y = Math.floor(indexNew2 / 10)
                    } else {
                        alert('That\'s too complicated for me, sorry!')
                    }
                }
            } else {
                alert('Please select two checkboxes to make your jump action')
            }
            self.uncheckInputs(checkers)
        })
        this.showChecked = function showChecked() {
            const thatM = [...document.querySelectorAll('#lake .male')].filter(item => item.querySelector('input:checked'))[0]
            const indexmale = board.indexOf(thatM)
            const maleObj = self.frogs.filter(frog => frog.x == indexmale % 10 && frog.y == Math.floor(indexmale / 10))[0]
            const inFrogsMale = self.frogs.indexOf(maleObj)
            const thatF = [...document.querySelectorAll('#lake .female')].filter(item => item.querySelector('input:checked'))[0]
            const indexfemale = board.indexOf(thatF)
            const femaleObj = self.frogs.filter(frog => frog.x == indexfemale % 10 && frog.y == Math.floor(indexfemale / 10))[0]
            const inFrogsFemale = self.frogs.indexOf(femaleObj)
            return [indexmale, inFrogsMale, maleObj, indexfemale, inFrogsFemale, femaleObj]
        }
        reproBtn.addEventListener('click', function () {
            const [indexmale, , ,indexfemale, ,] = self.showChecked()
            const actualPos3 = indexfemale
            const actualPos4 = indexmale
            const allMoves3 = [actualPos3 - 11, actualPos3 - 10, actualPos3 - 9,
            actualPos3 - 1, actualPos3 + 1,
            actualPos3 + 9, actualPos3 + 10, actualPos3 + 11]
            const checkers = document.querySelectorAll('input:checked')
            if (checkers.length === 2 && allMoves3.indexOf(actualPos4) > -1) {
                if ((checkers[0].parentElement.classList.contains('female') &&
                    checkers[1].parentElement.classList.contains('male')) ||
                    (checkers[0].parentElement.classList.contains('male') &&
                        checkers[1].parentElement.classList.contains('female'))
                ) {
                    self.makeChild()
                } else {
                    alert('Please select one female and one male')
                }
            } else {
                alert('Only two frogs different genders, adjacent can reproduce')
            }
            self.uncheckInputs(checkers)
        })
        this.makeChild = function makeChild() {
            const [, , maleObj, , , femaleObj] = self.showChecked()
            const arrSize = []
            arrSize.push(femaleObj.size)
            if (!arrSize.includes(maleObj.size)) {
                arrSize.push(maleObj.size)
            }
            const arrHeight = []
            arrHeight.push(maleObj.height)
            if (!arrHeight.includes(femaleObj.height)) {
                arrHeight.push(femaleObj.height)
            }
            let motherPos = self.index(self.frogs[1].x, self.frogs[1].y)
            while (board[motherPos].classList.contains('frog') && motherPos < board.length) {
                motherPos++
            }
            board[motherPos].classList.add('frog', self.randomArr(['male', 'female']))
            self.frogs.push(new Frog())
            const newChild = self.frogs[self.frogs.length - 1]
            board[motherPos].classList.contains('male') ?
                newChild.gender = 'male' :
                newChild.gender = 'female'
            newChild.height = self.randomArr(arrHeight)
            newChild.size = self.randomArr(arrSize)
            newChild.x = motherPos % 10
            newChild.y = Math.floor(motherPos / 10)
        }
    }
frogLake()
