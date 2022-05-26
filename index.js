const chalk = require('chalk');
const axios = require('axios');
const prompt = require('prompt-sync')({ sigint: true });
const pwgenerator = require('generate-password');
const l_yellow = chalk.hex('#ffffe0');
const orange = chalk.hex('#ffa500');
const orange_b = chalk.bold.hex('#ffa500');
const grey = chalk.hex('#808080');
const { passwordStrength } = require('check-password-strength')



console.log(chalk.bold.green("PasswordHelper v1.0.0") + chalk.green(" - Balan Andrei") + "\n");
console.log(chalk.red("--------------------------------------------------------------"))
console.log(l_yellow("Creating a secure password is a must nowadays, you should always be aware of hackers compromising your passwords.\nMore than " + orange_b("30.000") + " websites are getting hacked daily, and every " + orange_b("39 seconds") + " a data breach happens " + grey("(source: www.varonis.com)") + ". \n\nOver the past 10 years, there have been " + orange_b("300") + " data breaches involving the theft of " + orange_b("100,000") + " or more records. \nThe United States saw " + orange("1,244") + " data breaches in 2018 and had " + orange("446.5 million") + " records exposed."))
console.log(chalk.red("--------------------------------------------------------------") + "\n")

console.log(orange("Start using my application below and I will tell you more information.") + "\n" + orange("Please choose an option:" + "\n"))


console.log(chalk.blue("1) Generate a safe password for me."))
console.log(chalk.blue("2) Check how good my password is."))

function read() {
    let option = prompt(orange('What option do you choose?: '));
    return input(option);
};

function passLength() {
    let length = prompt(orange('Password length: '))
    return length;
}

function passNumbers() {
    let numbers = prompt(orange('Include numbers (y/n): '))
    return numbers;
}

function passUppercase() {
    let upperLetters = prompt(orange('Include uppercase letters (y/n): '))
    return upperLetters;
}


function yearBorn() {
    let info1 = prompt(orange("Which year were you born in?: "))
    return info1;
}

function friendName() {
    let info2 = prompt(orange("Input a name, it can be your friends/family/pets name: "))
    return info2;
}

function favNumber() {
    let info3 = prompt(orange("Please enter your favorite number: "))
    return info3;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max + 1);
}

function createEasyPassword(info1, info2, info3) {

    let randomInt = getRandomInt(3);
    let string;

    if (randomInt == 1) {
        string = `npc${info1}[]${info2}${info3}@`
    }
    if (randomInt == 2) {
        string = `ezi${info3}//${info2}${info1}!`
    }
    if (randomInt == 3) {
        string = `trz${info2}&&${info1}${info3}#`
    }

    return string;
}

function passPassword() {
    let passwd = prompt(chalk.greenBright("Write the password you wish to check: "))
    return passwd;
}

function verifyPassword(password) {
    let UpperCase = false;
    let DownCase = false;
    let Numbers = false;
    let length = 0;
    let specialCharacters = false;
    let n_specialcharacters = 0;
    let variety_ofCharacters = 0;
    let lowerPoints = 0;
    let upperPoints = 0;
    let totalPoints = 0;
    let k = 1;

    length = password.length;
    totalPoints = length * 2

    if (password.length >= 5) {
        variety_ofCharacters = 1;

        for (let i = 0; i < password.length; i++) {
            k=k*1.4
            if (password[i] == password[i].toUpperCase() && (password[i].toUpperCase() !== NaN || password[i].toUpperCase() !== undefined)) {
                UpperCase = true;
                upperPoints += 1;
                variety_ofCharacters += 2;
            }
            if (password[i] == password[i].toLowerCase()  && (password[i].toLowerCase() !== NaN || password[i].toLowerCase() !== undefined)) {
                DownCase = true;
                lowerPoints += 1;
                variety_ofCharacters += 2;
            }
            if (parseInt(password[i]) !== NaN || parseInt(password[i]) !== null) {
                Numbers = true;
                variety_ofCharacters += 4;
            }
            if ((password[i].charCodeAt(0) >= 33 || password[i].charCodeAt(0) <= 47) || (password[i].charCodeAt(0) >= 91 || password[i].charCodeAt(0) <= 96)) {
                specialCharacters = true;
                n_specialcharacters += 1;
                variety_ofCharacters += 6;
            }
            if(upperPoints !== 0 && lowerPoints !== 0) {
                variety_ofCharacters += 10
            }
        }
        if ((upperPoints + 3 <= lowerPoints) || (lowerPoints >= upperPoints - 3)) {
            variety_ofCharacters *= 1.6
        }
        totalPoints = parseInt(variety_ofCharacters + k + (n_specialcharacters * 5) + upperPoints + lowerPoints + (Numbers ? 15 : 0) + (UpperCase ? 10 : 0) + (DownCase ? 10 : 0) + (specialCharacters ? 20 : 0));
        return totalPoints;
    } else {
        variety_ofCharacters = 0;
        totalPoints = 1;
        notEnoughChars();
        return totalPoints;
    }
}

function notEnoughChars() {
    console.log(chalk.red("It looks like your password does not have enough characters. This means it has a high risk of being stolen."))
}

function input(option) {
    let options = [1, 2, 3];
    option = parseInt(option);
    if (typeof option != "number" || !options.includes(option)) {
        console.log(chalk.red("Please input a number 1-3"));
        return read();
    }
    switch (parseInt(option)) {
        case 1:
            let genOpt_1 = prompt(orange('Should it be easy to remember? (y/n) (n): '))
            if (genOpt_1 != "y" && genOpt_1 != "n" && genOpt_1 != "Y" && genOpt_1 != "N" && !genOpt_1.replace(/\s/g, ' ') == " " && !genOpt_1 == "") {
                return console.log(chalk.red("Option not recognized. Exiting.."));
            } else {
                if (genOpt_1.replace(/^\s+|\s+$/gm, ' ') == " " || genOpt_1 == "n" || genOpt_1 == "N" || genOpt_1 == "") {
                    let length = passLength()
                    if (parseInt(length) != NaN) {
                        if (parseInt(length) > 6 && parseInt(length) <= 100) {
                            let numbers = passNumbers();
                            if (numbers != "y" && numbers != "n" && numbers != "Y" && numbers != "N") {
                                return console.log(chalk.red("Option not recognized. Exiting.."));
                            } else {
                                let numBool = false;
                                if (numbers == "y" || numbers == "Y") {
                                    numBool = true;
                                }
                                let upperLetters = passUppercase();
                                if (upperLetters != "y" && upperLetters != "n" && upperLetters != "Y" && upperLetters != "N") {
                                    return console.log(chalk.red("Option not recognized. Exiting.."));
                                } else {
                                    let upperBool = false;
                                    if (upperLetters == "y" || upperLetters == "Y") {
                                        upperBool = true;
                                    }
                                    let password = pwgenerator.generate({
                                        length: parseInt(length),
                                        numbers: numBool,
                                        uppercase: upperBool
                                    });
                                    console.log(chalk.green("\nYour generated password is: " + password))
                                }
                            }
                        } else {
                            console.log(chalk.red("Your password length should be between 5 and 100. Exiting.."))
                        }
                    } else {
                        console.log(chalk.red("Error trying to input your length. Exiting.."));
                    }
                }
                if (genOpt_1 == "y" || genOpt_1 == "Y") {
                    console.log(chalk.red("\nBe aware: Most easy-to-remember passwords are also the easiest to be compromised. \nUsing words from dictionary without adding anything to it already adds a big vulnerability to your password."))
                    console.log(orange("\n\nPlease give me some information about yourself to create your password: "))
                    let info1 = yearBorn();
                    if (parseInt(info1) != NaN && info1.length == 4) {
                        info1 = parseInt(info1);
                        let info2 = friendName();
                        info2 = info2.replace(/\s/g, "").toLowerCase();
                        if (!info2 == "" && !(info2 == undefined && info2 == null)) {
                            info3 = favNumber();
                            if (parseInt(info3) != NaN) {
                                info3 = parseInt(info3);
                                console.log(chalk.green("\nYour generated password is: " + createEasyPassword(info1, info2, info3)))
                                console.log(chalk.red("\nBut remember, a safer option would be to use random characters instead of dictionary words and details of yourself, like your birthdate."))
                            } else {
                                return console.log(chalk.red("Error trying to introduce your favorite number. Exiting.."));
                            }
                        } else {
                            console.log(!(info2 == undefined && info2 == null))
                            return console.log(chalk.red("Error trying to introduce your information. Exiting.."));
                        }
                    } else {
                        return console.log(chalk.red("Error trying to introduce your birth year. Exiting.."));
                    }
                }
            }
            break;
        case 2:
            let password = passPassword();
            console.log(chalk.green(`\nThe rating of my algorithm is: ${verifyPassword(password)}\nThe rating of another algorithm is: ${passwordStrength(password, [
                {
                  id: 0,
                  value: "Too weak",
                  minDiversity: 0,
                  minLength: 0
                },
                {
                  id: 1,
                  value: "Weak",
                  minDiversity: 1,
                  minLength: 5
                },
                {
                  id: 2,
                  value: "Medium",
                  minDiversity: 3,
                  minLength: 8
                },
                {
                  id: 3,
                  value: "Strong",
                  minDiversity: 4,
                  minLength: 10
                }
              ]).value} ${grey("(source: www.npmjs.com/package/check-password-strength)")}`))
              console.log(orange("\nIf the rating of my algorithm is " + chalk.greenBright("500") + " or above, and the rating of the other algorithm is " + chalk.greenBright("Medium") + " or above, then your password should be pretty decent."))
              console.log(chalk.red("Attention: The algorithms do not check for dictionary words or common passwords. Make sure you avoid those type of passwords."))
    }
};

read();