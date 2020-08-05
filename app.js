const strengthMeter = document.getElementById("strength-meter")
const passwordInput = document.getElementById("password-input")
const reasons = document.getElementById("reasons")

passwordInput.addEventListener("input", updateStrengthMete)
updateStrengthMete()

function updateStrengthMete(){
    const weaknesses = calculatePasswordStrength(passwordInput.value)

    let strength = 100
    reasons.innerHTML= ""
    weaknesses.forEach(weakness => {
        if(weakness == null) return
        strength -= weakness.deduction
        const messageElement = document.createElement("div")
        messageElement.innerText = weakness.message
        reasons.appendChild(messageElement)
    })
    strengthMeter.style.setProperty("--strength", strength)
}

function calculatePasswordStrength(password){
    const weaknesses =[]
    weaknesses.push(lengthWeakness(password))
    weaknesses.push(lowerCaseWeakness(password))
    weaknesses.push(upperCaseWeakness(password))
    weaknesses.push(numberWeakness(password))
    weaknesses.push(specialChar(password))
    return weaknesses
}

function lengthWeakness(password){
    const length = password.length

    if(length <= 5){
        return{
            message: "Your password is too short",
            deduction: 40
        }
    }
    if(length <= 10){
        return{
            message: "Your password could be longer",
            deduction: 15
        }
    }
    

}

function specialChar(password){
    return charTypeWeakness(password, /[^0-9a-zA-Z\s]/g, `special`)
}

function lowerCaseWeakness(password){
    return charTypeWeakness(password, /[a-z]/g, `lowercase`)
}

function upperCaseWeakness(password){
    return charTypeWeakness(password, /[A-Z]/g, `uppercase`)
}

function numberWeakness(password){
    return charTypeWeakness(password, /[0-9]/g, `numbers`)
}

function charTypeWeakness(password, regex, type){
    const matches = password.match(regex) || []

    if(matches.length === 0){
        return{
            message: `Your password has no ${type} characters`,
            deduction: 20
        }
    }
    if(matches.length <= 2){
        return{
            message: `Your password could use more ${type} characters`,
            deduction: 5
        }
    }
}