const { isEven, calculateTotalPrice, processPurchase, sendNotification, generatePassword } = require("./../src/function.js");

describe('Test isEven', () => {
    test('Si je passe 2 qui est pair, le résultat doit être true',() =>{
        expect(isEven(2)).toBe(true);
    });
    
    test('Si je passe 3 qui est impair, le résultat doit être false',() =>{
        expect(isEven(3)).toBe(false);
    });
    
    test('Si je passe un String, une erreur doit être levée',() =>{
        expect(() => isEven('3')).toThrow('Input must be a number');
    });
});

describe('Test calculateTotalPrice', () => {
    test('Si je passe [18, 22] et 0.2, le résultat doit être 48',() =>{
        expect(() => calculateTotalPrice([18, 22], 0.2).toBe(48));
    });

    test('Si je passe [13, 24, 13] et -2, le résultat doit être 40', () => {
        expect(() => calculateTotalPrice([13, 24, 13], -2).toBe(40));
    });

    test('Si je passe un nombre à la place d\'un tableau, une erreur doit être levée', () => {
        expect(() => calculateTotalPrice(18, 20).toThrow('Prices must be an array'));
    });

    test('Si je passe un String à la place d\'un nombre, une erreur doit être levée', () => {
        expect(() => calculateTotalPrice([18, 20], "20").toThrow('Tax rate must be a number'));
    });

    test('Si je passe un nombre négatif dans le tableau, une erreur doit être levée', () => {
        expect(() => calculateTotalPrice([50, -20], 20).toThrow('Each price must be a non-negative number'));
    });
});

describe('Test processPurchase', () => {
    test('Si je passe [16, 4] et 0.1, le résultat doit être 22', () => {
        expect(() => processPurchase([16, 4], 0.1).toBe(22));
    });

    test('Si je passe [12, 38, 46, 4] et 0.5, je devrais recevoir un message `Votre total est de 150.00 €`', () => {
        const logSpy = jest.spyOn(global.console, 'log');

        result = processPurchase([12, 38, 46, 4], 0.5);

        expect(logSpy).toHaveBeenCalledWith('Notification envoyée : Votre total est de 150.00 €');

        logSpy.mockRestore();
    });
});

describe('Test sendNotification', () => {
    test('Si je passe un String, je devrais recevoir un message avec `Notification envoyée : ` avant', () => {
        const logSpy = jest.spyOn(global.console, 'log');
        sendNotification("Test de la fonction");
        expect(logSpy).toHaveBeenCalledTimes(1);
        expect(logSpy).toHaveBeenCalledWith('Notification envoyée : Test de la fonction');
        logSpy.mockRestore();
    });
});

describe('Test generatePassword', () => {
    test('Si je passe un nombre, le resultat doit être un String de la taille du nombre entré', () => {
        const result = generatePassword(16);
        expect(typeof result).toBe("string");
        expect(result.length).toBe(16);
    });

    test('Si je passe un String au lieu d\'un nombre, une erreur doit être levée', () =>{
        expect(() => generatePassword("10").toThrow('Length must be a number greater than or equal to 6'));
    });

    test('Si je passe un nombre inférieur à 6, une erreur doit être levée', () => {
        expect(() => generatePassword(4).toThrow('Length must be a number greater than or equal to 6'));
    });

    test('Si l\'option uppercase est désactivée, je ne dois pas avoir de mot de passe contenant de majuscule', () => {
        const password = generatePassword(255, uppercase= false, numbers = true, specialChars = true)
        const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (let i = 0; i < uppercaseChars.length; i++) {
            expect(password.includes(uppercaseChars.charAt(i))).toBe(false);
        }
    });

    test('Si l\'option numbers est désactivée, je ne dois pas avoir de mot de passe contenant de nombre', () => {
        const password = generatePassword(255, uppercase = true, numbers = false, specialChars = true)
        const numberChars = '0123456789';
        for (let i = 0; i < numberChars.length; i++) {
            expect(password.includes(numberChars.charAt(i))).toBe(false);
        }
    });

    test('Si l\'option specialChars est désactivée, je ne dois pas avoir de mot de passe contenant de caractère spéciaux', () => {
        const password = generatePassword(255, uppercase = true, numbers = true, specialChars = false);
        const specialCharacters = '!@#$%^&*()_+[]{}|;:,.<>?';
        for (let i = 0; i < specialCharacters.length; i++) {
            expect(password.includes(specialCharacters.charAt(i))).toBe(false);
        }
    });

    /**
     * Puisque l'erreur Error('At least one character type must be enabled') est levée lorsque charPool.length === 0
     * et que charPool est initialisé tel que let charPool = lowercaseChars; 
     * et que lowercaseChars est initialisé tel que const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
     * l'erreur ne peut être testée car il n'y a pas de possibilité de la lever
     */
    
});
