'use strict';

const table = document.createElement('table');
const rows = [0, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 0];
const cols = [0, 1, 2, 3, 4, 5, 6, 7, 8, 0];

function chessDesk(rows, cols) {
    for (let row = 0; row < rows.length; row++) {
        const tr = document.createElement('tr');
        table.appendChild(tr);
        for (let col = 0; col < cols.length; col++) {
            const td = document.createElement('td')
            tr.appendChild(td)
            if (row % 2 == 0) {
                if (col % 2 == 0) {
                    td.style.backgroundColor = 'black'
                }
            }
            else if (row % 2 !== 0){
                if (col % 2 !== 0) {
                    td.style.backgroundColor = 'black'
                }
            }
            if (rows[row] === 0 && cols[col] !== 0) {
                td.innerHTML = cols[col];
                td.style.backgroundColor ='white'
            } else if (cols[col] === 0 && rows[row] !== 0) {
                td.innerHTML = rows[row];
                td.style.backgroundColor ='white'
            }
            if (rows[row] === 0 && cols[col] === 0){
                td.style.backgroundColor ='white'}
        }
    }
    document.querySelector('div').append(table);
}

chessDesk(rows, cols);