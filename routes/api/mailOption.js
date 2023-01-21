const refuseEmail = (dogName, from, to, walkerName) => "<p>Your order for dog-"+dogName+" from "+from+"to "+to+" was refused by dog-walker: "+ walkerName+".</p>"
const acceptEmail = (dogName, from, to, walkerName) => "<p>Your order for dog-"+dogName+" from "+from+"to "+to+" was accepted by dog-walker: "+ walkerName+".</p><p>You can pay now via websites</p>"

// module.export {acceptEmail, refuseEmail}