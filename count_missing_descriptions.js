const fs = require('fs');

// Read the HTML file
const htmlContent = fs.readFileSync('/home/user/Cybersecurity-Glossary/index.html', 'utf-8');

// Extract the terms array from the JavaScript code in the HTML
const termsMatch = htmlContent.match(/const terms = \[([\s\S]*?)\n        \];/);

if (!termsMatch) {
    console.error('Could not find terms array in HTML file');
    process.exit(1);
}

// Parse the array string to get the terms
// We'll use eval here since it's a trusted source (our own file)
const termsArrayString = '[' + termsMatch[1] + '\n        ]';
const terms = eval(termsArrayString);

// Count terms without long descriptions
let totalTerms = terms.length;
let termsWithoutLongDescription = 0;
let termsWithLongDescription = 0;

const missingTerms = [];

terms.forEach(term => {
    if (!term.longDescription || term.longDescription.trim() === '') {
        termsWithoutLongDescription++;
        missingTerms.push(term.name);
    } else {
        termsWithLongDescription++;
    }
});

console.log('\n====== ANALYSE DU GLOSSAIRE ======');
console.log(`\nNombre total de termes: ${totalTerms}`);
console.log(`Termes AVEC description longue: ${termsWithLongDescription}`);
console.log(`Termes SANS description longue: ${termsWithoutLongDescription}`);
console.log(`\nPourcentage sans description: ${((termsWithoutLongDescription / totalTerms) * 100).toFixed(2)}%`);

if (missingTerms.length > 0) {
    console.log('\n====== TERMES SANS DESCRIPTION LONGUE ======');
    missingTerms.forEach((name, index) => {
        console.log(`${index + 1}. ${name}`);
    });
}
