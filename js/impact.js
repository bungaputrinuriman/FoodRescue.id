// ============================================
// REPORT DOWNLOAD FUNCTION
// ============================================

function downloadReport(year) {
    const reportFiles = {
        2026: 'laporan/laporan2026.pdf',
        2025: 'laporan/laporan2025.pdf',
        2024: 'laporan/laporan2024.pdf',
        2023: 'laporan/laporan2023.pdf'
    };

    const fileUrl = reportFiles[year];

    if (fileUrl) {
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = `Annual_Report_${year}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        alert(`Maaf, laporan tahun ${year} belum tersedia.`);
    }
}