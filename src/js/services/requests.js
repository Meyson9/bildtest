    // это http запрос с асинронным кодом который ждет async/await данными сслыкой, методом, телом 
    const postData = async (url, data) => {
        let res = await fetch(url, {
            method: "POST",
            body:data
        });
        return await res.text();
    };

    // это http запрос с асинронным кодом который ждет async/await данными сслыкой, методом, телом 
    const getResource = async (url) => {
        let res = await fetch(url);
        if(!res.ok){
            throw new Error(`Could not fetch ${url}, Status ${res.status} ` );
        }
        return await res.json();
    };

    export {postData, getResource};







const employers = ['Alex', '', 'ludmila', 'Viktor', '', 'oleg', 'iNna', 'Ivan', 'Alex', 'Olga', ' Ann'];

let employersNames = employers.filter((item) => {
    return item.length > 1 ;
}); 
employersNames = employersNames.map((item) => item.toLowerCase());
console.log(employersNames);

// let employersNames = [];


const sponsors = {
    cash: [40000, 5000, 30400, 12000],
    eu: ['SRL', 'PLO', 'J&K'],
    rus: ['RusAuto', 'SBO']
};

function calcCash(own = 0) {
    // own = own || 0;
    let everyCash = Array.prototype.slice.call(arguments);
    let total = own;
    for (let i = 0; i < everyCash[1].length; i++) {
        total += +everyCash[1][i];
    }
    return total;
}

let money = calcCash(null, sponsors.cash);

function makeBusiness(owner, director = 'Victor', cash, emp) {
    // director = director || 'Victor';
    const sumSponsors = sponsors.eu.concat(sponsors.rus, 'unexpected sponsor');
    console.log(`We have a business. Owner: ${owner}, director: ${director}. Our budget: ${cash}. And our employers: ${emp}`);
    console.log('And we have a sponsors: ');
    console.log.apply(null, sumSponsors);
    console.log(`Note. Be careful with ${sponsors.eu[0]} . It's a huge risk.`);
}
makeBusiness.apply(null, ['Sam', null, money, employersNames]);