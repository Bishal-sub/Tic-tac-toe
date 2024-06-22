

document.addEventListener('DOMContentLoaded', function () {
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.querySelector('.reset');
    let currentPlayer = 'X';
    let gameActive = true;

    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]            
    ];

    function cellClick(cell, cellIndex) {
        if (!gameActive || cell.textContent !== '') return;
        cell.textContent = currentPlayer;

        if (checkWin(currentPlayer)) {
            announceWinner(currentPlayer);
            gameActive = false;
            setTimeout(resetGame, 1000);
        } else if (checkDraw()) {
            announceDraw();
            gameActive = false;
            setTimeout(resetGame, 1000); 
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }

    function checkWin(player) {
        return winConditions.some(condition => {
            return condition.every(index => {
                return cells[index].textContent === player;
            });
        });
    }

    function checkDraw() {
        return [...cells].every(cell => cell.textContent !== '');
    }

    function announceWinner(player) {
        const winningCombination = winConditions.find(condition => {
            return condition.every(index => cells[index].textContent === player);
        });
        if (winningCombination) {
            winningCombination.forEach(index => {
                cells[index].classList.add('win');
            });
            alert(`Congratulations! Player ${player} wins!`);
        }
    }

    function announceDraw() {
        alert("It's a draw!");
    }

    function resetGame() {
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('win');
        });
        currentPlayer = 'X';
        gameActive = true;
    }

    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => cellClick(cell, index));
    });

    resetButton.addEventListener('click', resetGame);
});
