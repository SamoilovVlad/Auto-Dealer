const StaticData = {
    navItems: [
        { href: '/', label: 'Home' },
        { href: '/models', label: 'Models' },
        { href: '/services', label: 'Services' },
        { href: '/contacts', label: 'Contacts' },
        { href: '/about', label: 'About' },
    ],

    icons: [{ src: 'https://cdn.riastatic.com/docs/newauto/common_photos/ctqvaa3ivp5f77gw.svg', alt: 'CONFIGURATION' },
    { src: 'https://cdn.riastatic.com/docs/newauto/common_photos/c3v7k6qvgjnb3g7f.svg', alt: 'SELECTION' },
    { src: 'https://cdn.riastatic.com/docs/newauto/common_photos/2l3l4ccnafagc2nr.svg', alt: 'COMPARISON' },
    { src: 'https://cdn.riastatic.com/docs/newauto/common_photos/qn4b33dm6jbkgapt.svg', alt: 'FAST SERVICE' }],

    cards: [{ title: '80+', text: 'of the best car brands in the world', src: 'https://img.icons8.com/ios-filled/50/tesla-model-x.png' },
    { title: '890+', text: 'Auto Models: Unveiling the Abundance of Choice', src: 'https://img.icons8.com/external-smashingstocks-hand-drawn-black-smashing-stocks/99/external-car-wheel-transportation-smashingstocks-hand-drawn-black-smashing-stocks.png' },
    { title: 'Professional', text: 'selection of cars for your needs at official prices', src: 'https://img.icons8.com/external-icongeek26-outline-icongeek26/64/external-Car-Key-car-parts-icongeek26-outline-icongeek26.png' }
    ],

    popularBrands: ['BMW', 'Skoda', 'Nissan', 'Ford', 'Opel', 'MG', 'Mazda', 'Mitsubishi', 'Volkswagen', 'JAC', 'Audi', 'Chery', 'Toyota', 'Hyundai', 'Peugeot', 'Citroen', 'Renault', 'SEAT', 'Suzuki', 'Subaru', 'Haval', 'DS', 'Kia', 'Fiat', 'Jetour'],

    advertisements: [{ title: 'Big Assortment', text: 'The largest assortment of cars throughout Europe' },
    { title: 'Bets Quality', text: 'The best quality cars for a cheap price' },
    { title: 'Bets Quality', text: 'The best quality cars for a cheap price' },
    { title: 'Bets Quality', text: 'The best quality cars for a cheap price' },
    { title: 'Bets Quality', text: 'The best quality cars for a cheap price' },
    { title: 'Bets Quality', text: 'The best quality cars for a cheap price' },
    ],

    frequentlyQuestions: [
        {
            title: 'Do you sell cars from official dealers?',
            body: <span>We sell mainly official cars from dealers. Prices for cars do not differ from the official prices approved by importers.<br /> We also work with individuals, after a thorough inspection of the car</span>
        },
        {
            title: 'What services for buying a car does Autocenter offer?',
            body: (
                <>
                    <span>We find you a car that will fully meet your expectations and needs.</span><br /><br />
                    <span>We help you decide what is most important to you in a car and offer options.</span><br /><br />
                    <span>We reserve a car for free for a day while you make a final decision on it.</span><br /><br />
                    <span>On request, we deliver a new car to your home. The cost of delivery is calculated individually.</span>
                </>
            )
        },
        {
            title: 'What guarantees will I receive when buying a car at Autotsentr?',
            body: <span>Always transparent conditions, we control every transaction between the car dealership and the buyer. <br />The DriveDream Hub auto center is guaranteed to find exactly the car you need. <br />Even if you do not use any of our offers, you will still know which car meets your expectations.</span>
        }
    ],

    contactFormIcons: [
        { src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAzJJREFUSEvFllmoT1EUxn8XmcocmcfMZIp4MAslusiDKBmKeJFZSUnm6QUZIsmTlChCyhhlTqaSWR5M5cWYYX+1zu3cc88+/33+Hu6qf/eec/Za315rf+tbu4RKspJKwqUY4DZAX6At8Bd4CdwBXudJIhRY6+YCi4COHoAnwFbgoG0ocx8hwM2B48CAwIyuAJOAj1nrCwF3Ai4CzSzII2AfcA94aO96AL2BeUBne6fyDwHe+MCzgOsCt2KlXQ2sA/54glUD1gNL7ftdYBDwI219FvARYJo5LQB2xwIMBkba83ngauybNrjGnrcBS/IADwSum4NKK2LJugDHgO6JYPftXJ/Ze3Gi1Kojn6dJcF/GO4CF5tgU+OAybmJt08JT6hdAH+CLbfCxrVsGbAkFfmBZnXOZjzGnA65XZ9n/e4BNrqTa+KrY+83Aclsj8nUD4jHK8H0ZfwYaANuBxbb6E9AQuOSYPiyRwQ2gP6Be7mrfDgEzTGDahWYsJlY3Fisj2S9AzJVIRMyN4olEEpdvQG17uQFY4X7fXXVqhQK/cgrUGlB555iTJLEVcBkYmgh0zVrnOdDBvknBZrqfYkley5mv1AqulrnggEaYx05HMrWVTK2lM66aOOP40UQx0o7GOyT2W6YSC52rmKq/UixlnWZqGZ2z1jYC3gNVnOrtNVULyni0K91ZWznbhF+Pvj6+CUyOSeR8YJf5DzfZDQJWCd9Z774F2hu5ImeVX1osOwFIHiMTuaTVjS1Gy7RplSWZYvNai5YqAp6SS69X2jfJpRhfwbKAawBiqcbiT5s8yiTLepm66Wzlq6NRG+YC1uIpTn2Ompf0WNPmqwdZgnMbiMRinJvhp327LDSP5SeSiCyykzYMficC1jQyRue+MVbuVOwQYBHtjBt9oyyCKjA1NpcFeirW75pMYrjuY14LAZazmCpB6GeRolGpsxTQBHuv2awSixOZFgqsIPWsH3XNkR12jK0DTLRn3bXGZnCg3EbyAMtR6qU7WM9EOrqBaHz6iFch+7zAClDfiBTdOlXe8TaFClW47HsxwHLWeJxuBNPdzHcB/G9yBWcSurDYjEPje9f9A3F/mR9eRdfwAAAAAElFTkSuQmCC', text: 'Poznań, podgorna 12' },
        { src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAcpJREFUSEvt1s+LTlEcx/HXyI8lJQvJj39Amo1kY8POj9KUFAs2UtOkbPxYIMRCEQs7JVNSUn7szGJ2lIWFLGVSspAFm2kQzlfn6rh55j7zuD3P5rmrc8/9ns/7ez/ne36MGNAzMiCuIbhvztetPoIT2NByBjM4j1uVbgnehumWgXW5zXgRnSX4FC7myHMtJ3Am653E5Tr4LKqAg5hsCX4Ad4ofCs5ff1yC49tNHMPXHhNYims4WowPJxvBEf8Su/B+gfA1eIzR2rhGcNgcFsXzCfvxtEv4DtzFyhxfav0THPP724Y8BRO4kgpuCX7k+Y/i+9khgSjU02lsiC9K7W84nhK4UYzpChz6W/AIqzJsCmP4XIMvx31sz/0fsBfP83uVbKPV5TJbjQc5idB5h514lUU34knaHNbl94DtxsciuZ7AMX4xrmI8i82lBA7nduxGy3L7erb3e82RnsGVzj7cLkBV/ywO4V6H+f9vcOhuSsvkIdZnyJu07Pbg9TxV3wo49FcgbI1qj+r/0rDUWgN3uaT/hA3BfT8W4+i9VG2N1UT04yKwFc/q4HiPIywO67ULrZ6G+LdpE7rQ6erTMmt+ueG9um92D8zqXxs3ZB/GykYiAAAAAElFTkSuQmCC', text: 'DriveDreamsHub@gmail.com' },
        { src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAA4FJREFUSEvFllnITlEUhp/fkCEy3pAL4sKYzBkyZchUZiFy4QYZkuEChURkKIqiKFFC5kxlLkSmiFCGRMo8K+N+tY7Wd/5zzvfRX/+qr863h/Xuvda71ruLKCUrKiVcSgJ4HFABeAhcAj4Ucpks4HJAc+AW8D3D2Wmgm83/MvAVwJ6sA6QBVwvOTgGtgKtAD+B9iiMP7JecBYYAr5P2JQFXAU4A7d2Ga0BP4G2CkzJAQ6Ax0BSYBdS2dfeAPsDj+L44cGXgGNDFFr4DdHtZFrj3WyccYgfQ1QbvAB3iuffAOrlAe9mG48BIYBfQ24F3j4V9AlDP1t21dfK1Gphu/3cDI/zpPPAYYLtN6gCDga9AReCgO1A85z7H2jcPuAKUBS4Cbc1nJ+BCBO6B5wDLbaI6oDBHFgffAEy2yTi5fho/BK6cXwfKh3AfCYzvnwQ8FthmEyLLAwdcNTg77HK/KMwttPlKQBNgEjDRxhSVNvataA20kqwRyPdR4/7GKpmTtlh5PGPfuu05F7KtgPKqmo3bWmCqDTYLHLkNLAAW21jEmRzgRsB9WzAzsHmNfXcMJXHekWQUoHAmmW4uMJk6miIoYoqoMh1iSfzGIsMLQOFQHUfs1o01rvouxs4YusKuXMrWhxzvNH97bWwzoIgV69WbLE/fbMMn27DFwqvxusDLlBsXPBxvIANCLg/Z7mnAOvv24dpvpVYwSNLCOLCEQZ1G+X4ONLBa1l71bpFONheQEHhTipZa6cwOzeNN1smSerXIo5Ynk4OV9q3upEMp1zKVyRTgiaVFVdDC5m6aYqWCp6mTir5lAFaOOweVuWEOh1p3E+EiExElClrvTT4kLIngacCtTVfF9KdWwwq9TOEX2SIN9mA6hLS7rw2mgmc9BGa4WlZtqt1F8qZ9wwD1d43rBXLZdPsHcMAJSyJ4vqePHAyy078yYVcX8yYpbWfAn20i3tslqRKLv40nH7C0eJ9js26zzH4RSBp5tfdZYL8OJpMm6032x/IBa43yvMppq8aUb7U/abVXscivOpj6gcglk2goKgXf2N9GwrDR6jQal1BI/kQqPQpVbo+sVUag0mSRLefNVsiNPbgYPT9I5vjQ7NVs8pn40M/KMmftvwJHm+sDowOh1GL1skjyI/0eHrrcl6TT/S+w91XTGFsL0LdIpZwezQpHSQDnC3fifKkB/wYUVbMfxOe3qgAAAABJRU5ErkJggg==', text: '123-456-789' },
    ],

    socialMediaIcons: [
        { icon: <box-icon type='logo' name='facebook' ></box-icon>, href: '/' },
        { icon: <box-icon type='logo' name='instagram' ></box-icon>, href: '/' },
        { icon: <box-icon name='github' type='logo' ></box-icon>, href: 'https://github.com/SamoilovVlad' },
        { icon: <box-icon name='linkedin' type='logo' ></box-icon>, href: 'https://www.linkedin.com/in/vladyslav-samoilov-1211bb294/' }
    ],

    modelsBodyTypes: [
        { name: 'All types', value: '' },
        { name: 'SUV', value: 'SUV' },
        { name: 'Saloon', value: 'Saloon' },
        { name: 'Hatchback', value: 'Hatchback' },
        { name: 'Convertible', value: 'Convertible' },
        { name: 'MPV', value: 'MPV' },
        { name: 'Coupe', value: 'Coupe' },
        { name: 'Manual', value: 'Manual' },
        { name: 'Panel Van', value: 'Panel Van' },
        { name: 'Pickup', value: 'Pickup' },
        { name: 'Camper', value: 'Camper' },
        { name: 'Window Van', value: 'Window Van' },
        { name: 'Chassis Cab', value: 'Chassis Cab' },
        { name: 'Minibus', value: 'Minibus' },
        { name: 'Tipper', value: 'Tipper' },
        { name: 'Car Derived Van', value: 'Car Derived Van' },
        { name: 'Limousine', value: 'Limousine' },
        { name: 'Combi Van', value: 'Combi Van' },
    ],

    gearboxTypes: [
        { name: 'All types', value: '' },
        { name: 'Automatic', value: 'Automatic' },
        { name: 'Semi-Automatic', value: 'Semi-Automatic' },
        { name: 'Manual', value: 'Manual' }
    ],

    fuelTypes: [
        { name: 'All types', value: '' },
        { name: 'Petrol', value: 'Petrol' },
        { name: 'Diesel', value: 'Diesel' },
        { name: 'Electric', value: 'Electric' },
        { name: 'Bi Fuel', value: 'Bi Fuel' },
        { name: 'Diesel Plug-in Hybrid', value: 'Diesel Plug-in Hybrid' },
        { name: 'Hybrid Diesel/Electric Plug-in', value: 'Hybrid Diesel/Electric Plug-in' },
        { name: 'Hybrid Petrol/Electric Plug-in', value: 'Hybrid Petrol/Electric Plug-in' },
        { name: 'Diesel Hybrid', value: 'Diesel Hybrid' },
        { name: 'Petrol Ethanol', value: 'Petrol Ethanol' },
        { name: 'Hybrid Petrol/Electric', value: 'Hybrid Petrol/Electric' },
        { name: 'Hybrid Diesel/Electric', value: 'Hybrid Diesel/Electric' },
        { name: 'Petrol Plug-in Hybrid', value: 'Petrol Plug-in Hybrid' },
        { name: 'Petrol Hybrid', value: 'Petrol Hybrid' },
    ],

    makers: [
        'Abarth',
        'Alfa Romeo',
        'Aston Martin',
        'Audi',
        'Bentley',
        'BMW',
        'Brooke',
        'Bugatti',
        'Cadillac',
        'Caterham',
        'Chevrolet',
        'Chrysler',
        'Citroen',
        'Corvette',
        'Dacia',
        'Daewoo',
        'Daihatsu',
        'Daimler',
        'DAX',
        'Dodge',
        'DS',
        'Ferrari',
        'Fiat',
        'Ford',
        'Ginetta',
        'GMC',
        'Great Wall',
        'Grinnall',
        'Honda',
        'Hummer',
        'Hyundai',
        'Infiniti',
        'Isuzu',
        'Jaguar',
        'Jeep',
        'Jensen',
        'Kia',
        'Koenigsegg',
        'KTM',
        'Lamborghini',
        'Land Rover',
        'Lexus',
        'Lincoln',
        'London Taxis International',
        'Lotus',
        'Maserati',
        'Maybach',
        'Mazda',
        'McLaren',
        'Mercedes-Benz',
        'MEV',
        'MG',
        'MINI',
        'Mitsubishi',
        'Morgan',
        'Nissan',
        'Noble',
        'Opel',
        'Pagani',
        'Perodua',
        'Peugeot',
        'Pilgrim',
        'Porsche',
        'Proton',
        'Radical',
        'Raw',
        'Renault',
        'Reva',
        'Rolls-Royce',
        'Rover',
        'Saab',
        'Santana',
        'SEAT',
        'Sebring',
        'SKODA',
        'Smart',
        'Ssangyong',
        'Subaru',
        'Suzuki',
        'Tesla',
        'Tiger',
        'Toyota',
        'TVR',
        'Vauxhall',
        'Volkswagen',
        'Volvo',
        'Westfield',
        'Zenos'
    ],

    colors:['Purple', 'Silver', 'Green', 'Pink', 'Turquoise', 'Navy', 'Multicolour', 'Grey', 'Red', 'Bronze', 'Brown', 'Maroon', 'Gold', 'Beige', 'Magenta', 'Indigo', 'Burgundy', 'Black', 'Blue', 'Yellow', 'White', 'Orange'],



}

export const { icons, cards, popularBrands, navItems, advertisements, frequentlyQuestions, contactFormIcons, socialMediaIcons, modelsBodyTypes, gearboxTypes, fuelTypes, makers, colors } = StaticData;