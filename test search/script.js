document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const pdfList = document.getElementById('pdfList');

    // Sample list of PDFs (replace with your actual data)
    const pdfs = [
        'document1.pdf',
        'document2.pdf',
        'document3.pdf',
        // Add more PDFs as needed
    ];

    // Function to filter PDFs based on search input
    function filterPDFs() {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredPDFs = pdfs.filter(pdf => pdf.toLowerCase().includes(searchTerm));
        displayPDFs(filteredPDFs);
    }

    // Function to display filtered PDFs
    function displayPDFs(filteredPDFs) {
        pdfList.innerHTML = '';

        if (filteredPDFs.length === 0) {
            pdfList.innerHTML = '<p>No matching PDFs found.</p>';
        } else {
            filteredPDFs.forEach(pdf => {
                const listItem = document.createElement('li');
                const link = document.createElement('a');
                link.href = `path/to/pdfs/${pdf}`; // Replace with the actual path to your PDFs
                link.textContent = pdf;
                listItem.appendChild(link);
                pdfList.appendChild(listItem);
            });
        }
    }

    // Event listener for the search input
    searchInput.addEventListener('input', filterPDFs);
});
