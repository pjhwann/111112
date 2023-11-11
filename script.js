let workbookData = null;

// Function to load the Excel file initially
function loadExcelFile() {
    fetch('https://raw.githubusercontent.com/pjhwann/scores/main/grades.csv')
        .then(response => response.text())
        .then(csvData => {
            workbookData = XLSX.read(csvData, {type: 'string'});
        })
        .catch(error => console.error('Error:', error));
}

// Function to find a match when the button is clicked
function findMatch() {
    const inputValue = document.getElementById('input-value').value;
    if (workbookData) {
        const firstSheetName = workbookData.SheetNames[0];
        const worksheet = workbookData.Sheets[firstSheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);
        const matchedData = data.find(row => row['ID'] == inputValue);
        const result = matchedData ? matchedData['SCORE'] : 'No match found';
        document.getElementById('match-result').innerText = result;
    }
}

// Load the Excel file when the page loads
window.onload = loadExcelFile;
