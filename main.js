const settings = {
    rows: 3,
    columns: 3,
};

function calculate()
{
    let matrix = [...Array(settings.rows)];

    matrix.forEach(function (el, key) {
        matrix[key] = [...Array(settings.columns)];
    });

    matrix.forEach(function (row, rowKey) {
        row.forEach(function (element, columnKey) {
            matrix[rowKey][columnKey] = document.querySelector(`#a${rowKey+1}${columnKey+1}`).value;
        })
    })

    try {
        let resultMatrix = runSimpleIteration(matrix);
    } catch (e) {
        alert(`Возникла ошибка при расчётах: ${e}`);
    }

    printResult(matrix);
}

function runSimpleIteration(matrix)
{
    let calcMatrix = matrix;

    calcMatrix = findSupremeDiagonal(calcMatrix);

        

    return calcMatrix;
}

function isSupremeDiagonal(matrix)
{

}

function findSupremeDiagonal(matrix)
{
    if (isSupremeDiagonal(matrix)) {
        return matrix;
    }
}

function printResult(matrix)
{
    console.log(matrix);
    document.querySelectorAll('.grid-container-result').forEach(function(item) {
        item.classList.add('grid-container-result-done');
    });

    matrix.forEach(function (row, rowKey) {
        row.forEach(function (element, columnKey) {
            console.log(`#ra${rowKey}${columnKey}`)
            document.querySelector(`#ra${rowKey+1}${columnKey+1}`).value = matrix[rowKey][columnKey];
        })
    })
}